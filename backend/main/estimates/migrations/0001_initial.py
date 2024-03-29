# Generated by Django 3.1.7 on 2021-04-26 13:20

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('core', '0003_delete_profile'),
    ]

    operations = [
        migrations.CreateModel(
            name='Estimate',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('number', models.CharField(max_length=10)),
                ('ware', models.CharField(max_length=250)),
                ('quantity', models.IntegerField(default=0)),
                ('units', models.CharField(choices=[('шт', 'шт'), ('м', 'м'), ('км', 'км'), ('кг', 'кг'), ('г', 'г'), ('компл', 'компл'), ('упак', 'упак'), ('набор', 'набор')], default='шт', max_length=15)),
                ('system', models.CharField(max_length=150)),
                ('price', models.IntegerField(default=0)),
                ('note', models.TextField(max_length=300)),
                ('object', models.ForeignKey(default=1, on_delete=django.db.models.deletion.PROTECT, to='core.object')),
            ],
        ),
    ]
