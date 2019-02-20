import json
from datetime import date

from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect
from django.shortcuts import render, get_object_or_404
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt

from app.helpers import get_datetime_from_timestamp, update_if_truthy
from app.models import ProductType, Order, Address, Product, Option, Customer
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
    street_types = Address.STREET_TYPES_CHOICES
    context = {
        'types': product_types,
        'new_order_id': new_order_id,
        'street_types': street_types
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


@csrf_exempt
@login_required
def create_order(request):
    """
    input
    {
        "order_id": "1",
        "main_phone": "+375445814266",
        "additional_phone": "+375298757099",
        "index": 220096,
        "area": "Минская",
        "city": "Minsk",
        "street_type": "ул",
        "street_name": "Голодеда",
        "house": 2,
        "building": "a",
        "flat": 12,
        "floor": 3,
        "entrance": 5,
        "order_datetime": 1549832400000,
        "delivery_date": 1549832400000,
        "delivery_time": "today, at night",
        "products": [
            {
                "name": "Комплект постельного белья 2,0 бязь",
                "type_id": 1,
                "number": 2,
                "price": 44.5,
                "purchase_price": 20.1,
                "option_ids": [
                    2,6
                ],
                "comment": "супер товар"
            }
        ],
        "comment": "super cool order"
    }

    returns
    {
        "ok":"ok"
    }
    or
    {
        "error": {
            "code": "error id",
            "text": "error string"
        }
    }
    """
    json_input = json.loads(request.body)
    order_datetime_timestamp = json_input['order_datetime']
    delivery_date_timestamp_in_seconds = json_input['delivery_date'] / 1000
    order_datetime = get_datetime_from_timestamp(order_datetime_timestamp)
    delivery_date = date.fromtimestamp(delivery_date_timestamp_in_seconds)
    additional_phone = json_input['additional_phone']
    optional_customer_data = {
        'additional_phone': additional_phone
    }
    customer = Customer.objects.get_or_create(main_phone=json_input['main_phone'],
                                              defaults=optional_customer_data)[0]
    update_if_truthy(customer, optional_customer_data)
    order = Order(pk=json_input['order_id'], comment=json_input['comment'],
                  order_datetime=order_datetime, delivery_date=delivery_date,
                  delivery_time=json_input['delivery_time'],
                  customer=customer)
    order.save()
    for json_product in json_input['products']:
        product = Product(name=json_product['name'],
                          type_id=json_product['type_id'],
                          number=int(json_product['number'] or 1),
                          price=float(json_product['price']),
                          purchase_price=float(json_product['purchase_price']),
                          order=order,
                          comment=json_product['comment'])
        product.save()
        for option_id in json_product['option_ids']:
            product.options.add(Option.objects.get(pk=option_id))
        order.product_set.add(product)
    optional_address_data = {
        'index': int(json_input['index'] or 0),
        'area': json_input['area'],
        'city': json_input['city'],
        'street_type': json_input['street_type'],
        'street_name': json_input['street_name'],
        'house': json_input['house'],
        'building': json_input['building'],
        'flat': int(json_input['flat'] or 0),
        'floor': int(json_input['floor'] or 0),
        'entrance': int(json_input['entrance'] or 0)
    }
    address = Address.objects.get_or_create(customer=customer, defaults=optional_address_data)[0]
    update_if_truthy(address, optional_address_data)
    address.save()
    return russian_json_response({"ok": "ok"})
