# Generated by Django 3.1.7 on 2021-07-06 11:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0005_representative'),
    ]

    operations = [
        migrations.AddField(
            model_name='contractor',
            name='units',
            field=models.CharField(choices=[('Поставщик', 'Поставщик'), ('Заказчик', 'Заказчик'), ('Субподрядчик', 'Субподрядчик')], default='Поставщик', max_length=50),
        ),
    ]
