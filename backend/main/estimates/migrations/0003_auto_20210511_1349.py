# Generated by Django 3.1.7 on 2021-05-11 13:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('estimates', '0002_auto_20210426_1438'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='estimate',
            name='number',
        ),
        migrations.AddField(
            model_name='estimate',
            name='system_number',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='estimate',
            name='ware_number',
            field=models.IntegerField(default=1),
        ),
        migrations.AlterField(
            model_name='estimate',
            name='note',
            field=models.CharField(blank=True, max_length=150),
        ),
    ]
