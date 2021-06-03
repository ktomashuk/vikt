from django.db import models
from django.contrib.auth.models import User
from core.models import Contractor


class Invoice(models.Model):
    number = models.CharField(max_length=150, blank=False)
    contractor = models.ForeignKey(Contractor, on_delete=models.PROTECT, default=1)
    inv_date = models.DateField(blank=False)
    owner = models.ForeignKey(User, on_delete=models.PROTECT, default=1)

    def __str__(self):
        return self.number


class InvoiceDetails(models.Model):
    UNITS_OF_MEASURE = [
        ('шт.', 'шт.'),
        ('м.', 'м.'),
        ('км.', 'км'),
        ('кг.', 'кг.'),
        ('г.', 'г.'),
        ('компл.', 'компл.'),
        ('упак.', 'упак.'),
        ('набор', 'набор'),
    ]

    invoice = models.ForeignKey(Invoice, on_delete=models.CASCADE)
    product = models.CharField(max_length=200, blank=False)
    quantity_bought = models.FloatField(default=0)
    quantity_docs = models.FloatField(default=0)
    units = models.CharField(choices=UNITS_OF_MEASURE, max_length=15, default='шт.', blank=False)

    def __str__(self):
        return self.product

