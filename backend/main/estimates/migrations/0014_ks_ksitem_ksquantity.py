# Generated by Django 3.1.7 on 2021-09-06 12:59

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0015_auto_20210814_1114'),
        ('estimates', '0013_nonestimate'),
    ]

    operations = [
        migrations.CreateModel(
            name='KS',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('contract_number', models.CharField(max_length=50)),
                ('contract_date', models.DateField()),
                ('document_number', models.CharField(max_length=50)),
                ('document_date', models.DateField()),
                ('period_start', models.DateField()),
                ('period_end', models.DateField()),
                ('object', models.ForeignKey(blank=True, default=1, null=True, on_delete=django.db.models.deletion.SET_NULL, to='core.object')),
            ],
        ),
        migrations.CreateModel(
            name='KSQuantity',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.FloatField(default=0)),
                ('estimate_reference', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='estimates.estimate')),
            ],
        ),
        migrations.CreateModel(
            name='KSItem',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('number', models.IntegerField()),
                ('work_price', models.FloatField(default=0)),
                ('quantity', models.FloatField(default=0)),
                ('estimate_reference', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='estimates.estimate')),
                ('ks_reference', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='estimates.ks')),
            ],
        ),
    ]
