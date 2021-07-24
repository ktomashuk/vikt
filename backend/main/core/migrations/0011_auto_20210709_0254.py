# Generated by Django 3.1.7 on 2021-07-09 02:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0010_auto_20210708_1411'),
    ]

    operations = [
        migrations.AddField(
            model_name='object',
            name='city',
            field=models.CharField(blank=True, max_length=150),
        ),
        migrations.CreateModel(
            name='System',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('acronym', models.CharField(max_length=50)),
                ('full_name', models.CharField(blank=True, max_length=150)),
                ('project_name', models.CharField(blank=True, max_length=150)),
                ('object', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='core.object')),
            ],
        ),
    ]