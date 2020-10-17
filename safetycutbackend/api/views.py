import decimal
from django.utils import timezone
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


def formatDateTime(datetimeData):
    return timezone(datetimeData.year,datetimeData.month,datetimeData.day,datetimeData.hour,datetimeData.minute,datetimeData.second,datetimeData.microsecond,)

def check_notinbetweendates(start,end,now):
    if( (now <= formatDateTime(end)) and (now >= formatDateTime(start)) ):
        return False
    return True

def updateStatusRoom(DataObjectDate,status):
    DataObjectDate.room.status = status
    DataObjectDate.save()
    return True

def updater():
        nowtime = timezone.now()
        data_waiting_update = BookingClass.objects.all()
        
        #Condition When Class Is End or Not In Class Time
        NotUsedRoom = list(filter(lambda x: check_notinbetweendates(x.start_time,x.end_time,nowtime), data_waiting_update))
        updateNotUseRoom = map(lambda x: updateStatusRoom(x,"0"),NotUsedRoom)
        #end

        #Conditon When Class Will I Start
        UseRoom = list(filter(lambda x: not check_notinbetweendates(x.start_time,x.end_time,nowtime),data_waiting_update))
        updateForUseRoom = map(lambda x: updateStatusRoom(x,"1"),UseRoom)
        #end

        #Not in ClassRoom & Not in BookingRoom


        return True

class MainView(TemplateView):
    def get(self, request, **kwargs):
        latestdata = BookingClass.objects.latest('timestamp')
        return render(request, 'api\index.html',{
            'datenow' : timezone.now(),
            'start_date': latestdata.start_time,
            'end_date': latestdata.end_time,
            'timestamp': latestdata.timestamp,
            'room': latestdata.room.room_name,
            'count': latestdata.count,
            'status':latestdata.room.status
        })

   
