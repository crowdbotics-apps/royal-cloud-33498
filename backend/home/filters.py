from django_filters import FilterSet, CharFilter, DateFilter
from products.models import Product
from django.db import models


class ProductFilter(FilterSet):
    min_date = DateFilter(field_name='upload_date', lookup_expr='gte')
    max_date = DateFilter(field_name='upload_date', lookup_expr='lte')
    styles = CharFilter(lookup_expr='icontains')

    class Meta:
         model = Product
         fields = ['category', 'half_pack_available', 'type', 'brand', 'styles', 'min_date', 'max_date']
