from django.db import models


# Create your models here.


class Order(models.Model):
    customer = models.ForeignKey('Customer', on_delete=models.CASCADE, verbose_name='Клиент')
    comment = models.TextField(default='', verbose_name='Комментарий')

    def __str__(self):
        return f'Заказ №{self.pk}'

    class Meta:
        verbose_name = 'заказ'
        verbose_name_plural = 'заказы'


class Customer(models.Model):
    pass

    class Meta:
        verbose_name = 'клиент'
        verbose_name_plural = 'клиенты'


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
    customer = models.ForeignKey('Customer', on_delete=models.CASCADE, verbose_name='Клиент')
    index = models.PositiveIntegerField(verbose_name='Индекс')
    area = models.CharField(max_length=50, verbose_name='Область')
    city = models.CharField(max_length=50, verbose_name='Город')
    street_type = models.CharField(max_length=30,
                                   choices=STREET_TYPES_CHOICES,
                                   default=STREET_TYPES_CHOICES[0][0],
                                   verbose_name='Тип улицы')
    street_name = models.CharField(max_length=50, verbose_name='Название улицы')
    house = models.CharField(max_length=20, verbose_name='Дом')
    building = models.CharField(max_length=10, default='', verbose_name='Корпус')
    flat = models.PositiveIntegerField(verbose_name='Квартира')
    floor = models.PositiveSmallIntegerField(verbose_name='Этаж')
    entrance = models.PositiveSmallIntegerField(verbose_name='Подъезд')

    def __str__(self):
        return (f'г. {self.city}, {self.street_type}. {self.street_name}, '
                f'д. {self.house} {self.building}, кв. {self.flat}')

    class Meta:
        verbose_name = 'адрес'
        verbose_name_plural = 'адреса'


class Phone(models.Model):
    number = models.CharField(max_length=30, verbose_name='Номер')
    customer = models.ForeignKey('Customer', on_delete=models.CASCADE, verbose_name='Клиент')

    def __str__(self):
        return self.number

    class Meta:
        verbose_name = 'телефон'
        verbose_name_plural = 'телефоны'


class ProductType(models.Model):
    name = models.CharField(max_length=50, verbose_name='Название')
    parameters = models.ManyToManyField('Parameter', verbose_name='Параметры')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'тип товаров'
        verbose_name_plural = 'типы товаров'


class Product(models.Model):
    name = models.CharField(max_length=200, verbose_name='Название')
    type = models.ForeignKey('ProductType', on_delete=models.CASCADE, verbose_name='Тип')
    price = models.FloatField(verbose_name='Цена продажи')
    purchase_price = models.FloatField(verbose_name='Закупочная цена')
    number = models.PositiveIntegerField(default=1, verbose_name='Количество')
    order = models.ForeignKey('Order', on_delete=models.CASCADE, verbose_name='Заказ')
    options = models.ManyToManyField('Option', verbose_name='Опции')
    comment = models.TextField(default='', verbose_name='Комментарий')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'товар'
        verbose_name_plural = 'товары'


class Parameter(models.Model):
    name = models.CharField(max_length=100, verbose_name='Название')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'параметр'
        verbose_name_plural = 'параметры'


class Option(models.Model):
    name = models.CharField(max_length=100, verbose_name='Название')
    parameter = models.ForeignKey(Parameter, on_delete=models.CASCADE, verbose_name='Параметр')

    def __str__(self):
        return f"{self.parameter} — {self.name}"

    class Meta:
        verbose_name = 'опция'
        verbose_name_plural = 'опции'
