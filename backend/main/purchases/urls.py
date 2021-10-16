from django.urls import path
from . import views as purchase_views

urlpatterns = [
    path('test/',
         purchase_views.PurchasesView.as_view(), name='test'),
    path('estimate-purchases-by-object/<int:id>/',
         purchase_views.EstimatesByObjectView.as_view(), name='estimate-purchases-by-object'),
    path('nonestimate-purchases-by-object/<int:id>/',
         purchase_views.NonEstimatesByObjectView.as_view(), name='nonestimate-purchases-by-object'),
    path('purchases-by-invoice/<int:id>/',
         purchase_views.PurchasesByInvoiceView.as_view(), name='purchases-by-invoice'),
    path('purchases-by-estimate-item/<int:id>/',
         purchase_views.PurchasesByEstimateItemView.as_view(), name='purchases-by-estimate-item'),
    path('purchases-by-nonestimate-item/<int:id>/',
         purchase_views.PurchasesByNonEstimateItemView.as_view(), name='purchases-by-nonestimate-item'),
    path('purchases-change-estimate-quantity/<int:id>/',
         purchase_views.PurchaseChangeEstimateQuantity.as_view(), name='purchases-change-estimate-quantity'),
    path('purchases-count-not-assigned-received/',
         purchase_views.PurchaseCountNotReceivedAndAssigned.as_view(), name='purchases-count-not-assigned-received'),
    path('purchases-check-received/<int:id>/',
         purchase_views.PurchaseCheckReceived.as_view(), name='purchases-check-received'),
    path('purchases-uncheck-received/<int:id>/',
         purchase_views.PurchaseUncheckReceived.as_view(), name='purchases-uncheck-received'),
    path('purchases-delete-by-invoice/<int:id>/',
         purchase_views.DeletePurchasesByInvoiceView.as_view(), name='purchases-delete-by-invoice'),
]
