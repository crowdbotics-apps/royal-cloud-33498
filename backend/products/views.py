from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from django_filters.rest_framework import DjangoFilterBackend
from home.filters import ProductFilter
from products.models import Brand, Category, Product, Photo
from products.serializers import BrandSerializer, CategorySerializer, ProductSerializer
from users.authentication import ExpiringTokenAuthentication
from rest_framework.permissions import IsAuthenticated
from royal_cloud_33498.settings import MAX_PRODUCT_RANGE
from datetime import date, timedelta


class ProductViewSet(ModelViewSet):
    serializer_class = ProductSerializer
    permission_classes = (IsAuthenticated,)
    authentication_classes  = [ExpiringTokenAuthentication]
    queryset = Product.objects.all()
    filterset_class = ProductFilter

    def get_queryset(self):
        if not self.request.user.is_superuser:
            today = date.today()
            cutoff_date = today - timedelta(days=int(MAX_PRODUCT_RANGE))
            return super().get_queryset().filter(upload_date__gte=cutoff_date)
        return super().get_queryset()

    @action(detail=False, methods=['delete'])
    def remove_image(self, request):
        image_id = request.data.get('image_id')
        photo = Photo.objects.get(id=image_id)
        serializer = ProductSerializer(photo.product)
        photo.delete()
        return Response(serializer.data)


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
