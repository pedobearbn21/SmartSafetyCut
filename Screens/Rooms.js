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


    return (
        <ScrollView>
            <Block style={ styles.col }>
                <Block style={ styles.row }>
                    <Block flex>
                        <FlatList
                            data={rooms}
                            numColumns={1}
                            renderItem={({item})=>{
                                return (
                                    
                                    <Block flex style={styles.backgroundCard}>
                                        <Block flex style={styles.cards}>
                                            <Pressable 
                                                onPress={(press)=>{ navigation.navigate('RoomsDetail',{ room:item }) }}
                                                style={({ pressed }) => [
                                                    {
                                                      backgroundColor: pressed
                                                        ? 'lightgreen': 'pink'
                                                    },
                                                    styles.wrapperCustom
                                                  ]}
                                                >
                                                <Block row style={{ alignItems:'center' }}>
                                                    <Image style={{ height: 40, width: 40 }} source={require('../assets/light-bulb.png')} />
                                                    <Text >{item.id}</Text>
                                                    <Text style={{alignItems: 'flex-end'}}>{item.status}</Text>
                                                </Block>
                                            </Pressable>
                                        </Block>
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
        backgroundColor: 'white',
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
