import React from 'react';
import PropTypes from 'prop-types';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Screens/Home';
import Login from './Screens/Login';
import Rooms from './Screens/Rooms';
import RoomsDetail from './Screens/RoomsDetail'



const Stack = createStackNavigator();

export default GalioApp = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator  
            initialRouteName="Home" 
            >
            <Stack.Screen name="Login" options={{ headerTitleAlign: 'center', headerBackTitle: 'back' }}  component={Login} />
            <Stack.Screen name="Home" options={{ title: null, headerBackTitle: 'back' }}  component={Home} />
            <Stack.Screen name="Rooms" options={{ title: null, headerBackTitle: 'back' }}  component={Rooms} />
            <Stack.Screen name="RoomsDetail" options={{ title: null, headerBackTitle: 'back' }}  component={RoomsDetail} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
