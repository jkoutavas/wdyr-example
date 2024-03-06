/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {Animated, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {
  BottomTabBarButtonProps,
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import 'react-native-devsettings';

import {NavBottomTabBar} from './src/components/NavBottomNavBar';
import {TabBarButton} from './src/components/TabBarButton';

import {HomeScreen} from './src/screens/HomeScreen';
import {Screen2} from './src/screens/Screen2';
import {Screen3} from './src/screens/Screen3';
import {NavigationContainer} from '@react-navigation/native';

type TabBarScreenRoutes = {
  HomeScreen: undefined;
  Screen2: undefined;
  Screen3: undefined;
};
const Tab = createBottomTabNavigator<TabBarScreenRoutes>();

type Props = {
  tabBarStyle?: ViewStyle;
  animationStyles?: Animated.AnimatedProps<ViewStyle>;
  initialRouteName?: keyof TabBarScreenRoutes | undefined;
};
const Tabs: React.FC<Props> = ({initialRouteName = 'HomeScreen'}) => {
  const tabBarButton = ({props}: {props: BottomTabBarButtonProps}) => {
    return <TabBarButton props={props} />;
  };

  const tabBarIcon = (focused: boolean, title: string) => {
    const tabColor = (isFocused: boolean) => (isFocused ? '#000' : '#aaa');
    return (
      <View style={styles.tabStyle}>
        <Text
          maxFontSizeMultiplier={1.2}
          numberOfLines={1}
          style={[styles.tabText, {color: tabColor(focused)}]}>
          {title}
        </Text>
      </View>
    );
  };

  const tabBarOptions = (title: string) => {
    return {
      tabBarButton: props => tabBarButton({props}),
      tabBarIcon: ({focused}) => tabBarIcon(focused, title),
    } as BottomTabNavigationOptions;
  };
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabBarItem,
        unmountOnBlur: true,
      }}
      tabBar={NavBottomTabBar}
      initialRouteName={initialRouteName}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={tabBarOptions('Home')}
      />
      <Tab.Screen
        name="Screen2"
        component={Screen2}
        options={tabBarOptions('2')}
      />
      <Tab.Screen
        name="Screen3"
        component={Screen3}
        options={tabBarOptions('3')}
      />
    </Tab.Navigator>
  );
};

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: 'transparent',
    borderTopColor: 'transparent',
    elevation: 0,
    marginBottom: 4,
  },
  tabBarItem: {
    width: 56,
    height: 56,
  },
  tabText: {
    marginTop: 4,
  },
  tabStyle: {
    width: 40,
    alignItems: 'center',
  },
});

App.WhyDidYouRender = true;
export default App;
