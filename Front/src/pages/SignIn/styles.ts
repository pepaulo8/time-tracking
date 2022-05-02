import { StyleSheet } from "react-native";
import commonStyles from "../commonStyles";

export default StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      paddingHorizontal: '5%',
      backgroundColor: '#ffffff',
    },
    containerLogo: {
      flex: 4,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 50,
    },
    imgLogo: {
      width: 210,
      height: 200,
    },
    containerLogin: {
      flex: 5,
      justifyContent: 'center',
      paddingBottom: '12%',
    },
    input: {
      alignSelf: 'center',
      backgroundColor: commonStyles.input.backgroundColor,
      borderRadius: 20,
      fontSize: 18,
      marginBottom: 10,
      paddingHorizontal: 20,
      width: '90%',
      height: 45,
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
    btnSignup: {
      backgroundColor: commonStyles.colors.secondary,
      borderRadius: 15,
      width: '90%',
      height: 45,
      marginTop: 10,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
    },
    SignUpText: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 10,
      alignSelf: 'center',
      color: '#A0A0A0'
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
    }
  });