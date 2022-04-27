import React from 'react';
import { View, FlatList, Dimensions, Text, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window')

interface register {
    date: string;
    time: string;
    type: string; 
}

type PropsLR = { data: register[] }

const ListRegisters: React.FC<PropsLR> = ({ data }) => {

    return (
        <FlatList
            data={data}
            keyExtractor={(item) => (`${item.date}_${item.time}`)}
            showsHorizontalScrollIndicator
            style={{ margin: 35 }}
            renderItem={({ item }) => {
                return (
                    <View style={styles.itemView}>
                        <Text style={styles.itemText}>
                            Time: {item.time} | Clock {item.type}
                        </Text>
                    </View>

                )
            }}
        />
    );
}

const styles = StyleSheet.create({
    itemView: {
        backgroundColor: '#C2C2C2',
        padding: 30,
        margin: 10,
        borderRadius: 15,
        alignSelf: 'center'
    },
    itemText: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    }
})

export default ListRegisters;
