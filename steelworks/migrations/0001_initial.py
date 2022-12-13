# Generated by Django 4.1.3 on 2022-12-12 18:37

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Classes',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('class_name', models.CharField(max_length=240, verbose_name='class_name')),
                ('class_details', models.CharField(max_length=240, verbose_name='class_details')),
                ('created', models.DateField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Instructor',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=240, verbose_name='first_name')),
                ('last_name', models.CharField(max_length=240, verbose_name='last_name')),
                ('email', models.EmailField(max_length=254)),
                ('created', models.DateField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('product_name', models.CharField(max_length=240, verbose_name='product_name')),
                ('product_cost', models.CharField(max_length=240, verbose_name='product_cost')),
                ('product_details', models.CharField(max_length=240, verbose_name='product_details')),
                ('created', models.DateField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='SteelworksUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=240, verbose_name='first_name')),
                ('last_name', models.CharField(max_length=240, verbose_name='last_name')),
                ('email', models.EmailField(max_length=254)),
                ('address_line_1', models.CharField(max_length=240, verbose_name='address_line_1')),
                ('address_line_2', models.CharField(max_length=240, verbose_name='address_line_2')),
                ('address_line_3', models.CharField(max_length=240, verbose_name='address_line_3')),
                ('postcode', models.CharField(max_length=240, verbose_name='postcode')),
                ('phone', models.CharField(max_length=240, verbose_name='phone')),
                ('created', models.DateField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='ProductUserPair',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateField(auto_now_add=True)),
                ('product', models.ManyToManyField(to='steelworks.product')),
                ('subscribed_users', models.ManyToManyField(to='steelworks.steelworksuser')),
            ],
        ),
        migrations.CreateModel(
            name='InstructorUserPair',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('instructor_email', models.CharField(default='no-instructor-email', max_length=240, verbose_name='instructor_name')),
                ('created', models.DateField(auto_now_add=True)),
                ('instructor', models.ManyToManyField(to='steelworks.instructor')),
                ('students', models.ManyToManyField(to='steelworks.steelworksuser')),
            ],
        ),
        migrations.CreateModel(
            name='ClassTimeUserPair',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateField(auto_now_add=True)),
                ('classes', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='steelworks.classes')),
                ('time_slot_1', models.ManyToManyField(related_name='time_slot_1', to='steelworks.steelworksuser')),
                ('time_slot_2', models.ManyToManyField(related_name='time_slot_2', to='steelworks.steelworksuser')),
            ],
        ),
        migrations.AddField(
            model_name='classes',
            name='enrolled_students',
            field=models.ManyToManyField(to='steelworks.steelworksuser'),
        ),
        migrations.AddField(
            model_name='classes',
            name='instructor',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='steelworks.instructor'),
        ),
    ]
