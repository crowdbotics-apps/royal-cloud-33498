# Generated by Django 2.2.28 on 2022-07-10 19:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0003_order_description'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='num_packs',
            field=models.PositiveIntegerField(default=0),
        ),
    ]