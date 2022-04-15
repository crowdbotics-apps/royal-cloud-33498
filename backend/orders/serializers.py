from rest_framework import serializers
from .models import Order, SubOrder
from decimal import Decimal


class SubOrderSerializer(serializers.ModelSerializer):
    """
    A data representation of the multiple SubOrders of an Order Object
    """
    class Meta:
        model = SubOrder
        exclude = ('order',)


class OrderSerializer(serializers.ModelSerializer):
    """
    A data representation of the Order Object
    """
    suborders = SubOrderSerializer(many=True, required=False)

    class Meta:
        model = Order
        fields = '__all__'

    def create(self, validated_data):
        quantity = validated_data['quantity']
        product = validated_data['product']
        order = super().create(validated_data)
        total_cost = 0
        # Check if Order includes a Half Pack
        if quantity % 6 == 3:
            # If there is a half pack match, create a pending order
            if product.half_pack_available:
                second_suborder = product.half_pack_order
                second_suborder.status = "Pending"
                second_suborder.save()
                SubOrder.objects.create(
                    order=order,
                    half_pack=True,
                    matching_order=second_suborder,
                    status="Pending",
                    items=product.size_variance,
                    quantity=3,
                    subtotal=product.per_pack_price * Decimal(0.5)
                )
                product.half_pack_available = False
                product.save()
            # If there is no available half pack match, create an unmatched order
            else:
                unmatched_half_pack = SubOrder.objects.create(
                    order=order,
                    half_pack=True,
                    status="Unmatched",
                    items=product.size_variance,
                    quantity=3,
                    subtotal=product.per_pack_price * Decimal(0.5)
                )
                product.half_pack_available = True
                product.half_pack_order = unmatched_half_pack
                product.save()
            total_cost = total_cost + (product.per_pack_price * Decimal(0.5))
            quantity -= 3
        if quantity % 6 == 0:
            SubOrder.objects.create(
                order=order,
                status="Pending",
                items=product.size_variance,
                quantity=quantity,
                subtotal=product.per_pack_price * quantity / 6
            )
            num_packs = quantity / 6
            total_cost = total_cost + (product.per_pack_price * Decimal(num_packs))
        order.total = total_cost
        return order
