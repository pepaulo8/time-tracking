import React from 'react';
import { Text, View,  } from 'react-native';
import styles from './styles';

type InfoWorked = {
    periodHoursWorked: string;
    missingRegistrationDay: boolean;
}

const ItemDescription: React.FC<InfoWorked> = (props) => {

    return (
        <View>
            <Text style={styles.TextHour}>Hours worked: {props.periodHoursWorked}</Text>
            {props.missingRegistrationDay &&
                <Text style={styles.ErrorText}>
                    Missing registration
                </Text>
            }
        </View>
    );
}

export default ItemDescription;
