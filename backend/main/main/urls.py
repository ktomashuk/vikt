from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from api import views as api_views
from invoices import views as invoice_views
from estimates import views as estimate_views
from core import views as core_views
from rest_framework_simplejwt.views import TokenRefreshView

router = routers.DefaultRouter()
router.register(r'users', api_views.UserViewSet)
router.register(r'invoices', invoice_views.InvoiceViewSet)
router.register(r'invoice_details', invoice_views.InvoiceDetailsViewSet)
router.register(r'estimates', estimate_views.EstimateViewSet)
router.register(r'objects', core_views.ObjectViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('update/<int:pk>/', api_views.UpdateProfileView.as_view(), name='update_profile'),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('api/token/', api_views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('systems-per-object/<int:id>/',
         estimate_views.SystemsPerObject.as_view(), name='system-per-object'),
    path('est-obj-sys/<int:id>/<str:system>/',
         estimate_views.EstimatesByObjectBySystemView.as_view(), name='est-obj-sys'),
    path('est-obj/<int:id>/',
         estimate_views.EstimatesByObjectView.as_view(), name='est-obj'),
    path('search-est-obj/<int:id>/',
         estimate_views.SearchEstimatesByObjectView.as_view(), name='search-est-obj'),
    path('search-est-obj-sys/<int:id>/<str:system>',
         estimate_views.SearchEstimatesByObjectBySystemView.as_view(), name='search-est-obj-sys'),
    path('est-update/<int:id>/', estimate_views.EstimateUpdateView.as_view(), name='est-update'),
]
