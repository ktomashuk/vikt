# Generated by Django 3.1.7 on 2021-07-09 04:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0012_object_full_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='object',
            name='contractors',
            field=models.ManyToManyField(blank=True, to='core.Contractor'),
        ),
    ]
