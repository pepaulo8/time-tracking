import { StyleSheet } from "react-native";
import commonStyles from "../commonStyles";

export default StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      paddingHorizontal: '5%',
      backgroundColor: '#ffffff'
    },
    containerLogo: {
      flex: 3,
      justifyContent: 'flex-end',
      alignItems: 'center',
      //backgroundColor: 'blue'
    },
    imgLogo: {
      width: 160,
      height: 155,
    },
    containerLogin: {
      flex: 5,
      justifyContent: 'center',
      //backgroundColor: 'green',
      marginBottom: '15%',
    },
    btnLogin: {
      backgroundColor: commonStyles.colors.primary,
      borderRadius: 15,
      width: '90%',
      height: 45,
      marginTop: 20,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
    },
    btnTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#FFFFFF'
    },
    msgError: {
      fontSize: 18,
      fontWeight: 'bold',
      color: commonStyles.colors.txtError,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
    },
    titleForm: {
      color: commonStyles.colors.secondary,
      fontSize: 24,
      fontWeight: 'bold',
      alignSelf: 'center',
      marginBottom: 25
    }
  });