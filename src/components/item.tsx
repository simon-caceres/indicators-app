import React from "react";
import { Text, View } from 'react-native';
import { InfoOutlineIcon, Button } from 'native-base';
import { Card, WhiteSpace, WingBlank, Flex } from '@ant-design/react-native';
import { useNavigation } from "@react-navigation/core";
import { RightIcon } from "./RightIcon";

import moment from 'moment';

declare interface IndicatorType {
    codigo: string;
    nombre: string;
    unidad_medida: string;
    fecha: Date | string;
    valor: number;
}

const FlexItem = Flex.Item;

export const ItemComponent = (props: IndicatorType) => {
    const { codigo, nombre, unidad_medida, fecha, valor } = props;
    const navigation = useNavigation();
    return (
        <View >
            <WingBlank size="sm">
                <Card style={{ elevation: 4, borderRadius: 20 }} >
                    <Card.Header
                        title={nombre}
                        thumbStyle={{ width: 25, height: 25 }}
                        thumb="https://mpng.subpng.com/20180703/thy/kisspng-dollar-sign-united-states-dollar-business-logo-5b3c03b4c6e403.2090603115306597648147.jpg"
                        extra={codigo}
                    />
                    <Card.Body>
                        <View style={{ height: 30, marginTop: 10, marginBottom: 10 }}>
                            <Flex justify="center">
                                <FlexItem style={{ paddingLeft: 4, paddingRight: 4 }}>
                                    <Text style={{ marginLeft: 16 }}>Valor: {valor} </Text>
                                </FlexItem>
                                <FlexItem style={{ paddingLeft: 4, paddingRight: 4 }} />
                                <FlexItem >
                                    <Flex align="end" justify="end">
                                        <FlexItem style={{ alignSelf: 'flex-start' }} >
                                            <Button
                                                onPress={() => navigation.navigate('Cards', {...props})}
                                                startIcon={<InfoOutlineIcon color="blue.300" size={5} />}
                                                size="xs"
                                                variant="link"
                                            />
                                        </FlexItem>
                                        <FlexItem >
                                            <Button
                                                onPress={() => navigation.navigate('Detail', {type: codigo, title: nombre})}
                                                startIcon={<RightIcon />}
                                                size="xs"
                                                variant="link"
                                            />
                                        </FlexItem>
                                    </Flex>
                                </FlexItem>
                            </Flex>
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
