# Generated by Django 4.1.3 on 2022-12-15 21:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('steelworks', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='classes',
            name='class_details',
            field=models.CharField(max_length=340, verbose_name='class_details'),
        ),
    ]
