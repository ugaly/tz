# Generated by Django 4.2.6 on 2023-10-26 13:34

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django_currentuser.db.models.fields
import django_currentuser.middleware


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('tz_place', '0003_alter_place_rate'),
    ]

    operations = [
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_date', models.DateField(auto_now_add=True)),
                ('created_time', models.TimeField(auto_now_add=True)),
                ('updated_date', models.DateField(auto_now=True)),
                ('updated_time', models.TimeField(auto_now=True)),
                ('deleted', models.BooleanField(default=False)),
                ('name', models.CharField(max_length=20)),
                ('photo', models.ImageField(upload_to='posts')),
                ('description', models.TextField()),
                ('created_by', django_currentuser.db.models.fields.CurrentUserField(default=django_currentuser.middleware.get_current_authenticated_user, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='post_creator', to=settings.AUTH_USER_MODEL)),
                ('place', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tz_place.place')),
                ('updated_by', django_currentuser.db.models.fields.CurrentUserField(default=django_currentuser.middleware.get_current_authenticated_user, null=True, on_delete=django.db.models.deletion.CASCADE, on_update=True, related_name='post_updater', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'tb_post',
            },
        ),
    ]
