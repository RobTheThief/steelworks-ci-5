# Generated by Django 4.1.3 on 2022-12-15 21:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('steelworks', '0002_alter_classes_class_details'),
    ]

    operations = [
        migrations.AlterField(
            model_name='classes',
            name='class_details',
            field=models.CharField(max_length=450, verbose_name='class_details'),
        ),
    ]
