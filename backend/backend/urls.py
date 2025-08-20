"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path

from backend.transactions import views

urlpatterns = [
    path("admin/", admin.site.urls),
    # List all transactions or create a new one
    path("transactions/", views.TransactionsView.as_view(), name="transactions"),
    # Create a transaction (alternative to posting to /transactions/)
    path(
        "transactions/create/",
        views.CreateTransactionView.as_view(),
        name="create-transaction",
    ),
    # Get, update, or delete a single transaction by ID
    path(
        "transactions/<int:pk>/",
        views.TransactionView.as_view(),
        name="transaction-detail",
    ),
]
