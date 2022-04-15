# Generated by Django 2.2.27 on 2022-04-15 11:27

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0005_product_type'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='image',
        ),
        migrations.AlterField(
            model_name='product',
            name='size_variance',
            field=models.CharField(choices=[('2S 2M 2L', '2S 2M 2L'), ('2S 2M 2L 2XL', '2S 2M 2L 2XL'), ('2XS 2S 2M 2L 2XL', '2XS 2S 2M 2L 2XL'), ('2XXS 2XS 2S 2M 2L 2XL', '2XXS 2XS 2S 2M 2L 2XL'), ('2XL 2XXL 2XXL', '2XL 2XXL 2XXXL'), ('1 3 5 7 9 11 13', '1 3 5 7 9 11 13'), ('0 1 3 5 7 9 11 13', '0 1 3 5 7 9 11 13'), ('14 16 18 20 22', '14 16 18 20 22')], default='2S 2M 2L', max_length=32),
        ),
        migrations.CreateModel(
            name='Photo',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('image', models.ImageField(upload_to='products/images')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='photos', to='products.Product')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]