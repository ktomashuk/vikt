# Generated by Django 3.1.7 on 2021-08-17 11:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cable', '0009_cablejournal_cores'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cablejournal',
            name='cores',
            field=models.CharField(default='2', max_length=5),
        ),
    ]
