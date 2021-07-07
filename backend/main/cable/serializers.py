from rest_framework import serializers
from .models import CableJournal


class CableJournalSerializer(serializers.ModelSerializer):

    class Meta:
        model = CableJournal
        fields = '__all__'
