from django.urls import include, path
from .views import SteelworksUserCreate, SteelworksUserList, SteelworksUserDetail, SteelworksUserUpdate, SteelworksUserDelete


urlpatterns = [
    path('create/', UserCreate.as_view(), name='create-User'),
    path('', SteelworksUserList.as_view()),
    path('<int:pk>/', SteelworksUserDetail.as_view(), name='retrieve-User'),
    path('update/<int:pk>/', SteelworksUserUpdate.as_view(), name='update-User'),
    path('delete/<int:pk>/', SteelworksUserDelete.as_view(), name='delete-User')
]
