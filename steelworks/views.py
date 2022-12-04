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
from rest_framework.permissions import IsAuthenticated

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


@api_view(['POST'])
@authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticated])
def save_stripe_info(self, email, paymentMethodID, subscription_type, upgrade):

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
                            print('anything')
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
            add_card_set_default_and_create_sub(
                paymentMethodID, customer, subscription_type)

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

############# """ GYM CLASSES VIEWS """#####################


class ClassesList(generics.ListAPIView):
    queryset = models.Classes.objects.all()
    serializer_class = serializers.ClassesSerializer


class ClassesDetail(generics.RetrieveAPIView):
    queryset = models.Classes.objects.all()
    serializer_class = serializers.ClassesSerializer


def ClassesCreateFunction(name, details, instr, students):

    p = models.Classes(class_name=name,
                       class_details=details,
                       instructor=instr,
                       enrolled_students=students)
    p.save()


def ClassesUpdateFunction(pk, name, details, instr, students):
    obj = models.Classes.objects.get(pk=pk)
    obj.class_name = name
    obj.class_details = details
    obj.instructor = instr
    obj.enrolled_students = students
    obj.save()


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


############# """ INSTRUCTOR USER PAIR VIEWS """#####################
def InstructorUserPairCreateFunction(instr, stdns):

    p = models.InstructorUserPair(instructor=instr,
                                  students=stdns)
    p.save()


def InstructorUserPairUpdateFunction(pk, inst, stdns):
    obj = models.Product.objects.get(pk=pk)
    obj.instructor = inst
    obj.students = stdns
    obj.save()


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
