import React from 'react';
import { View, FlatList, Text } from 'react-native';
import styles from './styles';

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
            showsVerticalScrollIndicator
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

export default ListRegisters;
