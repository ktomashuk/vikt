# Generated by Django 3.1.7 on 2021-08-19 02:25

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('purchases', '0003_auto_20210819_0208'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='purchase',
            name='ware_reference',
        ),
    ]
