# Generated by Django 2.0.7 on 2018-07-19 20:12

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_auto_20180719_1829'),
    ]

    operations = [
        migrations.CreateModel(
            name='HospitalNetwork',
            fields=[
                ('name', models.CharField(max_length=500)),
                ('id', models.IntegerField(primary_key=True, serialize=False)),
            ],
        ),
        migrations.AlterField(
            model_name='hospital',
            name='siteNbr',
            field=models.IntegerField(null=True, unique=True),
        ),
        migrations.AddField(
            model_name='hospital',
            name='network',
            field=models.ForeignKey(db_column='hospital_network_id', default='', on_delete=django.db.models.deletion.CASCADE, to='api.HospitalNetwork'),
            preserve_default=False,
        ),
    ]
