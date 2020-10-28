import React, { useState, useEffect } from 'react'
import { StyleSheet, Image, ImageBackground, Dimensions, Alert, ScrollView, FlatList, ActivityIndicator } from 'react-native'
import { Block, Text, Input, Button } from 'galio-framework'
import themes from './themes'
import axios from 'axios'
import DatetimePickerComponent from '../components/DatetimePickerComponent'
// import datetime from 'datetime'

const { width } = Dimensions.get('screen');

const RoomsDetail = ({ route, navigation }) => {

    const { eventRoom } = route.params
    const { id, status } = route.params.room
    const [ room , setRoom] = useState(status)
    const [ startTime, setstartTime ] = useState()
    const [ endTime, setendTime ] = useState()
    const [ loading, setLoading ] = useState(true)
    const [ classname, setClassName ] = useState() 
    const [ btnloading, setBtnLoading ] = useState(false)
    const [ canAdded, setCanAdded ] = useState(true)
    const now = new Date()
    
    
    const getRoom = () => {
        axios.get(`https://infinite-taiga-47087.herokuapp.com/api/room/${id}`)
        .then( (res)=>
        {
            setRoom(res.data)
            eventRoom(res.data.id,res.data.status)
            if (room.rooms_booking) endClassRoom(room.rooms_booking)
            setLoading(false)


        }
        )
        .catch((err)=>{console.log(err)})
    }
    
    useEffect(() => {
        getRoom();
        // room.rooms_booking.map((item)=> { deleteOutofRoom(item.id) })
        // var now = new Date(); // Fri Feb 20 2015 19:29:31 GMT+0530 (India Standard Time) 
        // var isoDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString();
        // console.log(isoDate)
    }, [])


    const deleteOutofRoom = (bookingId) => {
        axios.delete(`https://infinite-taiga-47087.herokuapp.com/api/bookingroom/${bookingId}`)
            .then((res)=>{
                getRoom()
                eventRoom(res.data.id,"0")

            })
            .catch((err)=>{})
    }
    const convertTime = (date) => {
        return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString();
    }

    const formatDate = ( date) => {
        let current_datetime = new Date(date)
        let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes()
        return formatted_date
    }

    const endClassRoom=(arr)=>{
        const data = arr.filter((item)=> (new Date(item.end_time) < new Date()) )
        console.log(data)
        data.map((item)=> deleteOutofRoom(item.id))
    }
    
    const onTheRoom = () => {
        let clonedData = {...room}
        clonedData.status === '1'? clonedData.status='0':clonedData.status='1';
        axios.put(`https://infinite-taiga-47087.herokuapp.com/api/room/${id}`,clonedData)
            .then((res)=>{ 
                setRoom(res.data);
                endClassRoom(res.data.rooms_booking);
            })
            .catch((err)=>{console.log(err)})
    }

    const BetweenDate = (arr,start,end) => {
        arr.forEach(element => {
            if ( ((new Date(start) > new Date(element.start_time)) || (new Date(start) < new Date(element.end_time))) ||  ((new Date(end) > new Date(element.start_time)) || (new Date(end) < new Date(element.end_time)))   ){
                setCanAdded(false)
                return Alert.alert('ไม่สามารถจองห้องในเวลานี้ได้  เนื่องจากมีคนใช้แล้ว')
            }
        });
        
    }
    const bookTheRoom = async() => {
        setBtnLoading(true)
        if (startTime > endTime) {
            setBtnLoading(false)
            return Alert.alert('เลือกวันเวลาผิด กรุณาเลือกใหม่')
        }
        if ( startTime < new Date() ||  endTime < new Date() ) {
            setBtnLoading(false)
            return Alert.alert('ไม่สามารถจองห้องในเวลาดังกล่าวได้')
        }
        // BetweenDate(room.rooms_booking,startTime,endTime);
        await BetweenDate(room.rooms_booking,startTime,endTime)
        console.log(canAdded)
        if(canAdded ){
            const dataBooking = {
                "class_name": classname,
                "start_time": startTime,
                "end_time": endTime,
                "count": 1,
                "timestamp": convertTime(new Date()),
                "room": room.id
            }
            axios.post(`https://infinite-taiga-47087.herokuapp.com/api/bookingroom`,dataBooking)
                .then((res)=>{ 
                    Alert.alert('จองสำเร็จ  โปรดรอ1นาทีเพื่อทำการเปิดไฟ')
                    getRoom();
                    setBtnLoading(false)
                })
                .catch((err)=>{
                    console.log(err);
                    Alert.alert('ไม่สามารถจองได้ กรุณาลองใหม่อีกครั้ง')
                })
        }
        setBtnLoading(false)
    }
    
    var ImageBulb = () => (room.status == '1')? require('../assets/lightbulbyellow.png'):require('../assets/lightbulb.png')
    if( loading === true  ){
        return (<ActivityIndicator size="large" color='#ff99a3' style={ {justifyContent: 'center', flex:1, }}></ActivityIndicator>)
    }
    return (
        <ScrollView    style={{ paddingTop: 10  ,flex:1}}>
            <Block flex={6} middle style={styles.container}>
                <Block flex={3}  center>
                    <Block row center flex={1}>
                        <Text h3>ห้อง</Text>
                        <Text h3 styles={{ color:'white' }}>{id}</Text>
                    </Block>
                    <Block row flex={2} style={{paddingVertical: 15}}>
                        <ImageBackground style={{ height: 180, width: 180, alignItems: 'center' ,justifyContent: 'center'  }} source={ImageBulb()} ><Text>{room.status}</Text></ImageBackground>
                    </Block>
                </Block>
                <Block flex={3} align center style={{ marginVertical: 10 }} >
                    <Block left style={{width:width*0.7}}>
                        <Input placeholder="ชื่อเรื่องการจอง" onChangeText={text=>{setClassName(text);}} color={themes.COLORS.PRIMARY} style={{ borderColor: themes.COLORS.PRIMARY }} placeholderTextColor={themes.COLORS.PRIMARY} />
                        <Text p >ช่วงเวลา</Text>
                    </Block>
                    <Block flex={1} row middle style={{ marginVertical:10, justifyContent:'space-around', maxWidth:width, width:width*0.8 }} >
                        {/* <Input value={startTime}  rounded placeholder="Start Time"  color={themes.COLORS.PRIMARY} style={{flex:1,margin:15,maxHeight: 40,width:width/3, borderColor: themes.COLORS.PRIMARY }} placeholderTextColor={themes.COLORS.PRIMARY} /> */}
                            <DatetimePickerComponent   valuepicker={ (date)=> {setstartTime(date);}} />
                            <Text h5>:</Text>
                            <DatetimePickerComponent  valuepicker={ (date)=> {setendTime(date);} } />
                        
                        
                        {/* <Input value={endTime}  rounded placeholder="End Time"  color={themes.COLORS.PRIMARY} style={{flex:1,margin:15, maxHeight:40,width:width/3, borderColor: themes.COLORS.PRIMARY }} placeholderTextColor={themes.COLORS.PRIMARY} /> */}
                    </Block>
                    <Block  style={{flex:0.5, marginVertical:10 }}>
                        { room.status ==='1' &&
                            <Button  loadingSize={'small'} size='large' onPress={ onTheRoom }> ปิดใช้งาน </Button>
                        }
                        <Button size='large'  loading={btnloading} disabled={btnloading} onPress={ bookTheRoom }>จอง</Button>
                    </Block>
                        <Block>
                            { room.rooms_booking.map((value)=>{
                                

                                    {  if(!( new Date(value.end_time) < new Date())){
                                        return (
                                        <Text>{ value.class_name } {formatDate(value.start_time)} --- {formatDate(value.end_time)}</Text>
                                        )
                                       }
                                    }
                            }) }
                        </Block>

                </Block>
                
            </Block>
        </ScrollView >
    )
}

const styles = StyleSheet.create({
    container: {
        maxWidth: width
    },
})

export default RoomsDetail
