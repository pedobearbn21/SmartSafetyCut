import React, { useState, useEffect } from 'react'
import { StyleSheet, Image, ImageBackground, Dimensions } from 'react-native'
import { Block, Text, Input, Button } from 'galio-framework'
import themes from './themes'
import axios from 'axios'

const { width } = Dimensions.get('screen');

const RoomsDetail = ({ route, navigation }) => {

    const onTheRoom = () => {
        // axios.post(`bulb/${id}/changestatus`)
        //     .then((res)=>{ setStatusRoom(!statusRoom)})
        //     .catch((err)=>{console.log(err)})
        statusRoom === 'on'? setStatusRoom('off'):setStatusRoom('on')
    }
    useEffect(() => {
        return () => {
            
        }
    }, [])

    const { id, status } = route.params.room
    const [ statusRoom , setStatusRoom] = useState(status)
    var ImageBulb = () => (statusRoom === 'on')? require('../assets/lightbulb.png'):require('../assets/lightbulbyellow.png')
    return (
        <Block flex={6} middle style={styles.container}>
            <Block flex={3}  center>
                <Block row center flex={1}>
                    <Text h4>ห้อง</Text>
                    <Text h4 styles={{ color:'white' }}>{id}</Text>
                </Block>
                <Block row flex={2}>
                    <ImageBackground style={{ padding:10,height: 120, width: 120, alignItems: 'center' ,justifyContent: 'center'  }} source={ImageBulb()} ><Text>{statusRoom}</Text></ImageBackground>
                </Block>
            </Block>
            <Block flex={3}  style={{ marginVertical: 10, paddingVertical: 10 }} >
                <Text p >ช่วงเวลา</Text>
                <Block flex row >
                    <Input rounded placeholder="Start Time"  color={themes.COLORS.PRIMARY} style={{flex:1,maxHeight: 40,width:width/3, borderColor: themes.COLORS.PRIMARY }} placeholderTextColor={themes.COLORS.PRIMARY} />
                    <Input rounded placeholder="End Time"  color={themes.COLORS.PRIMARY} style={{flex:1, maxHeight:40,width:width/3, borderColor: themes.COLORS.PRIMARY }} placeholderTextColor={themes.COLORS.PRIMARY} />
                </Block>
                <Block flex >
                    <Button size='large' onPress={ onTheRoom }>Submit</Button>
                </Block>
            </Block>
        </Block>
    )
}

const styles = StyleSheet.create({
    container: {
        maxWidth: width
    },
})

export default RoomsDetail
