import React from 'react';
import { ActivityIndicator, Text, View , StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  text: {
      fontSize: 15,
      color: 'black',
      textAlign: 'center',
      paddingTop: 10,
  },
  view: {
    flex: 1,
    justifyContent: 'center'
  }
})

const Loader: React.FC = () => {

  return (
    <View style={styles.view}>
      <ActivityIndicator size='large' color='black' />
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
}

export default Loader;
