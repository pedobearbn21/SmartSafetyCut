import React, { useEffect, useState } from 'react'
import { Button, Text, Block, Picker, Card,   } from 'galio-framework';
import {StyleSheet, Dimensions, ScrollView, FlatList, Image, Pressable, Alert } from 'react-native'
import axios from 'axios';
import themes from './themes';

const { width, height } = Dimensions.get('screen');

// const a =   <Block flex style={{ padding:10 }}>
//                 <Card
                    
//                     title={`${item.id}`}
//                     caption={item.status}
//                     style={styles.card, item.status==="on"?styles.onBulb:styles.offBulb}
//                     location="Los Angeles, CA"
//                     footerStyle={ styles.backgroundCard }
//                     avatar="https://image.flaticon.com/icons/png/128/116/116338.png"
//                 />
//             </Block>

export default ({ route, navigation }) => {
    const { building, floor } = route.params
    const [ rooms, setRooms ] = useState([])
    useEffect(() => {
            axios.get(`https://api.mocki.io/v1/a7dc137e`)
            .then( (res)=>
                    {
                        setRooms(res.data.data)
                    }
                )
            .catch((err)=>{console.log(err)})
    }, [])
    var ImageBulb = (status) => (status === 'on')? require('../assets/lightbulbyellow.png'):require('../assets/lightbulb.png')

    return (
        <ScrollView>
            <Block style={ styles.col }>
                <Block style={ styles.row }>
                    <Block flex>
                        <Text h3 center style={{margin:10}}>เลือกห้อง</Text>
                        <FlatList
                            data={rooms}
                            numColumns={2}
                            renderItem={({item})=>{
                                return (
                                    
                                    
                                    <Block flex style={styles.backgroundCard}>
                                        
                                            <Pressable 
                                                onPress={(press)=>{ navigation.navigate('RoomsDetail',{ room:item }) }}
                                                style={({ pressed }) => [
                                                    pressed? {
                                                        shadowColor: "#000",
                                                        shadowOffset: {
                                                            width: 0,
                                                            height: 10,
                                                        },
                                                        shadowOpacity: 0.53,
                                                        shadowRadius: 13.97,
                                                        elevation: 1,  
                                                    }:{},
                                                    styles.wrapperCustom
                                                  ]}
                                                >
                                                        <Block flex style={styles.cards}>
                                                            <Block row style={{ alignItems:'center' }}>
                                                                <Image style={{ height: 40, width: 40 }} source={ImageBulb(item.status)} />
                                                                <Text style={{margin:15}} >{item.id}</Text>
                                                                <Text style={{alignItems: 'flex-end'}}>{item.status}</Text>
                                                            </Block>
                                                        </Block>
                                            </Pressable>
                                    </Block>
                                )
                            }}
                        />
                    </Block>
                </Block>
            </Block>
        </ScrollView>
        
    )
}

const styles = StyleSheet.create({
    cards: {
        borderRadius: 5,
        backgroundColor: 'pink',
        padding: 5,
        marginVertical: 10,
        marginHorizontal: 15
    },
    backgroundCard: {
        
    },
    onBulb: {
        backgroundColor: 'yellow'
    },
    offBulb: {
        backgroundColor: 'black'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap:'wrap'
    },
    wrapperCustom: {
        borderRadius: 8,
        padding: 6
      },
    col: {
        flexDirection: 'column',
        flex:1,
        justifyContent: 'space-around'
    }
})
