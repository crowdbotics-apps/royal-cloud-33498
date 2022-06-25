from rest_framework import serializers

from products.models import Product
from products.serializers import ProductField
from .models import Order, CartOrder, Cart
from decimal import Decimal
from home.utility import send_notification


class OrderSerializer(serializers.ModelSerializer):
    """
    A data representation of the Order Object
    """
    product = ProductField(queryset=Product.objects.all(), required=False)
    style = serializers.CharField(max_length=64, required=False)

    class Meta:
        model = Order
        fields = '__all__'
        extra_kwargs = {'product': {'required': False},
                        'style': {'required': False}}

    def create(self, validated_data):
        quantity = validated_data['quantity']
        product = validated_data['product']
        style = validated_data['style']
        if style not in product.styles:
            raise serializers.ValidationError("Invalid Style")
        order = super().create(validated_data)
        total_cost = 0
        if product.type == "Catalog":
            # Check if Order includes a Half Pack
            if quantity % 6 == 3:
                # If there is a half pack match, create a pending order
                if product.half_pack_available and style in product.half_pack_styles:
                    matching_order_id = product.half_pack_orders.pop(style)
                    matching_order = Order.objects.get(id=matching_order_id)
                    matching_order.status = "Pending"
                    matching_order.save()
                    notif_user = matching_order.user
                    send_notification(
                        user=notif_user,
                        title="Half Pack Confirmation",
                        content="Your order {} has been submitted and pending shipment".format(matching_order.sid)
                    )
                    order.half_pack=True
                    order.matching_order = matching_order
                    order.status = "Pending"
                    order.items = product.size_variance
                    order.quantity = 3

                    product.half_pack_styles.remove(style)
                    if len(product.half_pack_styles) == 0:
                        product.half_pack_available = False
                    product.save()

                # If there is no available half pack match, create an unmatched order
                else:
                    order.half_pack = True
                    order.status = "Unmatched"
                    order.items = product.size_variance
                    order.quantity = 3

                    if product.half_pack_styles is None:
                        product.half_pack_styles = []

                    product.half_pack_styles.append(style)
                    product.half_pack_available = True
                    product.half_pack_orders[style] = str(order.id)
                    product.save()
                total_cost = total_cost + (product.per_pack_price * Decimal(0.5))
                quantity -= 3

            if quantity and quantity % 6 == 0:
                order.status = "Pending"
                order.items = product.size_variance,
                order.quantity = quantity
                num_packs = quantity / 6
                total_cost = total_cost + (product.per_pack_price * Decimal(num_packs))

        elif product.type == "Inventory":
            order.status = "Pending"
            order.items = product.size_variance
            order.quantity = quantity
            order.subtotal = product.per_item_price * quantity

            total_cost = total_cost + (product.per_item_price * quantity)
        order.subtotal = total_cost
        order.save()
        return order


class CartOrderSerializer(serializers.ModelSerializer):
    """
    A data representation of the temporary orders inside a cart
    """
    product = ProductField(queryset=Product.objects.all())

    class Meta:
        model = CartOrder
        fields = '__all__'


class CartSerializer(serializers.ModelSerializer):
    """
    A data representation of the temporary cart of a User
    """
    orders = CartOrderSerializer(many=True, required=False)

    class Meta:
        model = Cart
        fields = '__all__'
