# Generated by Django 2.2.27 on 2022-04-18 09:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0009_auto_20220418_0904'),
    ]

    operations = [
        migrations.AddField(
            model_name='packinglist',
            name='status',
            field=models.CharField(choices=[('Pending', 'Pending'), ('Completed', 'Completed')], default='Pending', max_length=32),
        ),
    ]
