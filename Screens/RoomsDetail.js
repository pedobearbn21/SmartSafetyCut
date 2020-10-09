import React from 'react'
import { Text, StyleSheet } from 'react-native'
import { Block } from 'galio-framework'

const RoomsDetail = ({ route, navigation }) => {
    const { id, status } = route.params.room
    console.log(id, status)
    return (
        <Block flex style={styles.container}>
            <Text styles={{ color:'white' }}>{id}</Text>
            <Text>{status}</Text>
        </Block>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'pink'
    },
})

export default RoomsDetail
