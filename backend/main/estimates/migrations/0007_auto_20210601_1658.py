# Generated by Django 3.1.7 on 2021-06-01 16:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('estimates', '0006_auto_20210513_1729'),
    ]

    operations = [
        migrations.AlterField(
            model_name='estimate',
            name='price',
            field=models.FloatField(default=0),
        ),
        migrations.AlterField(
            model_name='estimate',
            name='quantity',
            field=models.FloatField(default=0),
        ),
    ]
