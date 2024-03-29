# Generated by Django 3.1.7 on 2021-06-01 14:02

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('invoices', '0003_invoicedetails'),
    ]

    operations = [
        migrations.CreateModel(
            name='Contractor',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150)),
                ('manager', models.CharField(blank=True, max_length=150)),
                ('email', models.EmailField(blank=True, max_length=254)),
                ('phone', models.CharField(blank=True, max_length=20)),
            ],
        ),
        migrations.AlterField(
            model_name='invoicedetails',
            name='units',
            field=models.CharField(choices=[('шт.', 'шт.'), ('м.', 'м.'), ('км.', 'км'), ('кг.', 'кг.'), ('г.', 'г.'), ('компл.', 'компл.'), ('упак.', 'упак.'), ('набор', 'набор')], default='шт', max_length=15),
        ),
        migrations.AlterField(
            model_name='invoice',
            name='contractor',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.PROTECT, to='invoices.contractor'),
        ),
    ]
