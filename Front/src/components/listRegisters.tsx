import React from 'react';
import { View, FlatList, Dimensions, Text} from 'react-native';

const { width } = Dimensions.get('window')

const ListRegisters: React.FC = ({data} :any) => {

  return (
    <FlatList
        data={data}
        keyExtractor={(item) => (`${item.date}_${item.time}`)}
        showsHorizontalScrollIndicator
        style={{
            alignContent: 'center'
        }}
        renderItem={({item}) => {
            return (
                <View
                    style={{
                        backgroundColor: '#C2C2C2',
                        height: width/ 8,
                        width: width * 0.8,
                        marginVertical: 10,
                        borderRadius: 15,
                        alignItems: 'center',
                        justifyContent: 'center',
                        alignSelf: 'center'
                        
                    }}
                >
                <Text style={{
                    textAlign: 'center',
                    fontSize: 18,
                    fontWeight: 'bold',
                }}
                > 
                Time: {item.time} | Clock {item.type}
                </Text>
                </View>
                    
            )
        }}
    />
  );
}

export default ListRegisters;
