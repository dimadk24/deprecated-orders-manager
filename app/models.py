from django.db import models


# Create your models here.


class Product(models.Model):
    name = models.CharField(max_length=100, null=False)
    options = models.ManyToManyField('Option')


class Parameter(models.Model):
    name = models.CharField(max_length=100, null=False)

    def __str__(self):
        return self.name


class Option(models.Model):
    name = models.CharField(max_length=100, null=False)
    parameter = models.ForeignKey(Parameter, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.parameter} — {self.name}"
