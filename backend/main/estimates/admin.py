from django.contrib import admin
from import_export import resources, fields
from import_export.widgets import ForeignKeyWidget
from .models import Estimate
from core.models import Object
from import_export.admin import ImportExportModelAdmin


class EstimateResource(resources.ModelResource):
    object = fields.Field(
        column_name='object',
        attribute='object',
        widget=ForeignKeyWidget(Object, 'name'))

    class Meta:
        model = Estimate
        export_order = ('id', 'object', 'system_number', 'ware_number', 'ware', 'quantity', 'units', 'system', 'price',
                        'note')


class ViewAdmin(ImportExportModelAdmin):
    resource_class = EstimateResource


admin.site.register(Estimate, ViewAdmin)
