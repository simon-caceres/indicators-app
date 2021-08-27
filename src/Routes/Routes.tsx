import React, {useContext} from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { ArrowBackIcon} from 'native-base';
import { Cards } from '../Views/Cards';
import { Home } from '../Views/Home';
import { Details } from '../Views/Details';
import { TitleContext } from '../../App';

const Stack = createStackNavigator();

export const Routes = () => {
    const { state }: any = useContext(TitleContext);

    const optionWithOutBack = {
        headerTitle: () => (
            <View>
                <Text style={{color:'white', fontWeight: 'bold'}} > INDICADORES </Text>
            </View>
        ),
    }

    const optionWithBack = {
        headerTitle: () => (
            <View>
                <Text style={{color:'white', fontWeight: 'bold'}} > {state.title} </Text>
            </View>
        ),
        headerBackImage: () => (
            <ArrowBackIcon color={'white'} />
        ),
        gestureDirection: 'vertical',
        headerBackTitleVisible: false,
    };

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
                options={optionWithOutBack}
            />
            <Stack.Screen
                name="Detail"
                component={Details}
                options={optionWithBack}
            />
            <Stack.Screen
                name="Cards"
                component={Cards}
                options={optionWithBack}
            />

        </Stack.Navigator>
    )
}