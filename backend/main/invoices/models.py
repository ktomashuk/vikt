from django.db import models
from core.models import Contractor


class Invoice(models.Model):
    number = models.CharField(max_length=150, blank=False)
    contractor = models.ForeignKey(Contractor, on_delete=models.PROTECT, default=1)
    inv_date = models.DateField(blank=False)
    not_assigned = models.IntegerField(default=0)
    not_received = models.IntegerField(default=0)

    def __str__(self):
        return self.number
