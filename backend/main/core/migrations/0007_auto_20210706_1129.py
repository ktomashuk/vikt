# Generated by Django 3.1.7 on 2021-07-06 11:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0006_contractor_units'),
    ]

    operations = [
        migrations.RenameField(
            model_name='contractor',
            old_name='units',
            new_name='type',
        ),
    ]
