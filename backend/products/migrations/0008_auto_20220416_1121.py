# Generated by Django 2.2.27 on 2022-04-16 11:21

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0007_auto_20220416_1120'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='styles',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(blank=True, max_length=32), blank=True, null=True, size=None),
        ),
    ]