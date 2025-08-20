from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import (
    BasePermission,
    SAFE_METHODS,
    IsAuthenticatedOrReadOnly,
    IsAuthenticated,
)
from django.db.utils import IntegrityError
from django.core.exceptions import ObjectDoesNotExist
from . import serializers


# Create your views here.
class CreateTransactionView(generics.CreateAPIView):
    queryset = serializers.TransactionSerializer.Meta.model.objects.all()
    serializer_class = serializers.TransactionSerializer

    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)


class TransactionView(generics.RetrieveUpdateDestroyAPIView):
    queryset = serializers.TransactionSerializer.Meta.model.objects.all()
    serializer_class = serializers.TransactionSerializer

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)


class TransactionsView(generics.ListCreateAPIView):
    queryset = serializers.TransactionSerializer.Meta.model.objects.all()
    serializer_class = serializers.TransactionSerializer

    def get_queryset(self):
        amount = self.request.query_params.get("amount", None)
        description = self.request.query_params.get("description", None)
        category = self.request.query_params.get("category", None)
        account = self.request.query_params.get("account", None)
        cashflow = self.request.queryparams.get("cashflow", None)
        datetime = self.request.query_params.get("datetime", None)
        skip = self.request.query_params.get("skip", None)
        limit = self.request.query_params.get("limit", None)

        if amount:
            queryset = queryset.filter(amount__icontains=amount)
        if description:
            queryset = queryset.filter(description__icontains=description)
        if category:
            queryset = queryset.filter(category__icontains=category)
        if account:
            queryset = queryset.filter(account__icontains=account)
        if cashflow:
            queryset = queryset.filter(cashflow__icontains=cashflow)
        if datetime:
            queryset = queryset.filter(datetime__icontains=datetime)
        if skip:
            queryset = queryset[int(skip) :]
        if limit:
            queryset = queryset[: int(limit)]

        return queryset

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)
