from django.db import models

# Create your models here.
class Building(models.Model):
    building_name = models.CharField(max_length=255)
    def __str__(self):
        return f'Building :{self.building_name}'
    
class Floor(models.Model):
    floor_name = models.CharField(max_length=20)
    building = models.ForeignKey(Building, on_delete=models.CASCADE)
    def __str__(self):
        return f'Building :{self.building.building_name}, Floor: {self.floor_name}'
    
    class Meta:
        ordering = ['floor_name']
class Room(models.Model):
    room_name = models.CharField(max_length=10)
    hardware_id = models.CharField(max_length=255)
    floor = models.ForeignKey(Floor, on_delete=models.CASCADE)
    def __str__(self):
        return f' Building : {self.floor.building.building_name}, Floor : {self.floor.floor_name}, Room: {self.room_name}'

class Booking_Room(models.Model):
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    # class_room = models.ManyToManyField()