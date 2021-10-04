from rest_framework import serializers
from .models import Invoice


class InvoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Invoice
        fields = ['id', 'number', 'contractor', 'inv_date', 'not_assigned', 'not_received']

