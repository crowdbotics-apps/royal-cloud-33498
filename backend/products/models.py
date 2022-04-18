from django.db import models
from home.constants import PRODUCT_TYPE, SIZE_VARIANCE
from home.models import UUIDModel
from django.contrib.postgres.fields import ArrayField, JSONField


class Brand(UUIDModel):
    """
    A data representation of the brands used by the Admin
    """
    name = models.CharField(max_length=150)


class Category(UUIDModel):
    """
    A data representation of the various product categories
    """
    name = models.CharField(max_length=150)

    class Meta:
        verbose_name_plural = "Categories"


class Product(UUIDModel):
    """
    A data represention of the products available for sale
    """
    brand = models.ForeignKey(Brand,
                              on_delete=models.SET_NULL,
                              related_name='products',
                              blank=True,
                              null=True)
    category = models.ForeignKey(Category,
                                 on_delete=models.SET_NULL,
                                 related_name='products',
                                 blank=True,
                                 null=True)
    per_pack_price = models.DecimalField(max_digits=7, decimal_places=2)
    per_item_price = models.DecimalField(max_digits=7, decimal_places=2)
    styles = ArrayField(models.CharField(max_length=32, blank=True), null=True, blank=True)
    upload_date = models.DateField(auto_now_add=True)
    half_pack_available = models.BooleanField(default=False)
    half_pack_orders = JSONField(blank=True, default=dict)
    half_pack_styles = ArrayField(models.CharField(max_length=32, blank=True), null=True, blank=True)
    size_variance = models.CharField(choices=SIZE_VARIANCE, max_length=32, default='2S 2M 2L')
    type = models.CharField(choices=PRODUCT_TYPE, max_length=32)


class Photo(UUIDModel):
    """
    A data representation of the multiple photos in a product
    """
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='photos')
    image = models.ImageField(upload_to='products/images')
