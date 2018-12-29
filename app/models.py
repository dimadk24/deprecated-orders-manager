from django.db import models


# Create your models here.


class Customer(models.Model):
    products = models.ManyToManyField('Product', through='ProductOrder')


class Phone(models.Model):
    number = models.CharField(max_length=30)
    customer = models.ForeignKey('Customer', on_delete=models.CASCADE)

    def __str__(self):
        return self.number


class ProductOrder(models.Model):
    customer = models.ForeignKey('Customer', on_delete=models.CASCADE)
    product = models.ForeignKey('Product', on_delete=models.CASCADE)
    number = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f'{self.customer} заказал {self.number} {self.product}'


class Product(models.Model):
    name = models.CharField(max_length=100, null=False)
    options = models.ManyToManyField('Option')

    def __str__(self):
        return self.name


class Parameter(models.Model):
    name = models.CharField(max_length=100, null=False)

    def __str__(self):
        return self.name


class Option(models.Model):
    name = models.CharField(max_length=100, null=False)
    parameter = models.ForeignKey(Parameter, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.parameter} — {self.name}"
