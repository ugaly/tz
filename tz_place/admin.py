from django.contrib import admin
from tz_place.api.models import Place

@admin.register(Place)
class PlaceAdmin(admin.ModelAdmin):
    list_display = ['created_date', 'created_time', 'id', 'name',  'location', 'price', 'rate',
                     'photo' , 'created_by', 'updated_date', 'updated_by', 'deleted']
    search_fields = ['name', 'location']
    date_hierarchy = 'created_date'

    