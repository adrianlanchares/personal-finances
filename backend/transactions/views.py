from datetime import timedelta
from time import timezone
from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import (
    BasePermission,
    SAFE_METHODS,
    IsAuthenticatedOrReadOnly,
    IsAuthenticated,
)
from django.db.utils import IntegrityError
from django.db.models import Sum, Case, When, F
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


class ListTransactionsView(generics.ListCreateAPIView):
    queryset = serializers.TransactionSerializer.Meta.model.objects.all()
    serializer_class = serializers.TransactionSerializer

    def get_queryset(self):
        queryset = self.queryset.all().order_by("-datetime")

        minAmount = self.request.query_params.get("minAmount", None)
        maxAmount = self.request.query_params.get("maxAmount", None)
        description = self.request.query_params.get("description", None)
        category = self.request.query_params.get("category", None)
        account = self.request.query_params.get("account", None)
        cashflow = self.request.query_params.get("cashflow", None)
        date = self.request.query_params.get("date", None)
        beforeDatetime = self.request.query_params.get("beforeDatetime", None)
        afterDatetime = self.request.query_params.get("afterDatetime", None)
        skip = self.request.query_params.get("skip", None)
        limit = self.request.query_params.get("limit", None)

        if minAmount:
            queryset = queryset.filter(amount__gte=minAmount)
        if maxAmount:
            queryset = queryset.filter(amount__lte=maxAmount)
        if description:
            queryset = queryset.filter(description__icontains=description)
        if category:
            queryset = queryset.filter(category__icontains=category)
        if account:
            queryset = queryset.filter(account__icontains=account)
        if cashflow:
            queryset = queryset.filter(cashflow__icontains=cashflow)
        if date:
            if date == "all":
                pass
            elif date == "year":
                queryset = queryset.filter(
                    datetime__gte=timezone.now() - timedelta(days=365)
                )
            elif date == "month":
                queryset = queryset.filter(
                    datetime__gte=timezone.now() - timedelta(days=30)
                )
            elif date == "week":
                queryset = queryset.filter(
                    datetime__gte=timezone.now() - timedelta(days=7)
                )
        if beforeDatetime:
            queryset = queryset.filter(datetime__lt=beforeDatetime)
        if afterDatetime:
            queryset = queryset.filter(datetime__gt=afterDatetime)
        if skip:
            queryset = queryset[int(skip) :]
        if limit:
            queryset = queryset[: int(limit)]

        return queryset

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        self.queryset.all().delete()
        return Response(
            {"detail": "All transactions deleted."}, status=status.HTTP_204_NO_CONTENT
        )


class AccountBalancesView(APIView):
    queryset = serializers.TransactionSerializer.Meta.model.objects.all()
    serializer_class = serializers.TransactionSerializer

    def get(self, request):
        Model = self.serializer_class.Meta.model
        balances = Model.objects.values("account").annotate(
            balance=Sum(
                Case(
                    When(cashflow="income", then=F("amount")),
                    When(cashflow="expense", then=-F("amount")),
                )
            )
        )

        return Response({b["account"]: b["balance"] for b in balances})
