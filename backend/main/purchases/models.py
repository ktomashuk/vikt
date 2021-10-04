from django.db import models
from core.models import System, Object, Unit
from estimates.models import Estimate, NonEstimate
from invoices.models import Invoice


class Purchase(models.Model):
    assigned = models.BooleanField(default=False)
    estimate_reference = models.ForeignKey(Estimate, null=True, blank=True, on_delete=models.SET_NULL)
    non_estimate_reference = models.ForeignKey(NonEstimate, null=True, blank=True, on_delete=models.SET_NULL)
    ware_name = models.CharField(max_length=150, null=True)
    object_reference = models.ForeignKey(Object, null=True, blank=True, on_delete=models.SET_NULL)
    system_reference = models.ForeignKey(System, null=True, blank=True, on_delete=models.SET_NULL)
    invoice = models.ForeignKey(Invoice, null=True, blank=True, on_delete=models.SET_NULL)
    purchased_fact = models.FloatField(default=0)
    purchased_doc = models.FloatField(default=0)
    units = models.ForeignKey(Unit, default=1, on_delete=models.CASCADE)
    price = models.FloatField(default=0)
    received = models.BooleanField(default=False)

    def __str__(self):
        return self.ware_name + ' (' + self.invoice.number + ')'


class EstimatePurchaseQuantity(models.Model):
    estimate_reference = models.ForeignKey(Estimate, on_delete=models.PROTECT, default=1,
                                           related_name='estimate_purchased')
    object = models.ForeignKey(Object, on_delete=models.SET_NULL, null=True, blank=True)
    purchases_fact = models.FloatField(default=0)
    purchases_doc = models.FloatField(default=0)
    shipped = models.FloatField(default=0)


class NonEstimatePurchaseQuantity(models.Model):
    non_estimate_reference = models.ForeignKey(NonEstimate, on_delete=models.PROTECT, default=1,
                                               related_name='nonestimate_purchased')
    object = models.ForeignKey(Object, on_delete=models.SET_NULL, null=True, blank=True)
    purchases_fact = models.FloatField(default=0)
    purchases_doc = models.FloatField(default=0)
    shipped = models.FloatField(default=0)

