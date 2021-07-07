from django.db import models
from core.models import Object


class CableJournal(models.Model):
    object = models.ForeignKey(Object, default=1, on_delete=models.PROTECT)
    system = models.CharField(max_length=150)
    index = models.IntegerField(default=1)
    name = models.CharField(max_length=150, default='')
    start = models.CharField(max_length=150)
    end = models.CharField(max_length=150)
    cable = models.CharField(max_length=150)
    cable_cut = models.CharField(max_length=150)
    length = models.FloatField(blank=True, default=0)
    isolation = models.FloatField(blank=True, default=0)
