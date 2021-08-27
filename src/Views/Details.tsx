import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import IndicatorsServices from '../services/microservices/indicators';

export const Details = ({route}) => {
    const {type} = route.params;

    const getInfo = async () => {
        try {
            const res = await IndicatorsServices.getByType(type);
            console.log(res)
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getInfo();
    }, [])

    return (
        <View style={styles.container}>
            <Text> app!</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});