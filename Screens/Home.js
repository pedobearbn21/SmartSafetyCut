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
                    <Text h6 style={{ flexDirection:'column', justifyContent:'center', alignItems:'center' }}>เลือกห้องที่ต้องการจะเลือกใช้</Text>
                        <Text p style={{ flexDirection:'column', justifyContent:'center', alignItems:'center' }}>เลือกอาคาร</Text>
                        <DropDownPicker
                            items={[
                                {label: '1', value: 1, icon: () => <Icon name="flag" size={18} color="#900" />},
                                {label: '2', value: 2, icon: () => <Icon name="flag" size={18} color="#900" />},
                            ]}
                            defaultValue={selectedBuilding}
                            containerStyle={{height: 40}}
                            style={{backgroundColor: '#fafafa', zIndex:3}}
                            itemStyle={{
                                justifyContent: 'flex-start',
                                zIndex:3
                            }}
                            dropDownStyle={{backgroundColor: '#fafafa', zIndex:3}}
                            onChangeItem={item => setSelectedBuilding(item.value)}
                        />

                        <Text p style={{ flexDirection:'column', justifyContent:'center', alignItems:'center' }}>เลือกชั้น</Text>
                        <DropDownPicker
                            items={[
                                {label: '1', value: 1, icon: () => <Icon name="flag" size={18} color="#900" />},
                                {label: '2', value: 2, icon: () => <Icon name="flag" size={18} color="#900" />},
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
                <Button color={themes.COLORS.PRIMARY} onPress={()=>{
                            navigation.navigate('Rooms',{ building: selectedBuilding, floor: selectedFloor })
                        }}>Submit</Button>

            </Block>


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
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
    }
})