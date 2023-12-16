from django.db import models
from django_currentuser.db.models import CurrentUserField
from tz_place.api.models import Place


class Post(models.Model):
    class Meta:
        db_table = 'tb_post'
       


    created_date = models.DateField(auto_now_add=True)
    created_time = models.TimeField(auto_now_add=True)
    created_by = CurrentUserField(related_name='post_creator')
    updated_date = models.DateField(auto_now=True)
    updated_time = models.TimeField(auto_now=True)
    updated_by = CurrentUserField(on_update=True, related_name='post_updater')
    deleted = models.BooleanField(default=False)

    place = models.ForeignKey(Place, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    photo = models.ImageField(upload_to='posts')
    description = models.TextField()
    is_recomended = models.BooleanField(default=False)
   
   
    def __str__(self):
        return self.name