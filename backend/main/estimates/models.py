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


class NonEstimate(models.Model):
    object = models.ForeignKey(Object, null=True, blank=True, on_delete=models.SET_NULL)
    ware = models.CharField(max_length=250)
    quantity = models.FloatField(default=0)
    units = models.ForeignKey(Unit, on_delete=models.PROTECT, default=1)
    system = models.ForeignKey(System, null=True, blank=True, on_delete=models.SET_NULL)

    def __str__(self):
        return str(self.ware) + ' (не по смете)'


class KS(models.Model):
    object = models.ForeignKey(Object, default=1, null=True, blank=True, on_delete=models.SET_NULL)
    contract_number = models.CharField(max_length=50)
    contract_date = models.DateField()
    document_number = models.CharField(max_length=50)
    document_date = models.DateField()
    period_start = models.DateField()
    period_end = models.DateField()


class KSItem(models.Model):
    ks_reference = models.ForeignKey(KS, default=1, on_delete=models.CASCADE)
    number = models.IntegerField()
    estimate_reference = models.ForeignKey(Estimate, null=True, blank=True, on_delete=models.SET_NULL)
    work_price = models.FloatField(default=0)
    quantity = models.FloatField(default=0)


class KSQuantity(models.Model):
    estimate_reference = models.ForeignKey(Estimate, null=True, blank=True, on_delete=models.SET_NULL)
    quantity = models.FloatField(default=0)
