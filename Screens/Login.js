import React from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import { Button, Text, Block, Input  } from 'galio-framework';
import themes from './themes';


export default({navigation}) => {
    return (
        <SafeAreaView style={styles.container}>
            <Block middle style={styles.cols}>
                <Block  style={{ width:"80%" }}>
                    <Text h3 style={{ flexDirection:'column', justifyContent:'center', alignItems:'center' }}>Smart Safety Cut</Text>
                    <Input rounded placeholder="Email" color={themes.COLORS.PRIMARY} style={{ borderColor: themes.COLORS.PRIMARY }} placeholderTextColor={themes.COLORS.PRIMARY} />
                    <Input rounded placeholder="password" password viewPass placeholderTextColor={themes.COLORS.PRIMARY} style={{ borderColor: themes.COLORS.PRIMARY }} />
                    <Block center>
                        <Button onPress={() => navigation.navigate('Home')} color={themes.COLORS.PRIMARY}>Submit</Button>
                    </Block>
                </Block>
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
    }
})