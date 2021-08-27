import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Cards } from '../Views/Cards';
import { Home } from '../Views/Home';
import { Details } from '../Views/Details';

const Stack = createStackNavigator();

export const Routes = () => {
    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#2c65c9',
                },
                headerTintColor: '#2c65c9',
                headerTitleAlign: 'center',
                headerBackTitleStyle: {
                    color: 'white',
                    fontWeight: 'bold',
                },
            }}
        >
            <Stack.Screen
                name="Home"
                component={Home}
            />
            <Stack.Screen
                name="Detail"
                component={Details}
            />
            <Stack.Screen
                name="Cards"
                component={Cards}
                options={{
                    headerShown: false,
                    gestureDirection: 'vertical',
                }}
            />

        </Stack.Navigator>
    )
}