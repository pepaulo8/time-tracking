import { StyleSheet } from "react-native";
import commonStyles from "../commonStyles";

export default StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      paddingHorizontal: '5%',
      backgroundColor: '#ffffff'
    },
    containerData: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    containerResponse: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 15
    },
    containerRegister: {
      flex: 1,
      justifyContent: 'center',
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
    msgSuccess: {
      fontSize: 18,
      fontWeight: 'bold',
      color: commonStyles.colors.txtSuccess,
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
    },
    subtitleForm: {
      color: commonStyles.colors.secondary,
      fontSize: 18,
      alignSelf: 'center',
      marginBottom: 5
    },
    info: {
      fontSize: 25,
      fontWeight: 'bold',
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
    }
  });