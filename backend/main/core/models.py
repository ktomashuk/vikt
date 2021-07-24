from django.db import models


class Contractor(models.Model):
    TYPES = [
        ('Поставщик', 'Поставщик'),
        ('Заказчик', 'Заказчик'),
        ('Субподрядчик', 'Субподрядчик'),
    ]
    name = models.CharField(max_length=150, blank=False)
    legal_name = models.CharField(max_length=150, blank=True)
    phone = models.CharField(max_length=32, blank=True)
    email = models.EmailField(blank=True)
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
    type = models.CharField(choices=TYPES, max_length=50, default='Поставщик', blank=False)
    date_added = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Object(models.Model):
    name = models.CharField(max_length=150, blank=False)
    full_name = models.CharField(max_length=150, blank=True)
    city = models.CharField(max_length=150, blank=True)
    address = models.CharField(max_length=150, blank=True)
    date_added = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)
    contractors = models.ManyToManyField(Contractor, blank=True)

    def __str__(self):
        return self.name


class System(models.Model):
    acronym = models.CharField(max_length=50)
    full_name = models.CharField(max_length=150, blank=True)
    project_name = models.CharField(max_length=150, blank=True)
    object = models.ForeignKey(Object, on_delete=models.CASCADE, default=1)

    def __str__(self):
        value = str(self.acronym) + ' ' + str(self.object.name)
        return value


class Representative(models.Model):
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150, blank=True)
    patron_name = models.CharField(max_length=150, blank=True)
    position = models.CharField(max_length=150, blank=True)
    phone = models.CharField(max_length=32, blank=True)
    email = models.EmailField(blank=True)
    notes = models.CharField(max_length=150, blank=True)
    company = models.ForeignKey(Contractor, on_delete=models.PROTECT, default=1)

    def __str__(self):
        return self.first_name


class Unit(models.Model):
    name = models.CharField(max_length=30)

    def __str__(self):
        return self.name
