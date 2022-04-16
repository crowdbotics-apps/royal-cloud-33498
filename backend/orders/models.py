from django.db import models
from home.constants import ORDER_STATUS_TYPE, SIZE_TYPE, STATUS_TYPE
from django.contrib.postgres.fields import ArrayField
from home.models import UUIDModel
from users.models import User
from products.models import Product


class Cart(UUIDModel):
    """
    A data representation of the multiple orders in a Cart
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    total = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)


class CartOrder(UUIDModel):
    """
    A data representation of the temporary cart items
    """
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='orders')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='in_cart')
    style = models.CharField(max_length=150, blank=True)
    quantity = models.PositiveIntegerField()
    total = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)


class PackingList(UUIDModel):
    user = models.ForeignKey(User, on_delete=models.SET_NULL,
                             null=True, related_name='packing_lists')
    date = models.DateTimeField(auto_now_add=True)
    total = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)


class Order(UUIDModel):
    """
    A data representation of a customer's Order
    """
    user = models.ForeignKey(User, on_delete=models.SET_NULL,
                             null=True, related_name='orders')
    product = models.ForeignKey(Product, on_delete=models.SET_NULL,
                                null=True, related_name='orders')
    quantity = models.PositiveIntegerField(default=0)
    status = models.CharField(choices=ORDER_STATUS_TYPE, max_length=32, default="Pending")
    shipping_cost = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    tax = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    total = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    packing_list = models.ForeignKey(PackingList,
                                     on_delete=models.CASCADE,
                                     related_name='orders',
                                     blank=True,
                                     null=True)


class SubOrder(UUIDModel):
    """
    A data representation of the multiple suborders an order can be split between
    """
    order = models.ForeignKey(Order,
                              on_delete=models.CASCADE,
                              related_name='suborders',
                              null=True)
    half_pack = models.BooleanField(default=False)
    matching_order = models.OneToOneField("self", null=True, on_delete=models.SET_NULL)
    status = models.CharField(choices=STATUS_TYPE, max_length=32)
    items = models.TextField(blank=True)
    quantity = models.PositiveIntegerField(default=0)
    subtotal = models.DecimalField(max_digits=7, decimal_places=2)


# Order
# User A
# T Shirts
# Yes
# 15
# Pending
# $18
# $12
# $99


# SubOrder 1
# False
# Pending
# 2XS 2S 2M 2L 2XL
# 12
# subtotal = Per Piece Price * 12


# SubOrder 2
# True
# Unmatched
# XS S M L XL
# 3
# subtotal = Per Piece Price * 3