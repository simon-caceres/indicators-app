import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, ScrollView, Dimensions, Alert, ActivityIndicator, View } from 'react-native';
import { Steps, Flex } from '@ant-design/react-native';
import { Circle } from 'native-base';
import moment from 'moment';
import { TitleContext } from '../../App';
import IndicatorsServices from '../services/microservices/indicators';

const Step = Steps.Step;
const FlexItem = Flex.Item;

export const Details = ({ route }) => {
    const { type, title } = route.params;
    const { dispatch } = useContext(TitleContext);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const getInfo = async () => {
        try {
            setLoading(true);
            const res = await IndicatorsServices.getByTypeAndYear(type);
            if (res.status === 200 || res.status === 201) {
                res.data.serie.sort((a, b) => a.fecha - b.fecha);
                setData(res.data.serie);
                setLoading(false)
            } else {
                setLoading(false)
                return Alert.alert(`Error: ${res.status}: `, 'Por favor intente denueno mas tarde')
            }

        } catch (error) {
            console.warn(error)
            setLoading(false)
            return Alert.alert(`Error: ${error?.status}: `, 'Por favor intente denueno mas tarde')
        }
    }

    useEffect(() => {
        getInfo();
        dispatch({
            type: "ADD_NEW_TITLE",
            value: `${title}`
        })
    }, [])

    return (
        <ScrollView style={styles.container}>
            {
                loading
                    ? (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator color="#2c65c9"  size="large" />
                            <Text style={{ fontWeight: 'bold', color:"#2c65c9", marginTop: 20  }} >Cargando ...</Text>
                        </View>
                        
                    )
                    : (
                        <Steps size="medium" current={1}>
                            {data.map((item, index) => (
                                <Step
                                    key={index}
                                    title={
                                        <Flex style={styles.flexStyle} justify="center">
                                            <FlexItem>
                                                <Text style={{ fontWeight: '500' }} >Fecha: {moment(item.fecha).format('DD MMM [de] YYYY')}</Text>
                                            </FlexItem>
                                            <FlexItem>
                                                <Text style={{ fontWeight: 'bold' }} >$ {item.valor}</Text>
                                            </FlexItem>
                                        </Flex>
                                    }
                                    status="finish"
                                    renderIcon={() => <Circle fill="teal.200" />}
                                />
                            ))}
                        </Steps>
                    )
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    flexStyle: {
        width: Dimensions.get('screen').width - 10,
    },
    loadingContainer: {
        paddingTop: 50,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    }
});