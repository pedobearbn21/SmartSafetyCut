import React, {useState,useEffect} from 'react'
import { SafeAreaView, StyleSheet, View, Alert, ActivityIndicator } from 'react-native'
import { Button, Text, Block, Picker  } from 'galio-framework';
import themes from './themes';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';
import axios from 'axios';


export default({ navigation }) => {
    const [ loading, setLoading ] = useState(true)
    const [ ArrBuilding, setArrBuilding ] = useState([])
    const [ ArrFloor, setArrFloor ] = useState([])
    const [ selectedBuilding, setSelectedBuilding] = useState()
    const [selectedFloor, setselectedFloor] = useState()
    
    useEffect(() => {
        axios.get(`https://infinite-taiga-47087.herokuapp.com/api/building`)
            .then( (res)=>
                    {
                        const data  = res.data.map((e,index)=> { 
                            return  {"label": e.building_name, "value": index+1,"id": e.id, "icon": () => <Icon name="flag" size={18} color="#900" />}
                        })
                        setArrBuilding(data)
                    }
                    )
            .catch((err)=>{console.log(err)})
        // axios.get(`https://infinite-taiga-47087.herokuapp.com/api/floor/${2}`)
        //     .then( (res)=>
        //         {
        //             const data = res.data.map((e,index)=> { 
        //                 return {"label": e.floor_name, "value": index+1, "icon": () => <Icon name="flag" size={18} color="#900" />}
        //             })
        //             setArrFloor(data)
        //         }
        //     )
        //     .catch((err)=>{console.log(err)})
        setLoading(false);
    }, [])


    useEffect(() => {
    }, [selectedBuilding])
    
    const changeFloor = (val) => {
        setLoading(true)
        console.log(val)
        axios.get(`https://infinite-taiga-47087.herokuapp.com/api/floor/${ArrBuilding[val-1].id}`)
        .then( (res)=>
                {
                    const data = res.data.map((e,index)=> { return {"label": e.floor_name, "value": index+1, "id": e.id, "icon": () => <Icon name="flag" size={18} color="#900" />}})
                    setArrFloor(data)
                }
            )
        .catch((err)=>{console.log(err)})
        setSelectedBuilding(val)
        setLoading(false)
    }
    if( loading === true  ){
        return (<ActivityIndicator size="large" color='#ff99a3' style={ {justifyContent: 'center', flex:1, }}></ActivityIndicator>)
    }else {
        return (
        <SafeAreaView style={styles.container}>
            <Block middle style={styles.cols}>
                <Block  style={{ width:"80%" }}>
                    <Text h6 align center>เลือกห้องที่ต้องการจะเลือกใช้</Text>
                    <Block style={{margin:10}}/>
                    <Text p>เลือกอาคาร</Text>
                        <DropDownPicker
                            items={ArrBuilding}
                            defaultValue={selectedBuilding}
                            containerStyle={{height: 40}}
                            style={{backgroundColor: '#fafafa', zIndex:1}}
                            itemStyle={{
                                justifyContent: 'flex-start',
                                zIndex:1
                            }}
                            dropDownStyle={{backgroundColor: '#fafafa'}}
                            onChangeItem={item => changeFloor(item.value)}
                            />
                        <Block style={{margin:10}}/>
                        <Text p >เลือกชั้น</Text>
                        <DropDownPicker
                            items={ArrFloor}
                            defaultValue={selectedFloor}
                            containerStyle={{height: 40}}
                            style={{backgroundColor: '#fafafa', zIndex:2}}
                            itemStyle={{
                                justifyContent: 'flex-start',
                                zIndex:2
                            }}
                            dropDownStyle={{backgroundColor: '#fafafa', zIndex:2}}
                            onChangeItem={item => setselectedFloor(item.value)}
                        />

                </Block>
                <Block style={{margin:10}}/>
                <Block style={{zIndex:-1}}>
                <Button color={themes.COLORS.PRIMARY} onPress={()=>{
                            navigation.navigate('Rooms',{ building: selectedBuilding, floor: ArrFloor[selectedFloor-1].id })
                        }} >Submit</Button>
                </Block>

            </Block>


        </SafeAreaView>
    )
}
}

const styles = StyleSheet.create({
    container: {
        flex:1
    },
    cols: {
        flexDirection: 'column',
        flex:5,
        alignItems:'center'
    },
    shadow: {
        shadowOpacity: 1,
        shadowColor: 'black',
        borderColor: 'black'
    },
})