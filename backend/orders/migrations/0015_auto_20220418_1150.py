# Generated by Django 2.2.28 on 2022-04-18 11:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0014_auto_20220418_1111'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='order',
            name='shipping_cost',
        ),
        migrations.RemoveField(
            model_name='order',
            name='tax',
        ),
    ]