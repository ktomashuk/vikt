from django.db import models
from django.contrib.auth.models import User


class Object(models.Model):
    name = models.CharField(max_length=150, blank=False)
    date_added = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Contractor(models.Model):
    name = models.CharField(max_length=150, blank=False)
    phone = models.CharField(max_length=32)
    email = models.EmailField()
    manager = models.CharField(max_length=150)
    date_added = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


