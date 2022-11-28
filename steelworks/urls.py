from django.urls import include, path
from steelworks import views


urlpatterns = [
    path('user/create/', views.SteelworksUserCreate.as_view(), name='create-User'),
    path('user/<str:user_email>/', views.SteelworksUserGetFunction),
    path('user/<int:pk>/', views.SteelworksUserDetail.as_view(), name='retrieve-User'),
    path('user/update/<int:pk>/<str:user_email>/<str:password>/<str:address_line_1>/<str:address_line_2>/<str:address_line_3>/<str:postcode>/<int:phone>/',
         views.SteelworksUserUpdateFunction, name='update-User'),
    path('user/delete/<int:pk>/',
         views.SteelworksUserDelete.as_view(), name='delete-User'),

    path('product/create/', views.ProductCreate.as_view(), name='create-Product'),
    path('product/', views.ProductList.as_view()),
    path('product/<int:pk>/', views.ProductDetail.as_view(),
         name='retrieve-Product'),
    path('product/update/<int:pk>/',
         views.ProductUpdate.as_view(), name='update-Product'),
    path('product/delete/<int:pk>/',
         views.ProductDelete.as_view(), name='delete-Product'),

    path('product/user-pair/',
         views.ProductUserPairList.as_view()),
    path('product/user-pair/detail/<int:pk>/',
         views.ProductUserPairDetail.as_view()),

    path('instructor/',
         views.InstructorList.as_view()),
    path('instructor/detail/<int:pk>/',
         views.InstructorDetail.as_view()),
    path('instructor/update/<int:pk>/',
         views.InstructorUpdate.as_view()),
    path('instructor/create/',
         views.InstructorCreate.as_view()),

    path('classes/',
         views.ClassesList.as_view()),
    path('classes/detail/<int:pk>/',
         views.ClassesDetail.as_view()),

    path('instructor/user-pair/',
         views.InstructorUserPairList.as_view()),
    path('instructor/user-pair/detail/<int:pk>/',
         views.InstructorUserPairDetail.as_view())
]
