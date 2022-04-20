import { StackNavigationOptions } from '@react-navigation/stack';

const loginOptions: StackNavigationOptions = {
        headerStyle: {
            backgroundColor: '#F1F5F4',
          },
        headerTintColor: '#139DBF',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 24,
          //fontFamily: Roboto
        },
        headerTitleAlign: 'center'
}

const signupOptions:StackNavigationOptions = {
    headerStyle: {
        backgroundColor: '#F1F5F4',
      },
    headerTintColor: '#139DBF',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 24,
    },
    headerTitleAlign: 'center'
  }

export default {
    Login: {
        options: loginOptions
    },
    SignUp: {
        options: signupOptions
    }
}