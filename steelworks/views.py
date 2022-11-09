from steelworks import models
from django.contrib.auth.models import User
from django.views.generic import TemplateView

import urllib.request
from django.template import engines
from django.http import HttpResponse
from django.conf import settings

from rest_framework import generics
from rest_framework import permissions
from rest_framework import views
from rest_framework import status
from rest_framework.response import Response
from django.http import HttpResponse
from steelworks import serializers
from django.contrib.auth import login, logout


def catchall_dev(request, upstream='http://localhost:3000'):
    upstream_url = upstream + request.path
    with urllib.request.urlopen(upstream_url) as response:
        content_type = response.headers.get('Content-Type')

        if content_type == 'text/html; charset=UTF-8':
            response_text = response.read().decode()
            content = engines['django'].from_string(response_text).render()
        else:
            content = response.read()

        return HttpResponse(
            content,
            content_type=content_type,
            status=response.status,
            reason=response.reason,
        )


catchall_prod = TemplateView.as_view(template_name='index.html')

catchall = catchall_dev if settings.DEBUG else catchall_prod


############# """ USER VIEWS """#####################
class SteelworksUserCreate(generics.CreateAPIView):
    queryset = models.SteelworksUser.objects.all(),
    serializer_class = serializers.SteelworksUserSerializer


class SteelworksUserList(generics.ListAPIView):
    queryset = models.SteelworksUser.objects.all()
    serializer_class = serializers.SteelworksUserSerializer


class SteelworksUserDetail(generics.RetrieveAPIView):
    queryset = models.SteelworksUser.objects.all()
    serializer_class = serializers.SteelworksUserSerializer


class SteelworksUserUpdate(generics.RetrieveUpdateAPIView):
    queryset = models.SteelworksUser.objects.all()
    serializer_class = serializers.SteelworksUserSerializer


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

    p = models.InstructorUserPair(product=prod,
                                  subscribed_users=users)
    p.save()


def ProductUserPairUpdateFunction(pk, prod, users):
    obj = models.Product.objects.get(pk=pk)
    obj.product = prod
    obj.subscribed_users = users
    obj.save()


############# """ GYM CLASSES VIEWS """#####################
class ClassesList(generics.ListAPIView):
    queryset = models.Classes.objects.all()
    serializer_class = serializers.ClassesSerializer


class ClassesDetail(generics.RetrieveAPIView):
    queryset = models.Classes.objects.all()
    serializer_class = serializers.ClassesSerializer


def ClassesCreateFunction(name, details, instr, students):

    p = models.InstructorUserPair(class_name=name,
                                  class_details=details,
                                  instructor=instr,
                                  enrolled_students=students)
    p.save()


def ClassesUpdateFunction(pk, name, details, instr, students):
    obj = models.Product.objects.get(pk=pk)
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
        print('Hello')
        return self.request.user


class CreateUserView(generics.CreateAPIView):
    """ Endpoint that registeres a new user """
    permission_classes = [permissions.AllowAny]
    authentication_classes = []
    queryset = User.objects.all()
    serializer_class = serializers.CreateUserSerializer
