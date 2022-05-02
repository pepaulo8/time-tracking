import { StyleSheet } from "react-native";

export default StyleSheet.create({
    AccordionList: {
        borderBottomColor: 'black',
        borderWidth: 1,
        
    },
    AccordionListTitle: {
        fontWeight: 'bold',
        fontSize: 20
    },
    ErrorText: {
        color: 'red',
        fontWeight: 'bold',
        fontSize: 15,
    },
    LoaderText: {
        fontSize: 15,
        color: 'black',
        textAlign: 'center',
        paddingTop: 10,
    },
    LoaderView: {
      flex: 1,
      justifyContent: 'center'
    },
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
    },
    TextHour: {
        fontSize: 18
    }

  });