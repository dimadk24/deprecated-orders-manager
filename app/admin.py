from django.contrib import admin

from app.models import Product, Parameter, Option, Customer, Phone, Address, Order

# Register your models here.

admin.site.register(Customer)
admin.site.register(Product)
admin.site.register(Parameter)
admin.site.register(Option)
admin.site.register(Phone)
admin.site.register(Address)
admin.site.register(Order)
