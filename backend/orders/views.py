from rest_framework.viewsets import ModelViewSet
from django_filters.rest_framework import DjangoFilterBackend
from orders.models import Order
from orders.serializers import OrderSerializer
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
