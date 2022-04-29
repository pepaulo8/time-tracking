import { StyleSheet } from "react-native";
import commonStyles from "../pages/commonStyles";

export default StyleSheet.create({
    AccordionList: {
        borderBottomColor: 'black',
        borderWidth: 1,
        
    },
    AccordionListTitle: {
        fontWeight: 'bold',

    },
    ErrorText: {
        color: 'red',
        fontWeight: 'bold',
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
    }

  });