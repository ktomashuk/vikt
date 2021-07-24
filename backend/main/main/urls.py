from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from rest_framework import routers
from rest_framework_simplejwt.views import TokenRefreshView
import debug_toolbar
from django.conf import settings
from django.conf.urls import url
from django.views.static import serve
# Custom views
from api import views as api_views
from invoices import views as invoice_views
from estimates import views as estimate_views
from core import views as core_views
from cable import views as cable_views

router = routers.DefaultRouter()
router.register(r'users', api_views.UserViewSet)
router.register(r'invoices', invoice_views.InvoiceViewSet)
router.register(r'invoice_details', invoice_views.InvoiceDetailsViewSet)
router.register(r'estimates', estimate_views.EstimateViewSet)
router.register(r'objects', core_views.ObjectViewSet)
router.register(r'contractors', core_views.ContractorViewSet)
router.register(r'representatives', core_views.RepresentativeViewSet)
router.register(r'cables', cable_views.CableJournalViewSet)
router.register(r'systems', core_views.SystemsViewSet)
router.register(r'units', core_views.UnitViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('router/', include(router.urls)),
    path('est/', include('estimates.urls')),
    path('inv/', include('invoices.urls')),
    path('core/', include('core.urls')),
    path('cable/', include('cable.urls')),
    path('__debug__/', include(debug_toolbar.urls)),
    path('update/<int:pk>/', api_views.UpdateProfileView.as_view(), name='update_profile'),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('api/token/', api_views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    re_path('', TemplateView.as_view(template_name='index.html')),
]

if settings.DEBUG:
    urlpatterns += [
        url(r'media/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT, }), ]
