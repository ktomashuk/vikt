# Generated by Django 3.1.7 on 2021-09-06 12:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('purchases', '0011_auto_20210905_2136'),
    ]

    operations = [
        migrations.AddField(
            model_name='estimatepurchasequantity',
            name='shipped',
            field=models.FloatField(default=0),
        ),
        migrations.AddField(
            model_name='nonestimatepurchasequantity',
            name='shipped',
            field=models.FloatField(default=0),
        ),
    ]
