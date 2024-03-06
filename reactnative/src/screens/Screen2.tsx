import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';

export const Screen2 = () => {
  return (
    <SafeAreaView>
      <Text style={styles.text}>Screen 2</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 23,
    textAlign: 'center',
    marginTop: 50,
  },
});
