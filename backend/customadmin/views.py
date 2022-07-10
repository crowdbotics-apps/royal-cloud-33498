from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from django_filters.rest_framework import DjangoFilterBackend
from customadmin.serializers import AdminProductSerializer
from home.utility import send_invoice
from orders.models import Order
from orders.serializers import OrderSerializer
from products.models import Product
from users.authentication import ExpiringTokenAuthentication
from rest_framework.permissions import IsAuthenticated


class AdminProductOrdersViewSet(ModelViewSet):
    serializer_class = AdminProductSerializer
    permission_classes = (IsAuthenticated,)
    authentication_classes  = [ExpiringTokenAuthentication]
    queryset = Product.objects.all()

    def get_queryset(self):
        return super().get_queryset().filter(
            orders__status="Pending"
        ).distinct()

    @action(detail=False, methods=['get'])
    def invoice_list(self, request):
        id = request.query_params.get('id')
        product = Product.objects.get(id=id)
        product_serializer = AdminProductSerializer(product).data
        orders = Order.objects.filter(
            product=product,
            status="Pending"
        )
        order_serializer = OrderSerializer(orders, many=True).data
        return Response(
            {
                'product_info': product_serializer,
                'order_list': order_serializer
            }
        )
        
    @action(detail=False, methods=['get'])
    def confirm(self, request):
        ids = request.query_params.get('ids')
        ids = ids.split(',')
        Order.objects.filter(
            pk__in=ids
        ).update(status="Confirmed")
        return Response(status=status.HTTP_200_OK)


    @action(detail=False, methods=['get'])
    def submit_invoice(self, request):
        id = request.query_params.get('id')
        order = Order.objects.get(
            pk=id
        )
        if not order.invoice:
            return Response({
                'detail': "Order does not have an invoice attached"
            }, status=status.HTTP_400_BAD_REQUEST)
        invoice = order.invoice.url
        send_invoice(user=order.user, invoice=invoice)
        return Response(status=status.HTTP_200_OK)
