# Generated by Django 3.1.7 on 2021-06-14 19:17

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('core', '0004_auto_20210602_2247'),
    ]

    operations = [
        migrations.CreateModel(
            name='CableJournal',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('system', models.CharField(max_length=150)),
                ('name', models.CharField(max_length=150)),
                ('start', models.CharField(max_length=150)),
                ('end', models.CharField(max_length=150)),
                ('cable', models.CharField(max_length=150)),
                ('cable_cut', models.CharField(max_length=150)),
                ('length', models.FloatField(blank=True)),
                ('object', models.ForeignKey(default=1, on_delete=django.db.models.deletion.PROTECT, to='core.object')),
            ],
        ),
    ]
