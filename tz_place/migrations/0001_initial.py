# Generated by Django 4.2.6 on 2023-10-26 10:19

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django_currentuser.db.models.fields
import django_currentuser.middleware


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Place',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_date', models.DateField(auto_now_add=True)),
                ('created_time', models.TimeField(auto_now_add=True)),
                ('updated_date', models.DateField(auto_now=True)),
                ('updated_time', models.TimeField(auto_now=True)),
                ('deleted', models.BooleanField(default=False)),
                ('name', models.CharField(max_length=20)),
                ('location', models.CharField(max_length=20)),
                ('photo', models.ImageField(upload_to='places')),
                ('description', models.TextField()),
                ('price', models.IntegerField()),
                ('rate', models.FloatField(choices=[('1.0', '1.0'), ('2.0', '2.0'), ('3.0', '3.0'), ('4.0', '4.0'), ('5.0', '5.0')])),
                ('created_by', django_currentuser.db.models.fields.CurrentUserField(default=django_currentuser.middleware.get_current_authenticated_user, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='place_creator', to=settings.AUTH_USER_MODEL)),
                ('updated_by', django_currentuser.db.models.fields.CurrentUserField(default=django_currentuser.middleware.get_current_authenticated_user, null=True, on_delete=django.db.models.deletion.CASCADE, on_update=True, related_name='place_updater', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'tb_place',
            },
        ),
    ]