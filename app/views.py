from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect
from django.shortcuts import render, get_object_or_404
from django.urls import reverse

from app.models import ProductType, Order
from app.responses import russian_json_response


def index_view(request):
    return HttpResponseRedirect(reverse('add_order'))


def get_last_order_id():
    try:
        return Order.objects.latest('id').pk
    except Order.DoesNotExist:
        return 0


@login_required
def add_order_view(request):
    product_types = ProductType.objects.all()
    new_order_id = get_last_order_id() + 1
    context = {
        'types': product_types,
        'new_order_id': new_order_id
    }
    return render(request, 'app/add_order.html', context)


@login_required
def get_product_type_parameters(request):
    """
    returns
    [
        {
            id: number,
            name: string,
            options: [
                {
                    id: number,
                    name: string
                }
            ]
        }
    ]
    """
    product_type_id = request.GET['id']
    product_type = get_object_or_404(ProductType, pk=product_type_id)
    parameters = product_type.parameters.all()
    response = []
    for parameter in parameters:
        response_parameter = {
            'id': parameter.pk,
            'name': parameter.name,
            'options': []
        }
        options = parameter.option_set.all()
        for option in options:
            response_parameter['options'].append({
                'id': option.pk,
                'name': option.name
            })
        response.append(response_parameter)
    return russian_json_response(response, safe=False)
