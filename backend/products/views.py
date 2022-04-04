from rest_framework.viewsets import ModelViewSet
from django_filters.rest_framework import DjangoFilterBackend
from products.models import Brand, Product
from products.serializers import BrandSerializer, ProductSerializer
from users.authentication import ExpiringTokenAuthentication
from rest_framework.permissions import IsAuthenticated


class ProductViewSet(ModelViewSet):
    serializer_class = ProductSerializer
    permission_classes = (IsAuthenticated,)
    authentication_classes  = [ExpiringTokenAuthentication]
    queryset = Product.objects.all()


class BrandViewSet(ModelViewSet):
    serializer_class = BrandSerializer
    permission_classes = (IsAuthenticated,)
    authentication_classes  = [ExpiringTokenAuthentication]
    queryset = Brand.objects.all()
