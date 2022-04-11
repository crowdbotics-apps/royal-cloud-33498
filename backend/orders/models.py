from django.db import models
from home.constants import SIZE_TYPE, STATUS_TYPE
from home.models import UUIDModel
from users.models import User
from products.models import Product


class Pack(UUIDModel):
    """
    A data representation of a full Pack
    """
    product = models.ForeignKey(Product, on_delete=models.SET_NULL,
                                null=True, related_name="packs")
    orders = models.ManyToManyField(Order)


class Item(UUIDModel):
    """
    A data representation of the individual items of a Pack
    """
    size = models.CharField(choices=SIZE_TYPE, max_length=5)
    pack = models.ForeignKey(Pack, related_name='items')


class SubOrder(UUIDModel):
    """
    A data representation of the multiple suborders an order can be split between
    """
    full_quantity = models.PositiveIntegerField(default=0)
    half_quantity = models.PositiveIntegerField(default=0)
    full_packs = models.ManyToManyField(Pack)
    half_pack = models.ForeignKey(Pack, related_name='half_orders')
    status = models.CharField(choices=STATUS_TYPE, max_length=32)


class Order(UUIDModel):
    """
    A data representation of a customer's Order
    """
    user = models.ForeignKey(User, on_delete=models.SET_NULL,
                             null=True, related_name='orders')
    product = models.ForeignKey(Product, on_delete=models.SET_NULL,
                                null=True, related_name='orders')
    has_half_order = models.BooleanField(default=False)

