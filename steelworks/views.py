from steelworks import serializers
from steelworks import models

import json
import os
import stripe

from django.http import HttpResponse
from django.contrib.auth import login, logout
from django.contrib.auth.models import User
from django.views.generic import TemplateView

from rest_framework import generics
from rest_framework import permissions
from rest_framework import views
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated, IsAdminUser

stripe.api_key = str(os.getenv('REACT_STRIPE_SECRET_KEY'))


def create_cust_and_sub(email, paymentMethodID, subscription_type):
    customer = stripe.Customer.create(
        email=email,
        payment_method=paymentMethodID,
        invoice_settings={
            'default_payment_method': paymentMethodID
        }
    )
    # creating subscription
    stripe.Subscription.create(
        customer=customer,
        items=[
            {
                'price': str(os.getenv(subscription_type))
            }
        ]
    )
    return customer


def add_card_set_default_and_create_sub(paymentMethodID, customer, subscription_type):
    stripe.PaymentMethod.attach(
        paymentMethodID,
        customer=customer.id,
    )
    stripe.Customer.modify(
        customer.id,
        invoice_settings={
            "default_payment_method": paymentMethodID},
    )
    # creating subscription
    stripe.Subscription.create(
        customer=customer,
        items=[
            {
                'price': str(os.getenv(subscription_type))
            }
        ]
    )


def check_sub_upgrade(current_product_id, subscription_type):
    product_order_array = [str(os.getenv('REACT_STRIPE_UNLIMITED_ID')), str(
        os.getenv('REACT_STRIPE_GOLD_ID')), str(os.getenv('REACT_STRIPE_SILVER_ID'))]
    current_prod_order = product_order_array.index(
        current_product_id)
    submitted_prod_order = product_order_array.index(
        str(os.getenv(subscription_type)))
    return 'Are you sure you want to upgrade your subscription?' if current_prod_order > submitted_prod_order else 'You cannot downgrade your subscription'


def find_product_user_pair_id(product_name):
    product_user_pair = models.ProductUserPair.objects.filter(
        product__product_name=product_name)
    return product_user_pair.values()[0]['id']


def pair_id_from_stripe_product_id(stripe_prod_id: str, product_names):

    if stripe_prod_id == os.getenv('REACT_STRIPE_UNLIMITED_ID'):
        return find_product_user_pair_id(product_names['REACT_STRIPE_UNLIMITED_ID'])
    elif stripe_prod_id == os.getenv('REACT_STRIPE_GOLD_ID'):
        return find_product_user_pair_id(product_names['REACT_STRIPE_GOLD_ID'])
    elif stripe_prod_id == str(os.getenv('REACT_STRIPE_SILVER_ID')):
        return find_product_user_pair_id(product_names['REACT_STRIPE_SILVER_ID'])


@authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['POST'])
def save_stripe_info(self, email, paymentMethodID, subscription_type, upgrade, user_id):
    product_names = {
        'REACT_STRIPE_UNLIMITED_ID': 'Unlimited',
        'REACT_STRIPE_GOLD_ID': 'Gold',
        'REACT_STRIPE_SILVER_ID': 'Silver'
    }
    print(subscription_type)
    try:
        extra_msg = ''
        customer_data = stripe.Customer.list(email=email).data
        if len(customer_data) == 0:
            customer = create_cust_and_sub(
                email, paymentMethodID, subscription_type)

        elif upgrade == 'no-upgrade':  # As customer exists check for active subscription
            # As customer exists check if active subscription exists for customer and return response
            customer = customer_data[0]
            extra_msg = "Customer already existed."
            subs = stripe.Subscription.list(status='active')
            found_active_sub = False
            isSubedCurrentProd = False
            upgrade_message = ''
            for sub in subs.data:  # search for sub and see if it is the same one
                if sub.customer == customer.id:  # find customer
                    found_active_sub = True
                    for array in sub.items():
                        if array[0] == 'items':  # find sub and compare to current
                            current_product_id = array[1].data[0].plan.id
                            isSubedCurrentProd = current_product_id == str(
                                os.getenv(subscription_type))

                            upgrade_message = 'Subscription already active for same product' if isSubedCurrentProd else check_sub_upgrade(
                                current_product_id, subscription_type)
                    return Response(
                        status=status.HTTP_200_OK,
                        data={
                            'data': {'message': upgrade_message, 'customer_id': customer.id, 'extra_msg': extra_msg}
                        }
                    )

            if found_active_sub == False:
                add_card_set_default_and_create_sub(
                    paymentMethodID, customer, subscription_type)

        elif upgrade == 'upgrade':
            customer = customer_data[0]
            extra_msg = "Customer already existed."
            subs = stripe.Subscription.list(status='active')
            for sub in subs.data:
                if sub.customer == customer.id:
                    stripe.Subscription.delete(
                        sub.id,
                    )
                    pair_id = pair_id_from_stripe_product_id(
                        sub.plan.id, product_names)
                    ProductUserPairUpdateFunction(pair_id, user_id, False)

            add_card_set_default_and_create_sub(
                paymentMethodID, customer, subscription_type)

        ProductUserPairUpdateFunction(
            find_product_user_pair_id(product_names[subscription_type]), user_id, True)
        return Response(
            status=status.HTTP_200_OK,
            data={
                'data': {'message': 'Success', 'customer_id': customer.id, 'extra_msg': extra_msg}
            }
        )
    except Exception as e:
        return Response({'msg': 'something went wrong while creating stripe session', 'error': str(e)}, status=500)


class ReactView(TemplateView):
    template_name = 'steelworks/react.html'

############# """ USER VIEWS """#####################


class SteelworksUserCreate(generics.CreateAPIView):
    queryset = models.SteelworksUser.objects.all(),
    serializer_class = serializers.SteelworksUserSerializer


def SteelworksUserGetFunction(self, user_email):
    if user_email.__contains__('@'):
        user_array = models.SteelworksUser.objects.all()

        for user in user_array:
            if user.email == user_email:
                return HttpResponse(json.dumps({
                    'first_name': user.first_name,
                    'last_name': user.last_name,
                    'email': user.email,
                    'address_line_1': user.address_line_1,
                    'address_line_2': user.address_line_2,
                    'address_line_3': user.address_line_3,
                    'postcode': user.postcode,
                    'phone': user.phone,
                    'id': user.id,
                }), content_type="application/json")

        return HttpResponse(json.dumps({'response': 'no user found'}))
    else:
        return HttpResponse(json.dumps({'response': 'You must enter an email address'}))


class SteelworksUserDetail(generics.RetrieveAPIView):
    queryset = models.SteelworksUser.objects.all()
    serializer_class = serializers.SteelworksUserSerializer


def SteelworksUserUpdateFunction(self, pk, user_email, password,
                                 address_line_1, address_line_2,
                                 address_line_3, postcode, phone
                                 ):
    auth_user_array = User.objects.all()

    for user in auth_user_array:
        if user.email == user_email:
            if user.check_password(password):
                obj = models.SteelworksUser.objects.get(pk=pk)
                obj.address_line_1 = address_line_1
                obj.address_line_2 = address_line_2
                obj.address_line_3 = address_line_3
                obj.postcode = postcode
                obj.phone = phone
                obj.save()
                return HttpResponse(json.dumps({'response': 'updated'}))
            else:
                return HttpResponse(json.dumps({'response': 'password incorrect'}))
    return HttpResponse(json.dumps({'response': 'user not found'}))


class SteelworksUserDelete(generics.RetrieveDestroyAPIView):
    queryset = models.SteelworksUser.objects.all()
    serializer_class = serializers.SteelworksUserSerializer


############# """ PRODUCT VIEWS """#####################
class ProductCreate(generics.CreateAPIView):
    queryset = models.Product.objects.all(),
    serializer_class = serializers.ProductSerializer


class ProductList(generics.ListAPIView):
    queryset = models.Product.objects.all()
    serializer_class = serializers.ProductSerializer


class ProductDetail(generics.RetrieveAPIView):
    queryset = models.Product.objects.all()
    serializer_class = serializers.ProductSerializer


class ProductUpdate(generics.RetrieveUpdateAPIView):
    queryset = models.Product.objects.all()
    serializer_class = serializers.ProductSerializer


class ProductDelete(generics.RetrieveDestroyAPIView):
    queryset = models.Product.objects.all()
    serializer_class = serializers.ProductSerializer


############# """ PRODUCT/USER PAIR VIEWS """#####################
class ProductUserPairCreate(generics.CreateAPIView):
    queryset = models.ProductUserPair.objects.all(),
    serializer_class = serializers.ProductUserPairSerializer


class ProductUserPairList(generics.ListAPIView):
    queryset = models.ProductUserPair.objects.all()
    serializer_class = serializers.ProductUserPairSerializer


class ProductUserPairDetail(generics.RetrieveAPIView):
    queryset = models.ProductUserPair.objects.all()
    serializer_class = serializers.ProductUserPairSerializer


def ProductUserPairCreateFunction(prod, users):

    p = models.ProductUserPair(product=prod,
                               subscribed_users=users)
    p.save()


def ProductUserPairUpdateFunction(pk, user_id, add_remove):
    obj = models.ProductUserPair.objects.get(pk=pk)
    user = models.SteelworksUser.objects.get(pk=user_id)
    if add_remove:
        obj.subscribed_users.add(user)
    else:
        obj.subscribed_users.remove(user)
    obj.save()

#ProductUserPairUpdateFunction(6, 18, False)


class ProductUserPairDelete(generics.RetrieveDestroyAPIView):
    queryset = models.ProductUserPair.objects.all()
    serializer_class = serializers.ProductUserPairSerializer

############# """ GYM CLASSES VIEWS """#####################


class ClassesList(generics.ListAPIView):
    queryset = models.Classes.objects.all()
    serializer_class = serializers.ClassesSerializer


class ClassesDetail(generics.RetrieveAPIView):
    queryset = models.Classes.objects.all()
    serializer_class = serializers.ClassesSerializer


def ClassesCreateFunction(name, details):

    obj = models.Classes(class_name=name,
                         class_details=details,)
    obj.save()


def ClassesUpdateFunction(self, class_name, details, instr_email, student_id, remove_user):
    if instr_email == 'undefined' or instr_email == 'Choose instructor':
        instr_email = 'morleyj@steelworks.com'
    try:
        gym_class = models.Classes.objects.get(class_name=class_name)
        student = models.SteelworksUser.objects.get(pk=student_id)
        instructor = models.Instructor.objects.get(email=instr_email)
        try:
            if remove_user == 'remove':
                gym_class.enrolled_students.remove(student)
                return HttpResponse(json.dumps({'response': 'user removed from class'}), status=200)
        except Exception as e:
            return Response({'msg': 'something went wrong while updating classes', 'error': str(e)}, status=500)

        gym_class.enrolled_students.add(student)
        gym_class.instructor.add(instructor)
        if details != 'from frontend':
            gym_class.class_details = details
        gym_class.save()
        return HttpResponse(json.dumps({'response': 'updated'}), status=200)
    except Exception as e:
        return Response({'msg': 'something went wrong while updating classes', 'error': str(e)}, status=500)


#ClassesUpdateFunction('CrossFit', 'A form of high intensity interval training, CrossFit is a strength and conditioning workout that is made up of functional movement performed at a high intensity level. These movements are actions that you perform in your day-to-day life, like squatting, pulling, pushing etc.', 'morleyj@steelworks.com', 1, 'add')


def getUserClasses(self, student_id):
    try:
        gym_class = models.Classes.objects.filter(
            enrolled_students__pk=student_id)
        values = gym_class.values()
        user_classes_list = []
        for i in values:
            user_classes_list.append(i['class_name'])
        return HttpResponse(json.dumps({'response': user_classes_list}), status=200)

    except Exception as e:
        return Response({'msg': 'something went wrong while retrieving user classes', 'error': str(e)}, status=500)


class ClassesDelete(generics.RetrieveDestroyAPIView):
    queryset = models.Classes.objects.all()
    serializer_class = serializers.ClassesSerializer


############# """ INSTRUCTOR VIEWS """#####################
class InstructorList(generics.ListAPIView):
    queryset = models.Instructor.objects.all()
    serializer_class = serializers.InstructorSerializer


class InstructorDetail(generics.RetrieveAPIView):
    queryset = models.Instructor.objects.all()
    serializer_class = serializers.InstructorSerializer


class InstructorUpdate(generics.RetrieveUpdateAPIView):
    queryset = models.Instructor.objects.all()
    serializer_class = serializers.InstructorSerializer


class InstructorCreate(generics.CreateAPIView):
    queryset = models.Instructor.objects.all()
    serializer_class = serializers.InstructorSerializer


class InstructorDelete(generics.RetrieveDestroyAPIView):
    queryset = models.Instructor.objects.all()
    serializer_class = serializers.InstructorSerializer

############# """ INSTRUCTOR USER PAIR VIEWS """#####################


def InstructorUserPairCreateFunction(instr_email):

    p = models.InstructorUserPair(instructor_email=instr_email)
    p.save()


def InstructorUserPairUpdateFunction(self, instr_email, student_id, remove):
    try:
        student = models.SteelworksUser.objects.get(pk=student_id)
        pair = models.InstructorUserPair.objects.get(
            instructor_email=instr_email)

        if remove == 'add':
            pair.students.add(student)
            pair.save()
            return HttpResponse(json.dumps({'response': 'student added to instructor student list'}), status=200)
        else:
            pair.students.remove(student)
            pair.save()
            return HttpResponse(json.dumps({'response': 'student removed from the instructor student list'}), status=200)
    except Exception as e:
        if str(e) == 'InstructorUserPair matching query does not exist.':
            print('no exist')
            InstructorUserPairCreateFunction(instr_email)
            InstructorUserPairUpdateFunction(self, instr_email, student_id, remove)
            return Response({'msg': 'creating instructor student list'}, status=201)
        return Response({'msg': 'something went wrong while updating instructor/student list', 'error': str(e)}, status=500)


#InstructorUserPairUpdateFunction('mmmorleyj@steelworks.com', 1, 'add')
# InstructorUserPairCreateFunction('morleyj@steelworks.com')


class InstructorUserPairList(generics.ListAPIView):
    queryset = models.InstructorUserPair.objects.all()
    serializer_class = serializers.InstructorUserPairSerializer


class InstructorUserPairDetail(generics.RetrieveAPIView):
    queryset = models.InstructorUserPair.objects.all()
    serializer_class = serializers.InstructorUserPairSerializer


############# """ AUTH VIEWS """#####################
class LoginView(views.APIView):
    """ Endpoint that logs in a regestered user """
    permission_classes = [permissions.AllowAny]
    authentication_classes = []

    def post(self, request, format=None):
        """ Makes a POST request to the backend and returns the
        response status """
        serializer = serializers.LoginSerializer(
            data=self.request.data,
            context={'request': self.request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        return Response(None, status=status.HTTP_202_ACCEPTED)


class LogoutView(views.APIView):
    """ Endpoint that logs out a user """
    permission_classes = [permissions.AllowAny]
    authentication_classes = []

    def post(self, request, format=None):
        """ Makes a POST request to the backend and
        returns the status response """
        logout(request)
        return Response(None, status=status.HTTP_204_NO_CONTENT)


class ProfileView(generics.RetrieveAPIView):
    """ Endpoint that gets profile information on a logged in user
    if a user is logged in"""
    #authentication_classes = [authentication.SessionAuthentication]
    #permission_classes = [permissions.IsAuthenticated]
    permission_classes = [permissions.AllowAny]
    serializer_class = serializers.UserSerializer

    def get_object(self):
        """ Makes a GET request to the backend and
        returns the reponse object """
        return self.request.user


class CreateUserView(generics.CreateAPIView):
    """ Endpoint that registeres a new user """
    permission_classes = [permissions.AllowAny]
    authentication_classes = []
    queryset = User.objects.all()
    serializer_class = serializers.CreateUserSerializer
