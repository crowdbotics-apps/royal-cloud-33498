from rest_framework import serializers
from django.db.models import Count, Sum

from orders.models import Order

from products.models import Product


class AdminProductSerializer(serializers.ModelSerializer):
    """
    A data representation of the Orders viewed by an Admin
    """
    totals = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = '__all__'

    def get_totals(self, obj):
        totals = Order.objects.filter(
            product=obj,
            status="Pending"
        ).aggregate(
            customer_count =
                Count(
                    'user', 
                    distinct=True
                ),
            quantity_count = 
                Sum(
                    'quantity'
                ),
            amount_count =
                Sum(
                    'total'
                )

        )
        if totals['quantity_count'] is not None:
            totals['pack_count'] = int(totals['quantity_count'] / 6)
        else:
            totals['pack_count'] = 0
        return totals
