# Generated by Django 2.0.7 on 2018-07-19 18:29

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_auto_20180719_1809'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bed',
            name='hospital_siteNbr',
            field=models.ForeignKey(db_column='hospital_siteNbr', on_delete=django.db.models.deletion.CASCADE, to='api.Hospital'),
        ),
        migrations.AlterField(
            model_name='hospital',
            name='siteNbr',
            field=models.IntegerField(null=True),
        ),
    ]
