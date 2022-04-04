from django.db import models
from home.constants import PRODUCT_TYPE
from home.models import UUIDModel


class Brand(UUIDModel):
    """
    A data representation of the brands used by the Admin
    """
    name = models.CharField(max_length=150)


class Product(UUIDModel):
    """
    A data represention of the products available for sale
    """
    brand = models.ForeignKey(Brand, on_delete=models.SET_NULL, null=True)
    image = models.ImageField(upload_to='products/images')
    price = models.DecimalField(max_digits=7, decimal_places=2)
    style = models.CharField(max_length=32)
    full_packs = models.PositiveIntegerField(default=0)
    half_packs = models.PositiveIntegerField(default=0)
    upload_date = models.DateTimeField(auto_now_add=True)
