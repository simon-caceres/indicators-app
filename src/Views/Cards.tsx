import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, Alert, ActivityIndicator } from 'react-native';
import { Flex } from '@ant-design/react-native';
import moment from 'moment';

import { TitleContext } from '../../App';
import IndicatorsServices from '../services/microservices/indicators';

import { ChartItem } from '../components/Chart';

const FlexItem = Flex.Item;

export const Cards = ({ route }) => {
    const { codigo, nombre, unidad_medida, fecha, valor } = route.params;
    const { dispatch } = useContext(TitleContext);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const getInfo = async () => {
        try {
            setLoading(true);
            const res = await IndicatorsServices.getByTypeAndYear(codigo);
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
            value: `${nombre}`
        })
    }, [])

    return (
        <View style={styles.container}>
            {
                loading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator color="#2c65c9" size="large" />
                        <Text style={styles.loadingText} >Cargando ...</Text>
                    </View>
                ) : (
                    <>
                        <Text style={styles.title}>
                            $ {valor}
                        </Text>
                        <Flex justify="center" align="center" >
                            <FlexItem style={{ width: '100%', alignSelf: 'center', marginLeft: 20 }}>
                                <Text style={styles.infoText} >Nombre</Text>
                                <Text style={styles.infoText} >Fecha</Text>
                                <Text style={styles.infoText} >Unidad de Medida</Text>
                            </FlexItem>
                            <FlexItem>
                                <Text style={styles.infoText} >{nombre}</Text>
                                <Text style={styles.infoText} >{moment(fecha).format('DD MMM [de] YYYY')}</Text>
                                <Text style={styles.infoText} >{unidad_medida}</Text>
                            </FlexItem>
                        </Flex>
                        <ChartItem data={data} />
                    </>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 10,
    },
    loadingContainer: {
        paddingTop: 50,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    },
    loadingText: {
        fontWeight: 'bold',
        alignSelf: 'center',
        color: "#2c65c9",
        marginTop: 20
    },
    infoText: {
        fontWeight: 'bold',
        color: "#606066",
        marginTop: 20
    },
    title: {
        fontWeight: 'bold',
        color: "#2c65c9",
        fontSize: 30,
    }
});