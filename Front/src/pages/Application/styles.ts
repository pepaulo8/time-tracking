import { StyleSheet } from "react-native";
import commonStyles from "../commonStyles";

export default StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      paddingHorizontal: '5%',
      // backgroundColor: '#ffffff'
    },
    containerData: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '10%',
      // backgroundColor: 'red',
    },
    containerResponse: {
      flex: 1,
      justifyContent: 'center',
      // backgroundColor: 'purple',
    },
    containerRegister: {
      flex: 1,
      justifyContent: 'center',
      marginBottom: '15%',
    },
    containerOptions: {
      flex: 1,
      justifyContent: 'center',
      // backgroundColor: 'green',
      marginBottom: '15%',
    },
    btnPrimary: {
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
    btnSecondary: {
      backgroundColor: commonStyles.colors.secondary,
      borderRadius: 15,
      width: '90%',
      height: 45,
      marginTop: 20,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
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
      color: commonStyles.colors.txtInformation,
      fontSize: 18,
      alignSelf: 'center',
      marginBottom: 5
    },
    info: {
      fontSize: 23,
      color: commonStyles.colors.txtInformation,
      fontWeight: 'bold',
      alignSelf: 'center',
    },
    btnLogout: {
      backgroundColor: commonStyles.button.logoutColor,
      borderRadius: 15,
      width: '90%',
      height: 45,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20
    },
    infoMsgError: {
      color: commonStyles.colors.txtError
    },
    imgLogo: {
      width: '85%',
      height: '60%',
    },
    titleError:{
      fontSize: 30,
      color: commonStyles.colors.txtInformation,
      fontWeight: 'bold',
      textAlign: 'center',
      width: '80%',
      marginBottom: '5%'
    },

  });