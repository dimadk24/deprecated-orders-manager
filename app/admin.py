from django.contrib.admin import AdminSite

from app.models import Product, Parameter, Option, Customer, Phone, Address, Order, ProductType


# Register your models here.


class MySiteAdmin(AdminSite):
    site_header = 'Админка Orders Manager'
    site_title = 'Админка'


admin_site = MySiteAdmin(name='myadmin')

admin_site.register(Customer)
admin_site.register(Product)
admin_site.register(Parameter)
admin_site.register(Option)
admin_site.register(Phone)
admin_site.register(Address)
admin_site.register(Order)
admin_site.register(ProductType)
