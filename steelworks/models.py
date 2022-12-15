from django.db import models


class SteelworksUser(models.Model):
    first_name = models.CharField("first_name", max_length=240)
    last_name = models.CharField("last_name", max_length=240)
    email = models.EmailField()
    address_line_1 = models.CharField("address_line_1", max_length=240)
    address_line_2 = models.CharField("address_line_2", max_length=240)
    address_line_3 = models.CharField("address_line_3", max_length=240)
    postcode = models.CharField("postcode", max_length=240)
    phone = models.CharField("phone", max_length=240)
    created = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.email


class Instructor(models.Model):
    first_name = models.CharField("first_name", max_length=240)
    last_name = models.CharField("last_name", max_length=240)
    email = models.EmailField()
    created = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.email


class Product(models.Model):
    product_name = models.CharField("product_name", max_length=240)
    product_cost = models.CharField("product_cost", max_length=240)
    product_details = models.CharField("product_details", max_length=240)
    created = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.product_name


class ProductUserPair(models.Model):
    product = models.ManyToManyField(Product)
    subscribed_users = models.ManyToManyField(SteelworksUser)
    created = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.product


class Classes(models.Model):
    class_name = models.CharField("class_name", max_length=240)
    class_details = models.CharField("class_details", max_length=450)
    instructor = models.OneToOneField(
        Instructor,
        on_delete=models.CASCADE,
    )
    enrolled_students = models.ManyToManyField(SteelworksUser)
    created = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.class_name


class ClassTimeUserPair(models.Model):
    gym_class = models.OneToOneField(
        Classes,
        on_delete=models.CASCADE,
    )
    time_slot_1 = models.ManyToManyField(
        SteelworksUser, related_name='time_slot_1')
    time_slot_2 = models.ManyToManyField(
        SteelworksUser, related_name='time_slot_2')
    created = models.DateField(auto_now_add=True)

    def __str__(self):
        return str(self.gym_class)
