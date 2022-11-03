from django.shortcuts import render

from steelworks import models
from django.contrib.auth.models import User
from django.views.generic import TemplateView

import urllib.request
from django.template import engines
from django.http import HttpResponse
from django.conf import settings

from rest_framework import generics
from rest_framework import permissions
from rest_framework import authentication
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


class ProductUserPairUpdate(generics.RetrieveUpdateAPIView):
    queryset = models.ProductUserPair.objects.all()
    serializer_class = serializers.ProductUserPairSerializer


class ProductUserPairCreate(generics.CreateAPIView):
    queryset = models.ProductUserPair.objects.all()
    serializer_class = serializers.ProductUserPairSerializer


############# """ GYM CLASSES VIEWS """#####################
class ClassesList(generics.ListAPIView):
    queryset = models.Classes.objects.all()
    serializer_class = serializers.ClassesSerializer


class ClassesDetail(generics.RetrieveAPIView):
    queryset = models.Classes.objects.all()
    serializer_class = serializers.ClassesSerializer


class ClassesUpdate(generics.RetrieveUpdateAPIView):
    queryset = models.Classes.objects.all()
    serializer_class = serializers.ClassesSerializer


class ClassesCreate(generics.CreateAPIView):
    queryset = models.Classes.objects.all()
    serializer_class = serializers.ClassesSerializer


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
    authentication_classes = [authentication.SessionAuthentication]
    permission_classes = [permissions.IsAuthenticated]
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
