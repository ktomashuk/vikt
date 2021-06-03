from django.db import models


class Object(models.Model):
    name = models.CharField(max_length=150, blank=False)
    date_added = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Contractor(models.Model):
    name = models.CharField(max_length=150, blank=False)
    legal_name = models.CharField(max_length=150, blank=True)
    phone = models.CharField(max_length=32, blank=True)
    email = models.EmailField(blank=True)
    manager_name = models.CharField(max_length=150, blank=True)
    manager_phone = models.CharField(max_length=32, blank=True)
    manager_email = models.EmailField(blank=True)
    INN = models.CharField(max_length=20, blank=True)
    OGRN = models.CharField(max_length=30, blank=True)
    KPP = models.CharField(max_length=20, blank=True)
    OKPO = models.CharField(max_length=20, blank=True)
    OKVED = models.CharField(max_length=20, blank=True)
    OKTMO = models.CharField(max_length=20, blank=True)
    address_fact = models.CharField(max_length=150, blank=True)
    address_legal = models.CharField(max_length=150, blank=True)
    bank_name = models.CharField(max_length=150, blank=True)
    BIK = models.CharField(max_length=20, blank=True)
    director = models.CharField(max_length=150, blank=True)
    account_settle = models.CharField(max_length=50, blank=True)
    account_correspondence = models.CharField(max_length=50, blank=True)
    date_added = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


