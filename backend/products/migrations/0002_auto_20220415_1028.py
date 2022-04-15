# Generated by Django 2.2.27 on 2022-04-15 10:28

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=150)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.RemoveField(
            model_name='product',
            name='full_packs',
        ),
        migrations.RemoveField(
            model_name='product',
            name='half_packs',
        ),
        migrations.RemoveField(
            model_name='product',
            name='price',
        ),
        migrations.AddField(
            model_name='product',
            name='half_pack_available',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='product',
            name='per_item_price',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=7),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='product',
            name='per_pack_price',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=7),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='product',
            name='size_variance',
            field=models.CharField(choices=[('2S 2M 2L', '2S 2M 2L'), ('2S 2M 2L 2XL', '2S 2M 2L 2XL'), ('2XS 2S 2M 2L 2XL', '2XS 2S 2M 2L 2XL'), ('2XXS 2XS 2S 2M 2L 2XL', '2XXS 2XS 2S 2M 2L 2XL'), ('1XL 2XL 3XL', '1XL 2XL 3XL'), ('1 3 5 7 9 11 13', '1 3 5 7 9 11 13'), ('0 1 3 5 7 9 11 13', '0 1 3 5 7 9 11 13'), ('14 16 18 20 22', '14 16 18 20 22')], default='2S 2M 2L', max_length=32),
        ),
        migrations.AlterField(
            model_name='product',
            name='brand',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='products', to='products.Brand'),
        ),
        migrations.AlterField(
            model_name='product',
            name='style',
            field=models.CharField(blank=True, max_length=32),
        ),
        migrations.AddField(
            model_name='product',
            name='category',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='products', to='products.Category'),
        ),
    ]