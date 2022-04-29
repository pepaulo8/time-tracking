import React from 'react';
import { List } from 'react-native-paper';
import ItemDescription from './itemDescription';
import styles from './styles';


interface register {
    date: string;
    time: string;
    type: string;
}

type PropsLR = { data: register[] }

const AccordionRegisters: React.FC<PropsLR> = ({ data }) => {

    const minutesToHours = (periodMinutesWorked: number) => {
        const hours = Math.floor((periodMinutesWorked / 60))
        const minutes = periodMinutesWorked % 60

        return `${hours}:${minutes < 10 ? '0' + minutes : minutes}`
    }
    
    const renderAccordians = (data: register[] | any[][]) => {
        const accordians = [];
        const qtdDates = Object.keys(data).length - 1;
        for (let idx = 0; idx < qtdDates; idx++) {
            let dataDay = data[idx][0]
            let overworkedDay = dataDay.overworked
            let missingRegistrationDay = dataDay.missingRegistration
            let periodHoursWorked = minutesToHours(dataDay.minutesWorked)
            accordians.push(
                <List.Accordion
                    style={[styles.AccordionList , overworkedDay ? { backgroundColor: '#25C1E8' } : false]}
                    title={dataDay.date}
                    titleStyle={styles.AccordionListTitle}
                    description={<ItemDescription 
                        periodHoursWorked={periodHoursWorked} 
                        missingRegistrationDay={missingRegistrationDay}
                        />}
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
