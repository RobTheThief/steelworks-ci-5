from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.conf.urls.static import static
from django.conf import settings

from steelworks import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('steelworks.urls')),
    path('login/', views.LoginView.as_view()),
    path('logout/', views.LogoutView.as_view()),
    path('profile/', views.ProfileView.as_view()),
    path('register/', views.CreateUserView.as_view(), name='auth_register'),
    #re_path('.*', TemplateView.as_view(template_name='index.html')),
    #re_path(r'', views.catchall),
    path("__reload__/", include("django_browser_reload.urls")),
    re_path('.*', views.ReactView.as_view(), name='react'),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL,
                          document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
