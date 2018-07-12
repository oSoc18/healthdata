# Generated by Django 2.0.7 on 2018-07-12 09:13

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Hospitals',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=500)),
                ('latitude', models.CharField(max_length=250)),
                ('longitude', models.CharField(max_length=250)),
                ('nbBeds', models.IntegerField()),
            ],
        ),
    ]
