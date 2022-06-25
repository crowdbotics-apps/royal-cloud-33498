from decimal import Decimal
from rest_framework import status, filters
from rest_framework.decorators import action
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from orders.models import Cart, CartOrder, Order, Transaction
from orders.serializers import CartSerializer, OrderSerializer
from products.models import Product
from users.authentication import ExpiringTokenAuthentication
from rest_framework.permissions import IsAuthenticated


class OrderViewSet(ModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = (IsAuthenticated,)
    authentication_classes  = [ExpiringTokenAuthentication]
    queryset = Order.objects.all()
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['user', 'date', 'product', 'half_pack',\
        'status', 'tracking_number_id']
    ordering_fields = ['date', 'status', 'product', 'half_pack', 'status']


    def perform_create(self, serializer):
        order = serializer.save(
            user=self.request.user)


class CartViewSet(ModelViewSet):
    serializer_class = CartSerializer
    permission_classes = (IsAuthenticated,)
    authentication_classes  = [ExpiringTokenAuthentication]
    queryset = Cart.objects.all()

    def get_queryset(self):
        return super().get_queryset().filter(user=self.request.user)

    def create(self, request, *args, **kwargs):
        user = request.user
        product_id = request.data.get('product')
        quantity = int(request.data.get('quantity'))
        style = request.data.get('style')
        product = Product.objects.get(id=product_id)
        if style not in product.styles:
            return Response(
                {
                    'detail': 'Invalid Style Choice'
                }, status=status.HTTP_400_BAD_REQUEST
            )
        total_cost = 0
        temp_quantity = quantity
        if product.type == "Catalog":
            if temp_quantity % 6 == 3:
                total_cost = total_cost + (product.per_pack_price * Decimal(0.5))
                temp_quantity -= 3
            if temp_quantity and temp_quantity % 6 == 0:
                num_packs = temp_quantity / 6
                total_cost = total_cost + (product.per_pack_price * Decimal(num_packs))
        elif product.type == "Inventory":
            total_cost = product.per_item_price * quantity
        try:
            existing_order = CartOrder.objects.get(cart=user.cart, product=product, style=style)
        except CartOrder.DoesNotExist:
            CartOrder.objects.create(
                cart=user.cart,
                product=product,
                style=style,
                quantity=quantity,
                total=total_cost
            )
        else:
            existing_order.quantity += quantity
            existing_order.total += total_cost
            existing_order.save()
        user.cart.total += total_cost
        user.cart.save()
        serializer = CartSerializer(user.cart)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['get'])
    def clear(self, request):
        cart = request.user.cart
        cart.total = 0
        cart.save()
        CartOrder.objects.filter(cart=cart).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(detail=False, methods=['delete'])
    def remove_item(self, request):
        cart = request.user.cart
        item = request.data.get('item')
        try:
            item = CartOrder.objects.get(id=item)
        except CartOrder.DoesNotExist:
            return Response({'detail': 'Invalid Item ID'}, status=status.HTTP_400_BAD_REQUEST)
        price = item.total
        item.delete()
        cart.total -= price
        cart.save()
        serializer = CartSerializer(cart)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'])
    def submit(self, request):
        user = request.user
        cart = user.cart
        if user.flagged:
            return Response({"detail": "You are restricted from placing an order at the moment"},
                             status=status.HTTP_400_BAD_REQUEST)

        transaction = Transaction.objects.create(
            user=user
        )
        for cart_order in cart.orders.all():
            data = {
                "user": user.id,
                "quantity": cart_order.quantity,
                "product": cart_order.product.id,
                "style": cart_order.style
                }
            serializer = OrderSerializer(data=data)
            if serializer.is_valid():
                # Delete the cart order object
                cart_order.delete()
                # Save the actual Order object
                serializer.save(transaction=transaction)
            else:
                transaction.delete()
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        cart.total = 0
        cart.save()
        serializer = OrderSerializer(transaction.orders.all().order_by('product'), many=True)
        return Response(serializer.data)
