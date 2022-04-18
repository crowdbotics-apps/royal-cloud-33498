from rest_framework import serializers

from products.models import Product
from products.serializers import ProductField
from .models import Order, SubOrder, CartOrder, Cart, PackingList
from decimal import Decimal
from home.utility import send_notification


class SubOrderSerializer(serializers.ModelSerializer):
    """
    A data representation of the multiple SubOrders of an Order Object
    """
    id = serializers.UUIDField(required=False)

    class Meta:
        model = SubOrder
        exclude = ('order',)
        extra_kwargs = {'status': {'required': False},
                        'subtotal': {'required': False}}


class OrderSerializer(serializers.ModelSerializer):
    """
    A data representation of the Order Object
    """
    suborders = SubOrderSerializer(many=True, required=False)
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
                    second_halfpack = product.half_pack_orders.pop(style)
                    second_suborder = SubOrder.objects.get(id=second_halfpack)
                    second_suborder.status = "Pending"
                    second_suborder.save()
                    notif_user = second_suborder.order.user
                    send_notification(
                        user=notif_user,
                        title="Half Pack Confirmation",
                        content="Your order {} has been submitted and pending shipment".format(second_suborder.order.sid)
                    )
                    SubOrder.objects.create(
                        order=order,
                        half_pack=True,
                        matching_order=second_suborder,
                        status="Pending",
                        items=product.size_variance,
                        quantity=3,
                        subtotal=product.per_pack_price * Decimal(0.5)
                    )
                    product.half_pack_styles.remove(style)
                    if len(product.half_pack_styles) == 0:
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
                    if product.half_pack_styles is None:
                        product.half_pack_styles = []
                    product.half_pack_styles.append(style)
                    product.half_pack_available = True
                    product.half_pack_orders[style] = str(unmatched_half_pack.id)
                    product.save()
                total_cost = total_cost + (product.per_pack_price * Decimal(0.5))
                quantity -= 3
            if quantity and quantity % 6 == 0:
                SubOrder.objects.create(
                    order=order,
                    status="Pending",
                    items=product.size_variance,
                    quantity=quantity,
                    subtotal=product.per_pack_price * quantity / 6
                )
                num_packs = quantity / 6
                total_cost = total_cost + (product.per_pack_price * Decimal(num_packs))
        elif product.type == "Inventory":
            SubOrder.objects.create(
                order=order,
                status="Pending",
                items=product.size_variance,
                quantity=quantity,
                subtotal=product.per_item_price * quantity
            )
            total_cost = total_cost + (product.per_item_price * quantity)
        order.total = total_cost
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


class PackingListSerializer(serializers.ModelSerializer):
    """
    A data representation of the Packing List of a User submitted to the backend
    """
    orders = OrderSerializer(many=True, required=False)
   
    class Meta:
        model = PackingList
        fields = '__all__'


    def update(self, instance, validated_data):
        orders_data = validated_data.pop('orders', None)
        packing_list = super().update(instance, validated_data)
        if orders_data:
            for order_data in orders_data:
                suborders_data = order_data.pop('suborders', None)
                if suborders_data:
                    for suborder_data in suborders_data:
                        suborder = SubOrder.objects.get(id=suborder_data['id'])
                        serializer = SubOrderSerializer(instance=suborder, data=suborder_data)
                        if serializer.is_valid():
                            serializer.save()
                        else:
                            raise serializers.ValidationError(serializer.errors)
                serializer = OrderSerializer(instance=suborder.order, data=order_data)
                if serializer.is_valid():
                    serializer.save()
                else:
                    raise serializers.ValidationError(serializer.errors)
        # Recalculate packing list totals
        packing_list.save()
        return packing_list