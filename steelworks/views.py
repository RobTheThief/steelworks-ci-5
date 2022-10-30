from django.shortcuts import render

from .models import User
from rest_framework import generics
from .serializers import UserSerializer


class UserCreate(generics.CreateAPIView):
    queryset = User.objects.all(),
    serializer_class = UserSerializer


class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
