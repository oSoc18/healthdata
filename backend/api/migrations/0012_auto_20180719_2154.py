# Generated by Django 2.0.7 on 2018-07-19 21:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_bed_typename'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bed',
            name='type',
            field=models.CharField(max_length=20, null=True),
        ),
    ]