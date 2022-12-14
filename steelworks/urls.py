"""These `urlpatterns` list routes URLs to views for the CRUD operations
on the database """

from django.urls import path
from steelworks import views


urlpatterns = [
    path(
        'user/create/', views.SteelworksUserCreate.as_view(),
        name='create-User'
    ),
    path('user/get/<str:user_email>/', views.SteelworksUserGetFunction),
    path(
        'user/<int:pk>/', views.SteelworksUserDetail.as_view(),
        name='retrieve-User'
    ),
    path(
        (
            'user/update/<int:pk>/<str:user_email>/<str:password>/<str:address_line_1>/<str:address_line_2>/<str:address_line_3>/<str:postcode>/<int:phone>/'  # noqa
        ),
        views.SteelworksUserUpdateFunction,
        name='update-User'
    ),

    path(
        'product/create/', views.ProductCreate.as_view(),
        name='create-Product'
    ),
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
    path('product/user-pair/delete/<int:pk>/',
         views.ProductUserPairDelete.as_view()),
    path('product/user-pair/create/',
         views.ProductUserPairCreate.as_view()),
    path('product/user-pair/update/<int:pk>/',
         views.ProductUserPairUpdate.as_view()),

    path('instructor/',
         views.InstructorList.as_view()),
    path('instructor/detail/<int:pk>/',
         views.InstructorDetail.as_view()),
    path('instructor/update/<int:pk>/',
         views.InstructorUpdate.as_view()),
    path('instructor/create/',
         views.InstructorCreate.as_view()),
    path('instructor/delete/<int:pk>/',
         views.InstructorDelete.as_view()),

    path('classes/',
         views.ClassesList.as_view()),
    path('classes/delete/<int:pk>/',
         views.ClassesDelete.as_view()),
    path(
        'classes/update/<str:class_name>/<str:details>/<int:student_id>/<str:remove_user>/',  # noqa
        views.ClassesUpdateFunction
    ),
    path('classes/user/get-classes/<int:student_id>/',
         views.getUserClasses),
    path('classes/create/',
         views.ClassesCreate.as_view()),
    path('classes/update-admin/<int:pk>/',
         views.ClassesUpdate.as_view()),

    path(
        'save-stripe-info/<str:email>/<str:payment_method_id>/<str:subscription_type>/<str:upgrade>/<int:user_id>/',  # noqa
        views.save_stripe_info
    ),

    path('class-time/user-pair/create/',
         views.ClassTimeUserPairCreate.as_view()),
    path('class-time/user-pair/',
         views.ClassTimeUserPairList.as_view()),
    path(
        'class-time/user-pair/update/<str:gym_class_name>/<int:user_id>/<str:add_remove>/<str:time_slot>/',  # noqa
        views.ClassTimeUserPairUpdateFunction
    ),
    path('class-time/user-pair/user-time-slots/<int:user_id>/',
         views.findUserTimeSlots),
    path('class-time/user-pair/update-admin/<int:pk>/',
         views.ClassTimeUserPairUpdate.as_view()),
]
