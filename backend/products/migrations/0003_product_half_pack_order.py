# Generated by Django 2.2.27 on 2022-04-15 11:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0003_auto_20220415_1103'),
        ('products', '0002_auto_20220415_1028'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='half_pack_order',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.SET_NULL, to='orders.SubOrder'),
        ),
    ]
