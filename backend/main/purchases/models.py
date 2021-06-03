from django.db import models
from estimates.models import Estimate


class Purchase(models.Model):
    ware = models.ForeignKey(Estimate, on_delete=models.PROTECT)
    purchased_fact = models.IntegerField(default=0)
    purchased_doc = models.IntegerField(default=0)
