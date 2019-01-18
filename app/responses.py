from django.http import JsonResponse


def russian_json_response(data, safe: bool = True, **kwargs):
    return JsonResponse(data, safe=safe, **kwargs)
