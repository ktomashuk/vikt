# Generated by Django 3.1.7 on 2021-08-30 13:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('purchases', '0007_auto_20210830_1331'),
    ]

    operations = [
        migrations.AddField(
            model_name='purchase',
            name='estimate_bool',
            field=models.BooleanField(default=True),
        ),
    ]