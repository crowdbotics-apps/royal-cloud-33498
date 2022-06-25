# Generated by Django 2.2.28 on 2022-06-25 09:42

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import shortuuid.django_fields
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('products', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Cart',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('total', models.DecimalField(decimal_places=2, default=0, max_digits=7)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('sid', shortuuid.django_fields.ShortUUIDField(alphabet='1234567890', length=6, max_length=6, prefix='', unique=True)),
                ('date', models.DateField(auto_now_add=True)),
                ('date_time', models.DateTimeField(auto_now_add=True)),
                ('style', models.CharField(blank=True, max_length=150)),
                ('quantity', models.PositiveIntegerField(default=0)),
                ('half_pack', models.BooleanField(default=False)),
                ('items', models.TextField(blank=True)),
                ('status', models.CharField(choices=[('Unmatched', 'Unmatched'), ('Pending', 'Pending'), ('Completed', 'Completed')], default='Pending', max_length=32)),
                ('shipping_cost', models.DecimalField(decimal_places=2, default=0, max_digits=7)),
                ('tax', models.DecimalField(decimal_places=2, default=0, max_digits=7)),
                ('subtotal', models.DecimalField(blank=True, decimal_places=2, max_digits=7, null=True)),
                ('total', models.DecimalField(blank=True, decimal_places=2, max_digits=7, null=True)),
                ('tracking_number_id', models.CharField(blank=True, max_length=255, null=True)),
                ('packing_video', models.FileField(blank=True, null=True, upload_to='packing-list/videos')),
                ('invoice', models.FileField(blank=True, null=True, upload_to='packing-list/invoices')),
                ('matching_order', models.OneToOneField(null=True, on_delete=django.db.models.deletion.SET_NULL, to='orders.Order')),
                ('product', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='orders', to='products.Product')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='orders', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='CartOrder',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('style', models.CharField(blank=True, max_length=150)),
                ('quantity', models.PositiveIntegerField()),
                ('total', models.DecimalField(blank=True, decimal_places=2, max_digits=7, null=True)),
                ('cart', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='orders', to='orders.Cart')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='in_cart', to='products.Product')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
