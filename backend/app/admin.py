from django.contrib.admin import AdminSite
from django.contrib.auth.admin import GroupAdmin, UserAdmin
from django.contrib.auth.models import Group, User

from app.models import Product, Parameter, Option, Customer, Address, Order, ProductType


# Register your models here.


class MySiteAdmin(AdminSite):
    site_header = 'Админка Orders Manager'
    site_title = 'Админка'


admin_site = MySiteAdmin(name='myadmin')

admin_site.register(Group, GroupAdmin)
admin_site.register(User, UserAdmin)

admin_site.register(Customer)
admin_site.register(Product)
admin_site.register(Parameter)
admin_site.register(Option)
admin_site.register(Address)
admin_site.register(Order)
admin_site.register(ProductType)
