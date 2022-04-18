from django.db import models
from home.constants import ORDER_STATUS_TYPE, STATUS_TYPE
from home.models import UUIDModel
from users.models import User
from products.models import Product
from django.db.models import Sum
from shortuuid.django_fields import ShortUUIDField


class Cart(UUIDModel):
    """
    A data representation of the multiple orders in a Cart
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    total = models.DecimalField(max_digits=7, decimal_places=2, default=0)


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
    date = models.DateField(auto_now_add=True)
    date_time = models.DateTimeField(auto_now_add=True)
    status = models.CharField(choices=ORDER_STATUS_TYPE, max_length=32, default="Pending")
    shipping_cost = models.DecimalField(max_digits=7, decimal_places=2, default=0)
    tax = models.DecimalField(max_digits=7, decimal_places=2, default=0)
    total = models.DecimalField(max_digits=7, decimal_places=2, default=0)
    after_tax_total = models.DecimalField(max_digits=7, decimal_places=2, default=0)

    def save(self,*args, **kwargs):
        orders = self.orders.aggregate(Sum('total'))
        self.total = orders.get('total__sum')
        self.after_tax_total = self.total + self.tax + self.shipping_cost
        return super().save(*args, **kwargs)


class Order(UUIDModel):
    """
    A data representation of a customer's Order
    """
    sid = ShortUUIDField(
        length=6,
        max_length=6,
        alphabet="1234567890",
        unique=True
    )
    user = models.ForeignKey(User, on_delete=models.SET_NULL,
                             null=True, related_name='orders')
    product = models.ForeignKey(Product, on_delete=models.SET_NULL,
                                null=True, related_name='orders')
    style = models.CharField(max_length=150, blank=True)
    quantity = models.PositiveIntegerField(default=0)
    status = models.CharField(choices=ORDER_STATUS_TYPE, max_length=32, default="Pending")
    total = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    packing_list = models.ForeignKey(PackingList,
                                     on_delete=models.CASCADE,
                                     related_name='orders',
                                     blank=True,
                                     null=True)

    def save(self,*args, **kwargs):
        suborders = self.suborders.aggregate(Sum('subtotal'))
        self.total = suborders.get('subtotal__sum')
        return super().save(*args, **kwargs)


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
