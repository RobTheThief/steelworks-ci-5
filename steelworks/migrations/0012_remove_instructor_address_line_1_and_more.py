# Generated by Django 4.1.3 on 2022-12-06 00:49

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('steelworks', '0011_instructor_instructoruserpair_classes'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='instructor',
            name='address_line_1',
        ),
        migrations.RemoveField(
            model_name='instructor',
            name='address_line_2',
        ),
        migrations.RemoveField(
            model_name='instructor',
            name='address_line_3',
        ),
        migrations.RemoveField(
            model_name='instructor',
            name='phone',
        ),
        migrations.RemoveField(
            model_name='instructor',
            name='postcode',
        ),
    ]
