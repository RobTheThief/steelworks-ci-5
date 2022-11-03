# Generated by Django 4.1.2 on 2022-11-02 22:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("steelworks", "0008_productuserpair"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="productuserpair",
            name="email",
        ),
        migrations.RemoveField(
            model_name="productuserpair",
            name="product_name",
        ),
        migrations.AddField(
            model_name="productuserpair",
            name="product_user_pair",
            field=models.CharField(
                default="Product User Pair",
                max_length=240,
                verbose_name="product_user_pair",
            ),
            preserve_default=False,
        ),
        migrations.RemoveField(
            model_name="productuserpair",
            name="subscribed_users",
        ),
        migrations.AddField(
            model_name="productuserpair",
            name="subscribed_users",
            field=models.ManyToManyField(to="steelworks.steelworksuser"),
        ),
    ]
