from django.shortcuts import render

from .models import User
from rest_framework import generics
from .serializers import UserSerializer


class CustomerCreate(generics.CreateAPIView):
    queryset = User.objects.all(),
    serializer_class = UserSerializer


class CustomerList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
