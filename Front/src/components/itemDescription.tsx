import React from 'react';
import { Text, View,  } from 'react-native';
import styles from './styles';

type InfoWorked = {
    periodHoursWorked: string;
    missingRegistrationDay: boolean;
}

const ItemDescription: React.FC<InfoWorked> = (props) => {

    console.log(props)
    return (
        <View>
            <Text>Hours worked: {props.periodHoursWorked}</Text>
            {props.missingRegistrationDay &&
                <Text style={styles.ErrorText}>
                    Missing registration
                </Text>
            }
        </View>
    );
}

export default ItemDescription;
