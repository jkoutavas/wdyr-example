import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';

export const HomeScreen = () => {
  return (
    <SafeAreaView>
      <Text style={styles.text}>Home Screen</Text>
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
