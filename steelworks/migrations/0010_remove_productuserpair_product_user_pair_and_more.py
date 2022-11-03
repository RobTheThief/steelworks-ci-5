# Generated by Django 4.1.2 on 2022-11-03 10:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("steelworks", "0009_remove_productuserpair_email_and_more"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="productuserpair",
            name="product_user_pair",
        ),
        migrations.AddField(
            model_name="productuserpair",
            name="product",
            field=models.ManyToManyField(to="steelworks.product"),
        ),
    ]
