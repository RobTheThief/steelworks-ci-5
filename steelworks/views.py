""" Views for the Steelworks app to make CRUD operations on the
database, login, regester, logout user, get profile and to make
external API requests to Stripe """

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
from rest_framework.decorators import api_view, authentication_classes, \
     permission_classes
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from steelworks import serializers
from steelworks import models


stripe.api_key = str(os.getenv('REACT_STRIPE_SECRET_KEY'))


class ReactView(TemplateView):
    """ Extends Django TemplateView for the react.html page """
    template_name = 'steelworks/react.html'


def create_cust_and_sub(email, payment_method_id, subscription_type):
    """ Takes in strings for user email, stript
    paymentMethodID and subscription_type. Creates
    the stripe customer object, sets default payment
    method and then creates a stripe subscription.
    Returns the stripe customer object"""

    customer = stripe.Customer.create(
        email=email,
        payment_method=payment_method_id,
        invoice_settings={
            'default_payment_method': payment_method_id
        }
    )
    stripe.Subscription.create(
        customer=customer,
        items=[
            {
                'price': str(os.getenv(subscription_type))
            }
        ]
    )
    return customer


def add_card_set_default_and_create_sub(payment_method_id, customer,
                                        subscription_type):
    """ Takes in stripe paymentMethodID (string) and customer (dict), and
    subscription_type (string). Attaches payment method, sets customer default
    payment method and creates subscription."""
    stripe.PaymentMethod.attach(
        payment_method_id,
        customer=customer.id,
    )
    stripe.Customer.modify(
        customer.id,
        invoice_settings={
            "default_payment_method": payment_method_id},
    )
    stripe.Subscription.create(
        customer=customer,
        items=[
            {
                'price': str(os.getenv(subscription_type))
            }
        ]
    )


def check_sub_upgrade(current_product_id, subscription_type):
    """ Takes in current_product_id (string) and subscription_type (string)
    selected and Checks if user is trying to upgrage or downgrade
    subscription, and then returns a message as a string """
    product_order_array = [str(os.getenv('REACT_STRIPE_UNLIMITED_ID')), str(
        os.getenv('REACT_STRIPE_GOLD_ID')),
        str(os.getenv('REACT_STRIPE_SILVER_ID'))]
    current_prod_order = product_order_array.index(
        current_product_id)
    submitted_prod_order = product_order_array.index(
        str(os.getenv(subscription_type)))
    if current_prod_order > submitted_prod_order:
        return 'Are you sure you want to upgrade your subscription?'
    else:
        return 'You cannot downgrade your subscription'


def find_product_user_pair_id(product_name):
    """ Takes in product_name (string) and finds the
    ProductUserPair object in the database according
    to product name, then returns the ProductUserPair ID."""
    product_user_pair = models.ProductUserPair.objects.filter(
        product__product_name=product_name)
    return product_user_pair.values()[0]['id']


def product_name_from_stripe_product_id(stripe_prod_id: str, product_names):
    """ Takes in stripe_prod_id (string) and product_names (dict)
    and matches the product_names key to the correct stripe_prod_id
    and returns the value of that key. """
    if stripe_prod_id == os.getenv('REACT_STRIPE_UNLIMITED_ID'):
        return find_product_user_pair_id(
            product_names['REACT_STRIPE_UNLIMITED_ID'])
    elif stripe_prod_id == os.getenv('REACT_STRIPE_GOLD_ID'):
        return find_product_user_pair_id(product_names['REACT_STRIPE_GOLD_ID'])
    elif stripe_prod_id == str(os.getenv('REACT_STRIPE_SILVER_ID')):
        return find_product_user_pair_id(
            product_names['REACT_STRIPE_SILVER_ID'])


@api_view(['POST'])
@authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticated])
def save_stripe_info(
    self, email, payment_method_id, subscription_type, upgrade, user_id
        ):
    """ Takes in email(string), paymentMethodID(string),
    subscription_type(string), upgrade(string),
    user_id(int). Makes a Stripe payment API request and
    returns a success, error or warning message"""
    product_names = {
        'REACT_STRIPE_UNLIMITED_ID': 'Unlimited',
        'REACT_STRIPE_GOLD_ID': 'Gold',
        'REACT_STRIPE_SILVER_ID': 'Silver'
    }
    try:
        extra_msg = ''
        customer_data = stripe.Customer.list(email=email).data
        if len(customer_data) == 0:
            customer = create_cust_and_sub(
                email, payment_method_id, subscription_type)

        elif upgrade == 'no-upgrade':
            customer = customer_data[0]
            extra_msg = "Customer already existed."
            subs = stripe.Subscription.list(status='active')
            found_active_sub = False
            isSubedCurrentProd = False
            upgrade_message = ''
            for sub in subs.data:
                if sub.customer == customer.id:
                    found_active_sub = True
                    for array in sub.items():
                        if array[0] == 'items':
                            current_product_id = array[1].data[0].plan.id
                            isSubedCurrentProd = current_product_id == str(
                                os.getenv(subscription_type))

                            if isSubedCurrentProd:
                                upgrade_message = (
                                        'Subscription already active',
                                        'for same product')
                            else:
                                upgrade_message = check_sub_upgrade(
                                    current_product_id, subscription_type)

                    return Response(
                        status=status.HTTP_200_OK,
                        data={
                            'data': {
                                'message': upgrade_message,
                                'customer_id': customer.id,
                                'extra_msg': extra_msg}
                        }
                    )

            if found_active_sub is False:
                add_card_set_default_and_create_sub(
                    payment_method_id, customer, subscription_type)

        elif upgrade == 'upgrade':
            customer = customer_data[0]
            extra_msg = "Customer already existed."
            subs = stripe.Subscription.list(status='active')
            for sub in subs.data:
                if sub.customer == customer.id:
                    stripe.Subscription.delete(
                        sub.id,
                    )
                    pair_id = product_name_from_stripe_product_id(
                        sub.plan.id, product_names)
                    ProductUserPairUpdateFunction(pair_id, user_id, False)

            add_card_set_default_and_create_sub(
                payment_method_id, customer, subscription_type)

        ProductUserPairUpdateFunction(
            find_product_user_pair_id(
                product_names[subscription_type]), user_id, True)
        return Response(
            status=status.HTTP_200_OK,
            data={
                'data': {
                    'message': 'Success',
                    'customer_id': customer.id,
                    'extra_msg': extra_msg
                    }
            }
        )
    except Exception as e:
        return Response(
            {
                'msg': 'something went wrong while creating stripe session',
                'error': str(e)
            }, status=500)


class SteelworksUserCreate(generics.CreateAPIView):
    """ Class view endpoint that allows creation of a new Steelworks User """
    authentication_classes = []
    permission_classes = [permissions.AllowAny]
    queryset = models.SteelworksUser.objects.all(),
    serializer_class = serializers.SteelworksUserSerializer


@api_view(['GET'])
@authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticated])
def SteelworksUserGetFunction(self, user_email):
    """ Function view that takes in user_email (string) and returns a dict
    with the correct user details as a HttpResponse, or error message if
    not found """
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
        return HttpResponse(json.dumps({
            'response': 'You must enter an email address'
            }))


class SteelworksUserDetail(generics.RetrieveAPIView):
    """Class view endpoint that allows retrieval of a
    Steelworks User by id(int)"""
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAdminUser]
    queryset = models.SteelworksUser.objects.all()
    serializer_class = serializers.SteelworksUserSerializer


@api_view(['GET'])
@authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticated])
def SteelworksUserUpdateFunction(self, pk, user_email, password,
                                 address_line_1, address_line_2,
                                 address_line_3, postcode, phone
                                 ):
    """ Takes in pk(int), user_email(string), password(string),
    address_line_1(string), address_line_2(string),
    address_line_3(string), postcode(string), phone(int). Checks
    the user password is correct, updates the Steelworks user in
    the database and returns a response, or returns an error
    message as a response"""
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
                return HttpResponse(json.dumps({
                    'response': 'password incorrect'
                    }))
    return HttpResponse(json.dumps({'response': 'user not found'}))


class ProductCreate(generics.CreateAPIView):
    """Class view endpoint that allows creation of a Product"""
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAdminUser]
    queryset = models.Product.objects.all(),
    serializer_class = serializers.ProductSerializer


class ProductList(generics.ListAPIView):
    """Class view endpoint that lists all Products"""
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = models.Product.objects.all()
    serializer_class = serializers.ProductSerializer


class ProductDetail(generics.RetrieveAPIView):
    """Class view endpoint that allows retrieval of a Product by id (int)"""
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = models.Product.objects.all()
    serializer_class = serializers.ProductSerializer


class ProductUpdate(generics.RetrieveUpdateAPIView):
    """Class view endpoint that allows updating of a Product by id (int)"""
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAdminUser]
    queryset = models.Product.objects.all()
    serializer_class = serializers.ProductSerializer


class ProductDelete(generics.RetrieveDestroyAPIView):
    """Class view endpoint that allows deleting of a Product by id (int)"""
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAdminUser]
    queryset = models.Product.objects.all()
    serializer_class = serializers.ProductSerializer


class ProductUserPairCreate(generics.CreateAPIView):
    """Class view endpoint that allows creating of a ProductUserPair"""
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAdminUser]
    queryset = models.ProductUserPair.objects.all(),
    serializer_class = serializers.ProductUserPairSerializer


class ProductUserPairList(generics.ListAPIView):
    """Class view endpoint that lists all ProductUserPairs"""
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = models.ProductUserPair.objects.all()
    serializer_class = serializers.ProductUserPairSerializer


class ProductUserPairDetail(generics.RetrieveAPIView):
    """Class view endpoint that allows retrieval of a
    ProductUserPair by id (int)"""
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = models.ProductUserPair.objects.all()
    serializer_class = serializers.ProductUserPairSerializer


class ProductUserPairUpdate(generics.RetrieveUpdateAPIView):
    """Class view endpoint that allows updating of a
    ProductUserPair by id (int)"""
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAdminUser]
    queryset = models.ProductUserPair.objects.all()
    serializer_class = serializers.ProductUserPairSerializer


def ProductUserPairUpdateFunction(pk, user_id, add_remove):
    """Takes in pk(int), user_id(int) and add_remove(string).
    Function view that allows updaing of a ProductUserPair by
    adding or removing a user"""
    obj = models.ProductUserPair.objects.get(pk=pk)
    user = models.SteelworksUser.objects.get(pk=user_id)
    if add_remove:
        obj.subscribed_users.add(user)
    else:
        obj.subscribed_users.remove(user)
    obj.save()


class ProductUserPairDelete(generics.RetrieveDestroyAPIView):
    """Class view endpoint that allows deleting of a
    ProductUserPair by id (int)"""
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAdminUser]
    queryset = models.ProductUserPair.objects.all()
    serializer_class = serializers.ProductUserPairSerializer


class ClassTimeUserPairList(generics.ListAPIView):
    """Class view endpoint that lists all ClassTimeUserPairs"""
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAdminUser]
    queryset = models.ClassTimeUserPair.objects.all()
    serializer_class = serializers.ClassTimeUserPairSerializer


class ClassTimeUserPairCreate(generics.CreateAPIView):
    """Class view endpoint that allows creating of a ClassTimeUser"""
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAdminUser]
    queryset = models.ClassTimeUserPair.objects.all(),
    serializer_class = serializers.ClassTimeUserPairSerializer


class ClassTimeUserPairUpdate(generics.RetrieveUpdateAPIView):
    """Class view endpoint that allows updating of a
    ClassTimeUserPair by id (int)"""
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAdminUser]
    queryset = models.ClassTimeUserPair.objects.all()
    serializer_class = serializers.ClassTimeUserPairSerializer


class ClassTimeUserPairDelete(generics.RetrieveDestroyAPIView):
    """Class view endpoint that allows deleting of a
    ClassTimeUserPair by id (int)"""
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAdminUser]
    queryset = models.ClassTimeUserPair.objects.all()
    serializer_class = serializers.ClassTimeUserPairSerializer


@api_view(['GET'])
@authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticated])
def ClassTimeUserPairUpdateFunction(self, gym_class_name, user_id,
                                    add_remove, time_slot):
    """ Takes in gym_class_name(string), user_id(int),
    add_remove(string), time_slot(string). Updates
    ClassTimeUserPair slots according to class name and
    user and returns a HttpResponse message or error message"""
    try:
        gym_class = models.Classes.objects.get(class_name=gym_class_name)
        pair = models.ClassTimeUserPair.objects.get(gym_class=gym_class)
        user = models.SteelworksUser.objects.get(pk=user_id)
        if add_remove == 'add' and time_slot == 'time_slot_1':
            pair.time_slot_1.add(user)
            pair.save()
            return HttpResponse(json.dumps({
                'response': 'added to time slot 1'
                }))
        elif time_slot == 'time_slot_1':
            pair.time_slot_1.remove(user)
            pair.save()
            return HttpResponse(json.dumps({
                'response': 'removed from time slot 1'
                }))
        if add_remove == 'add' and time_slot == 'time_slot_2':
            pair.time_slot_2.add(user)
            pair.save()
            return HttpResponse(json.dumps({
                'response': 'added to time slot 2'
                }))
        elif time_slot == 'time_slot_2':
            pair.time_slot_2.remove(user)
            pair.save()
            return HttpResponse(json.dumps({
                'response': 'removed from time slot 2'
                }))

    except Exception as e:
        return Response({
            'msg': 'something went wrong while updating class time slot',
            'error': str(e)}, status=500)


@api_view(['GET'])
@authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticated])
def findUserTimeSlots(self, user_id):
    """ Takes in user_id(int) and finds the time slots the user
    in enrolled for. Returns a HttpResponse with a dict of
    classes for each time slot, or an error message """
    try:
        find_slot_1 = models.ClassTimeUserPair.objects.filter(
            time_slot_1__id=user_id)
        find_slot_2 = models.ClassTimeUserPair.objects.filter(
            time_slot_2__id=user_id)

        slot_1_gym_class_ids = []
        slot_2_gym_class_ids = []
        for slot in find_slot_1.values():
            gym_class = models.Classes.objects.get(pk=slot['gym_class_id'])
            slot_1_gym_class_ids.append(gym_class.class_name)
        for slot in find_slot_2.values():
            gym_class = models.Classes.objects.get(pk=slot['gym_class_id'])
            slot_2_gym_class_ids.append(gym_class.class_name)
        return HttpResponse(json.dumps({
            'slot_1': slot_1_gym_class_ids, 'slot_2': slot_2_gym_class_ids
            }))
    except Exception as e:
        return Response({
            'msg': 'something went wrong while getting user class time slots',
            'error': str(e)
            }, status=500)


class ClassesList(generics.ListAPIView):
    """Class view endpoint that lists all Classes"""
    authentication_classes = [SessionAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    queryset = models.Classes.objects.all()
    serializer_class = serializers.ClassesSerializer


class ClassesCreate(generics.CreateAPIView):
    """Class view endpoint that creates a Classes object in the database"""
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAdminUser]
    queryset = models.Classes.objects.all()
    serializer_class = serializers.ClassesSerializer


class ClassesUpdate(generics.RetrieveUpdateAPIView):
    """Class view endpoint that allows updating of a
    Classes object by id (int)"""
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAdminUser]
    queryset = models.Classes.objects.all()
    serializer_class = serializers.ClassesSerializer


class ClassesDelete(generics.RetrieveDestroyAPIView):
    """Class view endpoint that allows deleting of a
    Classes object by id (int)"""
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAdminUser]
    queryset = models.Classes.objects.all()
    serializer_class = serializers.ClassesSerializer


@api_view(['GET'])
@authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticated])
def ClassesUpdateFunction(self, class_name, details, student_id, remove_user):
    """ Takes in class_name(string), details(string), student_id(int),
    remove_user(string). Either adds or removes a user to the Class and
    returns a HttpResponse or an error response """
    try:
        gym_class = models.Classes.objects.get(class_name=class_name)
        student = models.SteelworksUser.objects.get(pk=student_id)

        try:
            if remove_user == 'remove':
                gym_class.enrolled_students.remove(student)
                return HttpResponse(json.dumps({
                    'response': 'user removed from class'
                    }), status=200)
        except Exception as e:
            return Response({
                'msg': 'something went wrong while updating classes',
                'error': str(e)
                }, status=500)

        gym_class.enrolled_students.add(student)
        if details != 'from frontend':
            gym_class.class_details = details
        gym_class.save()
        return HttpResponse(json.dumps({'response': 'updated'}), status=200)
    except Exception as e:
        print(str(e))
        return Response({
            'msg': 'something went wrong while updating classes',
            'error': str(e)
            }, status=500)


@api_view(['GET'])
@authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticated])
def getUserClasses(self, student_id):
    """ Takes in student_id(int) and returns a list of all enrolled classes as
    a HttpResponse or returns an error response. """
    try:
        gym_class = models.Classes.objects.filter(
            enrolled_students__pk=student_id)
        values = gym_class.values()
        user_classes_list = []
        for i in values:
            user_classes_list.append(i['class_name'])
        return HttpResponse(json.dumps({
            'response': user_classes_list
            }), status=200)

    except Exception as e:
        return Response({
            'msg': 'something went wrong while retrieving user classes',
            'error': str(e)
            }, status=500)


class InstructorList(generics.ListAPIView):
    """Class view endpoint that lists all Instructors"""
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAdminUser]
    queryset = models.Instructor.objects.all()
    serializer_class = serializers.InstructorSerializer


class InstructorDetail(generics.RetrieveAPIView):
    """Class view endpoint that allows retrieval of an
    Instructor object by id (int)"""
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = models.Instructor.objects.all()
    serializer_class = serializers.InstructorSerializer


class InstructorUpdate(generics.RetrieveUpdateAPIView):
    """Class view endpoint that allows updating of an
    Instructor object by id (int)"""
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAdminUser]
    queryset = models.Instructor.objects.all()
    serializer_class = serializers.InstructorSerializer


class InstructorCreate(generics.CreateAPIView):
    """Class view endpoint that allows creation of an
    Instructor"""
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAdminUser]
    queryset = models.Instructor.objects.all()
    serializer_class = serializers.InstructorSerializer


class InstructorDelete(generics.RetrieveDestroyAPIView):
    """Class view endpoint that allows deleting of an
    Instructor object by id (int)"""
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAdminUser]
    queryset = models.Instructor.objects.all()
    serializer_class = serializers.InstructorSerializer


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
    permission_classes = [permissions.IsAuthenticated]
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
