from django.db import models

# Create your models here.
from django_currentuser.db.models import CurrentUserField


class Place(models.Model):
    class Meta:
        db_table = 'tb_place'

    CHOICE = (
        ('1.0', '1.0'),
        ('2.0', '2.0'),
        ('3.0', '3.0'),
        ('4.0', '4.0'),
        ('5.0', '5.0'),
    )
    created_date = models.DateField(auto_now_add=True)
    created_time = models.TimeField(auto_now_add=True)
    created_by = CurrentUserField(related_name='place_creator')
    updated_date = models.DateField(auto_now=True)
    updated_time = models.TimeField(auto_now=True)
    updated_by = CurrentUserField(on_update=True, related_name='place_updater')
    deleted = models.BooleanField(default=False)

    name = models.CharField(max_length=20)
    location = models.CharField(max_length=20)
    photo = models.ImageField(upload_to='places')
    description = models.TextField()
    price = models.IntegerField()
    rate = models.CharField(max_length=10, choices=CHOICE)
    
    def __str__(self):
        return self.location