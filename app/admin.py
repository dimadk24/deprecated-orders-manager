from django.contrib import admin

from app.models import Product, Parameter, Option, Customer, ProductOrder, Phone

# Register your models here.

admin.site.register(Customer)
admin.site.register(ProductOrder)
admin.site.register(Product)
admin.site.register(Parameter)
admin.site.register(Option)
admin.site.register(Phone)
