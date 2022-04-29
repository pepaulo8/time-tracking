import React from 'react';
import { View, FlatList, Dimensions, Text, StyleSheet } from 'react-native';
import { List } from 'react-native-paper';

const { width } = Dimensions.get('window')

interface register {
    date: string;
    time: string;
    type: string;
}

type PropsLR = { data: register[] }

const AccordionRegisters: React.FC<PropsLR> = ({ data }) => {

    const minutesToHours = (periodMinutesWorked: number) => {
        const hours = Math.floor((periodMinutesWorked/60))
        const minutes = periodMinutesWorked % 60

        return `${hours}:${minutes < 10 ? '0' + minutes : minutes}`
    }

    const renderAccordians = (data: register[] | any[][]) => {
        const accordians = [];
        const qtdDates = Object.keys(data).length - 1;
        for (let idx = 0; idx < qtdDates; idx++) {
            let dataDay = data[idx][0]
            let overworkedDay = dataDay.overworked
            let periodHoursWorked = minutesToHours(dataDay.minutesWorked)
            accordians.push(
                <List.Accordion
                    style={overworkedDay ? { backgroundColor: 'red' } : false}
                    title={dataDay.date}
                    description={periodHoursWorked}
                    right={() => (
                        <Text>R</Text>
                    )}
                    id={idx + 1}
                    key={idx + 1}
                >
                    {renderListItem(dataDay)}
                </List.Accordion>
            );
        }
        return accordians;
    }

    const renderListItem = (dataDay: { registers: string | any[]; date: any; }) => {
        const items = [];

        for (let r = 0; r < dataDay.registers.length; r++) {
            items.push(
                <List.Item
                    key={`${dataDay.date}_${dataDay.registers[r].time} `}
                    title={dataDay.registers[r].time}
                    description={dataDay.registers[r].type}
                />
            );
        }
        return items;
    }

    return (
        <List.AccordionGroup>
            {renderAccordians(data)}
        </List.AccordionGroup>
    );
}


export default AccordionRegisters;
