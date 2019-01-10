from django.db import models


# Create your models here.


class Order(models.Model):
    customer = models.ForeignKey('Customer', on_delete=models.CASCADE)
    comment = models.TextField(default='')


class Customer(models.Model):
    pass


class Address(models.Model):
    STREET_TYPES_CHOICES = (
        ('ул', 'улица'),
        ('пер', 'переулок'),
        ('пр', 'проезд'),
        ('бул', 'бульвар'),
        ('пл', 'площадь'),
        ('тр', 'тракт'),
        ('шс', 'шоссе'),
    )
    customer = models.ForeignKey('Customer', on_delete=models.CASCADE)
    index = models.PositiveIntegerField()
    area = models.CharField(max_length=50)
    city = models.CharField(max_length=50)
    street_type = models.CharField(max_length=30, choices=STREET_TYPES_CHOICES,
                                   default=STREET_TYPES_CHOICES[0][0])
    street_name = models.CharField(max_length=50)
    house = models.CharField(max_length=20)
    building = models.CharField(max_length=10, default='')
    flat = models.PositiveIntegerField()
    floor = models.PositiveSmallIntegerField()
    entrance = models.PositiveSmallIntegerField()

    def __str__(self):
        return (f'г. {self.city}, {self.street_type}. {self.street_name}, '
                f'д. {self.house} {self.building}, кв. {self.flat}')


class Phone(models.Model):
    number = models.CharField(max_length=30)
    customer = models.ForeignKey('Customer', on_delete=models.CASCADE)

    def __str__(self):
        return self.number


class Product(models.Model):
    order = models.ForeignKey('Order', on_delete=models.CASCADE)
    price = models.FloatField()
    number = models.PositiveIntegerField(default=1)
    options = models.ManyToManyField('Option')
    comment = models.TextField(default='')

    def __str__(self):
        return self.comment


class Parameter(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Option(models.Model):
    name = models.CharField(max_length=100)
    parameter = models.ForeignKey(Parameter, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.parameter} — {self.name}"
