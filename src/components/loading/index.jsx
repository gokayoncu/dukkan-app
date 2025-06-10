import React from 'react';
import {StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
function Loading() {
  return (
    <LottieView
      source={require('../../assets/loading.json')} // Local dosya kullan!
      autoPlay
      loop
      style={styles.container}
    />
  );
}

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
