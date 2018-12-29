from django.contrib import admin
from .models import Product, Parameter, Option

# Register your models here.

admin.site.register(Product)
admin.site.register(Parameter)
admin.site.register(Option)
