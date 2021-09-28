from django.contrib import admin
from .models import Purchase, EstimatePurchaseQuantity, NonEstimatePurchaseQuantity

# Register your models here.
admin.site.register(Purchase)
admin.site.register(EstimatePurchaseQuantity)
admin.site.register(NonEstimatePurchaseQuantity)
