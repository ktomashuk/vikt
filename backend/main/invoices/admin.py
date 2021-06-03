from django.contrib import admin
from .models import Invoice, InvoiceDetails, Contractor

# Register your models here.
admin.site.register(Invoice)
admin.site.register(InvoiceDetails)
