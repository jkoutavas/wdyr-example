import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';

export const Screen3 = () => {
  return (
    <SafeAreaView>
      <Text style={styles.text}>Screen 3</Text>
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
