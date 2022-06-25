from django.db import models
from home.constants import STATUS_TYPE
from home.models import UUIDModel
from users.models import User
from products.models import Product
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
    user = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        related_name='orders'
    )
    date = models.DateField(
        auto_now_add=True
    )
    date_time = models.DateTimeField(
        auto_now_add=True
    )
    product = models.ForeignKey(
        Product,
        on_delete=models.SET_NULL,
        null=True,
        related_name='orders'
    )
    style = models.CharField(
        max_length=150,
        blank=True
    )
    quantity = models.PositiveIntegerField(
        default=0
    )
    half_pack = models.BooleanField(
        default=False
    )
    matching_order = models.OneToOneField(
        "self",
        null=True,
        on_delete=models.SET_NULL
    )
    items = models.TextField(
        blank=True
    )
    status = models.CharField(
        choices=STATUS_TYPE,
        max_length=32,
        default="Pending"
    )
    shipping_cost = models.DecimalField(
        max_digits=7,
        decimal_places=2,
        default=0
    )
    tax = models.DecimalField(
        max_digits=7,
        decimal_places=2,
        default=0
    )
    subtotal = models.DecimalField(
        max_digits=7,
        decimal_places=2,
        null=True,
        blank=True
    )
    total = models.DecimalField(
        max_digits=7,
        decimal_places=2,
        null=True,
        blank=True
    )
    tracking_number_id = models.CharField(
        max_length=255,
        blank=True,
        null=True
    )
    packing_video = models.FileField(
        upload_to='packing-list/videos',
        blank=True,
        null=True
    )
    invoice = models.FileField(
        upload_to='packing-list/invoices',
        blank=True,
        null=True
    )

    def save(self, *args, **kwargs):
        self.total = self.subtotal + self.tax + self.shipping_cost
        super(Order, self).save(*args, **kwargs)
