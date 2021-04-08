from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from api import views as api_views
from invoices import views as invoice_views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router = routers.DefaultRouter()
router.register(r'users', api_views.UserViewSet)
router.register(r'invoices', invoice_views.InvoiceViewSet)
router.register(r'invoice_details', invoice_views.InvoiceDetailsViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('api/token/', api_views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('invoice-all/', invoice_views.InvoiceAllView.as_view(), name='invoice-all'),
]
