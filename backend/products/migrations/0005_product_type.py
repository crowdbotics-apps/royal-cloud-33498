# Generated by Django 2.2.27 on 2022-04-15 11:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0004_auto_20220415_1105'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='type',
            field=models.CharField(choices=[('Catalog', 'Catalog'), ('Inventory', 'Inventory')], default='Catalog', max_length=32),
            preserve_default=False,
        ),
    ]
