# Generated by Django 3.1.7 on 2021-06-16 23:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cable', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='cablejournal',
            old_name='end',
            new_name='number',
        ),
        migrations.RemoveField(
            model_name='cablejournal',
            name='start',
        ),
        migrations.AddField(
            model_name='cablejournal',
            name='index',
            field=models.IntegerField(default=1),
        ),
    ]