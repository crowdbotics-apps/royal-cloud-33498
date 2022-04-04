from rest_framework import serializers

from home.api.v1.serializers import CreatableSlugRelatedField
from .models import Brand, Product


class BrandSerializer(serializers.ModelSerializer):
    """
    A data representation of the Brand of a Product
    """
    class Meta:
        model = Brand
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    """
    A data representation of the Products
    """
    brand = CreatableSlugRelatedField(
        slug_field='name',
        queryset=Brand.objects.all()
    )

    class Meta:
        model = Product
        fields = '__all__'
