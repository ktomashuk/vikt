from django.db import models
from core.models import Object


class Estimate(models.Model):
    UNITS_OF_MEASURE = [
        ('шт.', 'шт.'),
        ('м.', 'м.'),
        ('км.', 'км.'),
        ('кг.', 'кг.'),
        ('г.', 'г.'),
        ('компл.', 'компл.'),
        ('упак.', 'упак.'),
        ('набор', 'набор'),
    ]

    object = models.ForeignKey(Object, on_delete=models.PROTECT, default=1)
    system_number = models.IntegerField(default=1)
    ware_number = models.IntegerField(default=1)
    ware = models.CharField(max_length=250)
    quantity = models.IntegerField(default=0)
    units = models.CharField(choices=UNITS_OF_MEASURE, max_length=15, default='шт', blank=False)
    system = models.CharField(max_length=150)
    price = models.IntegerField(default=0)
    note = models.CharField(max_length=150, default='', blank=True)

    def __str__(self):
        return str(self.ware) + ' (' + str(self.object) + ')'

