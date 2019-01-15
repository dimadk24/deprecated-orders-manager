from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect
from django.shortcuts import render, get_object_or_404
from django.urls import reverse

from app.models import ProductType
from app.responses import russian_json_response


def index_view(request):
    return HttpResponseRedirect(reverse('add_order'))


@login_required
def add_order_view(request):
    product_types = ProductType.objects.all()
    return render(request, 'app/add_order.html', {'types': product_types})


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
