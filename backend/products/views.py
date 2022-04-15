from rest_framework.viewsets import ModelViewSet
from django_filters.rest_framework import DjangoFilterBackend
from products.models import Brand, Category, Product
from products.serializers import BrandSerializer, CategorySerializer, ProductSerializer
from users.authentication import ExpiringTokenAuthentication
from rest_framework.permissions import IsAuthenticated


class ProductViewSet(ModelViewSet):
    serializer_class = ProductSerializer
    permission_classes = (IsAuthenticated,)
    authentication_classes  = [ExpiringTokenAuthentication]
    queryset = Product.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['category', 'style', 'half_pack_available', 'type', 'brand']


class BrandViewSet(ModelViewSet):
    serializer_class = BrandSerializer
    permission_classes = (IsAuthenticated,)
    authentication_classes  = [ExpiringTokenAuthentication]
    queryset = Brand.objects.all()


class CategoryViewSet(ModelViewSet):
    serializer_class = CategorySerializer
    permission_classes = (IsAuthenticated,)
    authentication_classes  = [ExpiringTokenAuthentication]
    queryset = Category.objects.all()
