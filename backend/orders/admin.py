from django.contrib import admin

from orders.models import Order, PackingList

# Register your models here.
admin.site.register(PackingList)
admin.site.register(Order)