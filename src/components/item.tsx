import React from "react";
import { Text, View } from 'react-native';
import { Card, WhiteSpace, WingBlank, Icon } from '@ant-design/react-native';
import moment from 'moment';

declare interface IndicatorType {
    codigo: string;
    nombre: string;
    unidad_medida: string;
    fecha: Date | string;
    valor: number;
}

export const ItemComponent = (props: IndicatorType) => {
    const {codigo, nombre, unidad_medida, fecha, valor} = props;
    return (
        <View >
            <WingBlank size="sm">
                <Card style={{elevation: 4, borderRadius: 20}} >
                    <Card.Header
                        title={nombre}
                        thumbStyle={{ width: 25, height: 25 }}
                        thumb="https://mpng.subpng.com/20180703/thy/kisspng-dollar-sign-united-states-dollar-business-logo-5b3c03b4c6e403.2090603115306597648147.jpg"
                        extra={codigo}
                    />
                    <Card.Body>
                        <View style={{ height: 42 }}>
                            <Text style={{ marginLeft: 16 }}>Valor: {valor} </Text>
                            <Icon name={'barcode'} />
                        </View>
                    </Card.Body>
                    <Card.Footer
                        content={`Unidad de medida:  ${unidad_medida}  `} 
                        extra={`Fecha:  ${moment(fecha).format('DD MMM [de] YY')}  `} 
                    />
                </Card>
            </WingBlank>
            <WhiteSpace size="md" />
        </View>
    )
}
