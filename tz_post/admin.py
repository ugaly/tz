from django.contrib import admin

# Register your models here.
from django.contrib import admin
from tz_post.api.models import Post

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ['created_date', 'created_time', 'id', 'name', 'place',
                     'photo' , 'is_recomended', 'created_by', 'updated_date', 'updated_by', 'deleted']
    search_fields = ['name', 'location']
    date_hierarchy = 'created_date'

    