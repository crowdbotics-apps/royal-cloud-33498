# Generated by Django 2.2.27 on 2022-04-17 11:26

import django.contrib.postgres.fields.jsonb
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0010_product_half_pack_orders'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='half_pack_orders',
            field=django.contrib.postgres.fields.jsonb.JSONField(blank=True, default=dict),
        ),
    ]