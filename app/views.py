from django.shortcuts import render

from app.models import ProductType


def add_order_view(request):
    product_types = ProductType.objects.all()
    return render(request, 'app/add_order.html', {'types': product_types})
