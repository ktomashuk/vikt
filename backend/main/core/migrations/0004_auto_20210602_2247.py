# Generated by Django 3.1.7 on 2021-06-02 22:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_delete_profile'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='contractor',
            name='manager',
        ),
        migrations.AddField(
            model_name='contractor',
            name='BIK',
            field=models.CharField(blank=True, max_length=20),
        ),
        migrations.AddField(
            model_name='contractor',
            name='INN',
            field=models.CharField(blank=True, max_length=20),
        ),
        migrations.AddField(
            model_name='contractor',
            name='KPP',
            field=models.CharField(blank=True, max_length=20),
        ),
        migrations.AddField(
            model_name='contractor',
            name='OGRN',
            field=models.CharField(blank=True, max_length=30),
        ),
        migrations.AddField(
            model_name='contractor',
            name='OKPO',
            field=models.CharField(blank=True, max_length=20),
        ),
        migrations.AddField(
            model_name='contractor',
            name='OKTMO',
            field=models.CharField(blank=True, max_length=20),
        ),
        migrations.AddField(
            model_name='contractor',
            name='OKVED',
            field=models.CharField(blank=True, max_length=20),
        ),
        migrations.AddField(
            model_name='contractor',
            name='account_correspondence',
            field=models.CharField(blank=True, max_length=50),
        ),
        migrations.AddField(
            model_name='contractor',
            name='account_settle',
            field=models.CharField(blank=True, max_length=50),
        ),
        migrations.AddField(
            model_name='contractor',
            name='address_fact',
            field=models.CharField(blank=True, max_length=150),
        ),
        migrations.AddField(
            model_name='contractor',
            name='address_legal',
            field=models.CharField(blank=True, max_length=150),
        ),
        migrations.AddField(
            model_name='contractor',
            name='bank_name',
            field=models.CharField(blank=True, max_length=150),
        ),
        migrations.AddField(
            model_name='contractor',
            name='director',
            field=models.CharField(blank=True, max_length=150),
        ),
        migrations.AddField(
            model_name='contractor',
            name='legal_name',
            field=models.CharField(blank=True, max_length=150),
        ),
        migrations.AddField(
            model_name='contractor',
            name='manager_email',
            field=models.EmailField(blank=True, max_length=254),
        ),
        migrations.AddField(
            model_name='contractor',
            name='manager_name',
            field=models.CharField(blank=True, max_length=150),
        ),
        migrations.AddField(
            model_name='contractor',
            name='manager_phone',
            field=models.CharField(blank=True, max_length=32),
        ),
        migrations.AlterField(
            model_name='contractor',
            name='email',
            field=models.EmailField(blank=True, max_length=254),
        ),
        migrations.AlterField(
            model_name='contractor',
            name='phone',
            field=models.CharField(blank=True, max_length=32),
        ),
    ]
