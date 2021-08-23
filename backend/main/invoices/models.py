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
