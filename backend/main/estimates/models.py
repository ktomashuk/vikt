from django.db import models
from core.models import Object, System, Unit


class Estimate(models.Model):
    object = models.ForeignKey(Object, on_delete=models.PROTECT, default=1)
    system_number = models.IntegerField(default=1)
    ware_number = models.IntegerField(default=1)
    ware = models.CharField(max_length=250)
    quantity = models.FloatField(default=0)
    units = models.ForeignKey(Unit, on_delete=models.PROTECT, default=1)
    system = models.ForeignKey(System, on_delete=models.PROTECT, default=1)
    price = models.FloatField(default=0)
    note = models.CharField(max_length=150, default='', blank=True)

    def __str__(self):
        return str(self.ware) + ' (' + str(self.object) + ')'
