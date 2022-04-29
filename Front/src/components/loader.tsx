import React from 'react';
import { ActivityIndicator, Text, View , StyleSheet} from 'react-native';
import styles from './styles';

const Loader: React.FC = () => {

  return (
    <View style={styles.LoaderView}>
      <ActivityIndicator size='large' color='black' />
      <Text style={styles.LoaderText}>Loading...</Text>
    </View>
  );
}

export default Loader;
