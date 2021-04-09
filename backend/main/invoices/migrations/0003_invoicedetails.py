# Generated by Django 3.1.7 on 2021-03-28 09:05

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('invoices', '0002_invoice_owner'),
    ]

    operations = [
        migrations.CreateModel(
            name='InvoiceDetails',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('product', models.CharField(max_length=200)),
                ('quantity_bought', models.IntegerField(default=0)),
                ('quantity_docs', models.IntegerField(default=0)),
                ('units', models.CharField(choices=[('шт', 'шт'), ('м', 'м'), ('км', 'км'), ('кг', 'кг'), ('г', 'г'), ('компл', 'компл'), ('упак', 'упак'), ('набор', 'набор')], default='шт', max_length=15)),
                ('invoice', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='invoices.invoice')),
            ],
        ),
    ]