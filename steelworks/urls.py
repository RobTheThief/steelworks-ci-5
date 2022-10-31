from django.urls import include, path
from .views import UserCreate, UserList, UserDetail, UserUpdate, UserDelete


urlpatterns = [
    path('create/', UserCreate.as_view(), name='create-User'),
    path('', UserList.as_view()),
    path('<int:pk>/', UserDetail.as_view(), name='retrieve-User'),
    path('update/<int:pk>/', UserUpdate.as_view(), name='update-User'),
    path('delete/<int:pk>/', UserDelete.as_view(), name='delete-User')
]
