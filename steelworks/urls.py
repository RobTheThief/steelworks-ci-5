from django.urls import include, path
from steelworks import views

urlpatterns = [
    path('user/create/', views.SteelworksUserCreate.as_view(), name='create-User'),
    path('user/', views.SteelworksUserList.as_view()),
    path('user/<int:pk>/', views.SteelworksUserDetail.as_view(), name='retrieve-User'),
    path('user/update/<int:pk>/',
         views.SteelworksUserUpdate.as_view(), name='update-User'),
    path('user/delete/<int:pk>/',
         views.SteelworksUserDelete.as_view(), name='delete-User'),

    path('product/create/', views.ProductCreate.as_view(), name='create-Product'),
    path('product/', views.ProductList.as_view()),
    path('product/<int:pk>/', views.ProductDetail.as_view(),
         name='retrieve-Product'),
    path('product/update/<int:pk>/',
         views.ProductUpdate.as_view(), name='update-Product'),
    path('product/delete/<int:pk>/',
         views.ProductDelete.as_view(), name='delete-Product')
]
