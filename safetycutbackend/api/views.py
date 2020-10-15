import decimal
from datetime import datetime 
from django.shortcuts import render
from django.views.generic import View, TemplateView
from rest_framework import generics
from .models import BookingClass
from rest_framework import serializers

class BookingRoomSerializer(serializers.ModelSerializer):
    class Meta: 
        model = BookingClass
        fields = '__all__'
    
class UpdaterRoom(generics.ListCreateAPIView):
    queryset = BookingClass.objects.all()
    serializer_class  = BookingRoomSerializer


def updater():
        # !Todo: Let's Change to Change Status Hardware to Real life
        # bookclass = BookingClass()
        data_waiting_update = BookingClass.objects.latest('timestamp')
        # bookclass.start_time = data_waiting_update.start_time
        # bookclass.end_time = data_waiting_update.end_time
        # bookclass.timestamp = data_waiting_update.timestamp
        # bookclass.count = data_waiting_update.count
        # bookclass.room = data_waiting_update.room
        data_waiting_update.save()

class MainView(TemplateView):
    def get(self, request, **kwargs):
        latestdata = BookingClass.objects.latest('timestamp')
        return render(request, 'api\index.html',{
            'start_date': latestdata.start_time,
            'end_date': latestdata.end_time,
            'timestamp': latestdata.timestamp,
            'room': latestdata.room.room_name,
            'count': latestdata.count
        })

   
