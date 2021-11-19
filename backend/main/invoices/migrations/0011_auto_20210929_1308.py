# Generated by Django 3.1.7 on 2021-09-29 13:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('invoices', '0010_delete_invoicedetails'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='invoice',
            name='owner',
        ),
        migrations.AddField(
            model_name='invoice',
            name='not_assigned',
            field=models.IntegerField(default=0),
        ),
    ]