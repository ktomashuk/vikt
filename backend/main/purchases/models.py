from django.db import models
from core.models import System, Object
from estimates.models import Estimate
from invoices.models import Invoice

class Purchase(models.Model):
    ware_reference = models.ForeignKey(Estimate, null=True, blank=True, on_delete=models.SET_NULL)
    ware_name = models.CharField(max_length=150, null=True)
    object_reference = models.ForeignKey(Object, null=True, blank=True, on_delete=models.SET_NULL)
    system_reference = models.ForeignKey(System, null=True, blank=True, on_delete=models.SET_NULL)
    invoice = models.ForeignKey(Invoice, null=True, blank=True, on_delete=models.SET_NULL)
    purchased_fact = models.IntegerField(default=0)
    purchased_doc = models.IntegerField(default=0)
