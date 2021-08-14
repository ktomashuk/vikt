from django.contrib import admin
from .models import Contractor, Object, Representative, System


admin.site.register(Contractor)
admin.site.register(Object)
admin.site.register(Representative)
admin.site.register(System)

