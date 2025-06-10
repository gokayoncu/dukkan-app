import React from 'react';
import {StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
function Error() {
  return (
    <LottieView
      source={require('../../assets/error.json')}
      autoPlay
      loop
      style={styles.container}
    />
  );
}
export default Error;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
