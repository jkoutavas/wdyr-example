import React, {useCallback, useState} from 'react';
import {Button, SafeAreaView, StyleSheet, Text, TextStyle} from 'react-native';

const ChildComponent = React.memo((props: TextStyle) => (
  <Text {...props}>test</Text>
));

export const HomeScreen = () => {
  const [counter, setCounter] = useState(1);
  const handleClick = useCallback(
    function () {
      setCounter(counter + 1);
    },
    [counter],
  );

  console.log('@@@ HomeScreen');
  return (
    <SafeAreaView>
      <Text style={styles.text}>Home Screen</Text>
      <Button
        onPress={handleClick}
        title={`tap to increase count ${counter}`}
      />
      <ChildComponent props={{style: {fontWeight: 'bold'}}} />
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

HomeScreen.WhyDidYouRender = true;
