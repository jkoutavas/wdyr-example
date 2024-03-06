import React from 'react';
import {GestureResponderEvent, Pressable} from 'react-native';
import {BottomTabBarButtonProps} from '@react-navigation/bottom-tabs';

type Props = {
  props: BottomTabBarButtonProps;
};
export const TabBarButton = ({props}: Props) => {
  return (
    <Pressable
      {...props}
      onPress={(
        e: GestureResponderEvent | React.MouseEvent<HTMLAnchorElement>,
      ) => {
        console.log(`${props.to}`);
        props.onPress && props.onPress(e);
      }}
    />
  );
};
TabBarButton.WhyDidYouRender = true;
