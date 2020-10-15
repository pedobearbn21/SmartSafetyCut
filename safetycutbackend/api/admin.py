from django.contrib import admin
# from apps.api.models import Building, Floor
from .models import Building, Floor, Room, BookingClass
# Register your models here.
admin.site.register(Building)
admin.site.register(Floor)
admin.site.register(Room)
admin.site.register(BookingClass)
