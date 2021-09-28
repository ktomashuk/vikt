from django.contrib import admin
from import_export import resources, fields
from import_export.widgets import ForeignKeyWidget
from .models import Estimate, NonEstimate, KS, KSItem, KSQuantity
from core.models import Object, System, Unit
from import_export.admin import ImportExportModelAdmin


class CustomSystemForeignKeyWidget(ForeignKeyWidget):
    def get_queryset(self, value, row, *args, **kwargs):
        obj_name = Object.objects.filter(name=row['object'])[0]
        return self.model.objects.filter(
            acronym=row["system"],
            object=obj_name,
        )


class EstimateResource(resources.ModelResource):
    object = fields.Field(
        column_name='object',
        attribute='object',
        widget=ForeignKeyWidget(Object, 'name'))

    system = fields.Field(
        column_name='system',
        attribute='system',
        widget=CustomSystemForeignKeyWidget(System, 'acronym'))

    units = fields.Field(
        column_name='units',
        attribute='units',
        widget=ForeignKeyWidget(Unit, 'name'))

    class Meta:
        model = Estimate
        export_order = ('id', 'object', 'system_number', 'ware_number', 'ware', 'quantity', 'units', 'system', 'price',
                        'note')


class ViewAdmin(ImportExportModelAdmin):
    resource_class = EstimateResource


admin.site.register(Estimate, ViewAdmin)
admin.site.register(Unit)
admin.site.register(NonEstimate, ViewAdmin)
admin.site.register(KS)
admin.site.register(KSItem)
admin.site.register(KSQuantity)
