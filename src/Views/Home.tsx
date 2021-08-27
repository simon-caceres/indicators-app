import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, ScrollView, FlatList, View, Text, ActivityIndicator } from 'react-native';
import IndicatorsServices from '../services/microservices/indicators';
import { ItemComponent } from '../components/item';

export const Home = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const firstLoad = async () => {
        try {
            const res = await IndicatorsServices.getAll()
            if (res.status === 200 || res.status === 201) {
                delete res.data.autor
                delete res.data.version
                delete res.data.fecha
                let values = [];
                for (const key in res.data) {
                    if (Object.prototype.hasOwnProperty.call(res.data, key)) {
                        const element = res.data[key];
                        values.push(element)
                    }
                }
                setData(values)
            } else {
                Alert.alert('Error de datos', 'Porfavor intente denuevo mas tarde')
            }
        } catch (error) {
            console.warn(error)
            Alert.alert('Error', 'Por favor intente denuevo mas tarde')
        }
    }

    useEffect(() => {
        firstLoad();
    }, [])

    const renderItem = ({ item }) => <ItemComponent {...item} />;

    return (
        <ScrollView  style={styles.container}>
            {
                loading
                    ? (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator color="#2c65c9" size="large" />
                            <Text style={{ fontWeight: 'bold', color: "#2c65c9", marginTop: 20 }} >Cargando ...</Text>
                        </View>

                    )
                    : (
                        <FlatList
                            data={data}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    )
            }
        </ScrollView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 5,
        paddingBottom: 15
    },
    loadingContainer: {
        paddingTop: 50,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    }
});
