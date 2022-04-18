from django_filters import FilterSet, CharFilter
from products.models import Product
from django.db import models


class ProductFilter(FilterSet):
    styles = CharFilter(lookup_expr='icontains')

    class Meta:
         model = Product
         fields = ['category', 'half_pack_available', 'type', 'brand', 'styles', 'upload_date']
