from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse

from app.models import ProductType


def index_view(request):
    return HttpResponseRedirect(reverse('add_order'))


def add_order_view(request):
    product_types = ProductType.objects.all()
    return render(request, 'app/add_order.html', {'types': product_types})
