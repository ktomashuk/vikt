# Generated by Django 3.1.7 on 2021-07-21 02:37

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0014_unit'),
        ('cable', '0007_cablejournal_isolation'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cablejournal',
            name='system',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.PROTECT, to='core.system'),
        ),
    ]
