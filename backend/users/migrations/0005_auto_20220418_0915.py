# Generated by Django 2.2.27 on 2022-04-18 09:15

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0004_user_approved'),
    ]

    operations = [
        migrations.RenameField(
            model_name='user',
            old_name='approved',
            new_name='flagged',
        ),
    ]