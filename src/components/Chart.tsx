import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { View, Dimensions} from 'react-native';
import {LineChart} from 'react-native-chart-kit'

export const ChartItem = (props: any) => {
    const [line, setLine] = useState(undefined);
    const data = props.data.slice(0, 10).sort(function(a,b){
        return new Date(a.fecha) - new Date(b.fecha);
    });

    useEffect(() => {
        if (data.length > 0) {
            let labels = []
            let info = [];
            data.forEach(element => {
                labels.push(moment(element.fecha).format('D[/]M') )
                info.push(parseInt(element.valor))
            });
            const load = {
                labels: labels,
                datasets: [
                    {
                        data: info,
                        strokeWidth: 2,
                    },
                ],
            }
            setLine(load)
        }  
    }, [])

    return (
        <View style={{marginTop: 20,}}>
            {line !== undefined && 
            <LineChart
                data={line}
                width={Dimensions.get('window').width} 
                height={400}
                yAxisLabel={'$ '}
                chartConfig={{
                    backgroundColor: '#2c65c9',
                    backgroundGradientFrom: '#2c65c9',
                    backgroundGradientTo: '#264170',
                    decimalPlaces: 2, 
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16
                    }
                }}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16
                }}
            />}
        </View>
    )
}