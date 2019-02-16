"""manager URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path

from app import views
from app.admin import admin_site

urlpatterns = [
    path('', views.index_view, name='index'),
    path('add_order', views.add_order_view, name='add_order'),
    path('api/getProductTypeParameters', views.get_product_type_parameters,
         name='get_product_type_parameters'),
    path('api/createOrder', views.create_order, name='create_order'),
    path('admin/', admin_site.urls),
]
