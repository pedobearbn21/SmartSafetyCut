import React, {useState} from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import { Button, Text, Block, Picker  } from 'galio-framework';
import themes from './themes';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';


export default({ navigation }) => {
    const [ selectedBuilding, setSelectedBuilding] = useState(1)
    const [selectedFloor, setselectedFloor] = useState(1)
    return (
        <SafeAreaView style={styles.container}>
            <Block middle style={styles.cols}>
                <Block  style={{ width:"80%" }}>
                    <Text h6 align center>เลือกห้องที่ต้องการจะเลือกใช้</Text>
                    <Block style={{margin:10}}/>
                        <Text p>เลือกอาคาร</Text>
                        <DropDownPicker
                            items={[
                                {label: 'ICT', value: 1, icon: () => <Icon name="flag" size={18} color="#900" />},
                                {label: 'CE', value: 2, icon: () => <Icon name="flag" size={18} color="#900" />},
                                {label: 'Engineer', value: 2, icon: () => <Icon name="flag" size={18} color="#900" />},
                                {label: 'PKY', value: 2, icon: () => <Icon name="flag" size={18} color="#900" />},
                                {label: 'ตึกหมออะ', value: 2, icon: () => <Icon name="flag" size={18} color="#900" />}
                            ]}
                            defaultValue={selectedBuilding}
                            containerStyle={{height: 40}}
                            style={{backgroundColor: '#fafafa', zIndex:1}}
                            itemStyle={{
                                justifyContent: 'flex-start',
                                zIndex:1
                            }}
                            dropDownStyle={{backgroundColor: '#fafafa'}}
                            onChangeItem={item => setSelectedBuilding(item.value)}
                        />
                        <Block style={{margin:10}}/>
                        <Text p >เลือกชั้น</Text>
                        <DropDownPicker
                            items={[
                                {label: '1', value: 1, icon: () => <Icon name="flag" size={18} color="#900" />},
                                {label: '2', value: 2, icon: () => <Icon name="flag" size={18} color="#900" />},
                                {label: '3', value: 2, icon: () => <Icon name="flag" size={18} color="#900" />},
                                {label: '4', value: 2, icon: () => <Icon name="flag" size={18} color="#900" />}
                            ]}
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
                            navigation.navigate('Rooms',{ building: selectedBuilding, floor: selectedFloor })
                        }} >Submit</Button>
                </Block>

            </Block>


        </SafeAreaView>
    )
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