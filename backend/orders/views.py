from decimal import Decimal
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from orders.models import Cart, CartOrder, Order
from orders.serializers import CartSerializer, OrderSerializer
from products.models import Product
from users.authentication import ExpiringTokenAuthentication
from rest_framework.permissions import IsAuthenticated


class OrderViewSet(ModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = (IsAuthenticated,)
    authentication_classes  = [ExpiringTokenAuthentication]
    queryset = Order.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['user', 'status', 'product']

    def perform_create(self, serializer):
        order = serializer.save(
            user=self.request.user)


class CartViewSet(ModelViewSet):
    serializer_class = CartSerializer
    permission_classes = (IsAuthenticated,)
    authentication_classes  = [ExpiringTokenAuthentication]
    queryset = Cart.objects.all()

    def create(self, request, *args, **kwargs):
        user = request.user
        product_id = request.data.get('product')
        quantity = int(request.data.get('quantity'))
        style = request.data.get('style')
        product = Product.objects.get(id=product_id)
        if style not in product.styles:
            return Response({'detail': 'Invalid Style Choice'}, status=status.HTTP_400_BAD_REQUEST)
        total_cost = 0
        temp_quantity = quantity
        if temp_quantity % 6 == 3:
            total_cost = total_cost + (product.per_pack_price * Decimal(0.5))
            temp_quantity -= 3
        if temp_quantity and temp_quantity % 6 == 0:
            num_packs = temp_quantity / 6
            total_cost = total_cost + (product.per_pack_price * Decimal(num_packs))
        CartOrder.objects.create(
            cart=user.cart,
            product=product,
            style=style,
            quantity=quantity,
            total=total_cost
        )
        serializer = CartSerializer(user.cart)
        return Response(serializer.data, status=status.HTTP_201_CREATED)