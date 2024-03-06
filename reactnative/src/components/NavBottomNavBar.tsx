import React, {useRef, useEffect, PropsWithChildren} from 'react';
import {Animated, Platform, StyleSheet, View} from 'react-native';
import {NavigationState} from '@react-navigation/native';
import {BottomTabBarProps, BottomTabBar} from '@react-navigation/bottom-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import {BlurView} from '@react-native-community/blur';

import {flattenParams} from '../utils';

export const TAB_BAR_HEIGHT = 64;

const GRADIENT_LOCATIONS = [0.05, 0.2, 0.3, 0.7, 1];
const GRADIENT_COLORS = [
  'rgba(245, 249, 255, 0)',
  'rgba(245, 249, 255, 0.05)',
  'rgba(245, 249, 255, 0.1)',
  'rgba(245, 249, 255, 0.5)',
  'rgba(245, 249, 255, 0.88)',
];

const VISIBLE_ANIMATION_CONFIG = {
  DURATION: 200,
  OPACITY_INTERPOLATE: {inputRange: [0, 1], outputRange: [1, 0]},
  TRANSFORM_INTERPOLATE: {
    inputRange: [0, 1],
    outputRange: [0, TAB_BAR_HEIGHT],
  },
};

const getActiveRouteParams = (route: NavigationState): object | undefined => {
  const childActiveRoute = route.routes[route.index].state as NavigationState;

  if (!childActiveRoute) {
    return route.routes[route.index].params;
  }

  return getActiveRouteParams(childActiveRoute);
};

const TabBarBackground: React.FC<PropsWithChildren> = ({children}) => {
  return Platform.OS === 'ios' ? (
    <BlurView style={styles.blurredBackground} blurType="light" blurAmount={4}>
      {children}
    </BlurView>
  ) : (
    <View style={styles.translucentTabBarBackground}>{children}</View>
  );
};
export const NavBottomTabBarComponent: React.FC<BottomTabBarProps> = props => {
  const visibleAnimation = useRef(new Animated.Value(0)).current;
  const isBarVisible = useRef(true);
  const navigationState = props.navigation.getState();
  const safeAreaInsets = useSafeAreaInsets();

  useEffect(() => {
    const activeRouteParams = getActiveRouteParams(navigationState);
    const params = flattenParams(activeRouteParams) as Record<
      string,
      string | boolean
    >;

    const isHideTabBar = params && params?.showTabBar === false;

    if (isHideTabBar && isBarVisible.current) {
      Animated.timing(visibleAnimation, {
        toValue: 1,
        duration: VISIBLE_ANIMATION_CONFIG.DURATION,
        useNativeDriver: true,
      }).start();

      isBarVisible.current = false;
    }

    if (!isHideTabBar && !isBarVisible.current) {
      Animated.timing(visibleAnimation, {
        toValue: 0,
        duration: VISIBLE_ANIMATION_CONFIG.DURATION,
        useNativeDriver: true,
      }).start();

      isBarVisible.current = true;
    }
  }, [navigationState, isBarVisible, visibleAnimation]);

  const bottomInset = safeAreaInsets.bottom > 0 ? safeAreaInsets.bottom : 8;

  return (
    <Animated.View
      style={[
        styles.tabBarContainer,
        {
          opacity: visibleAnimation.interpolate(
            VISIBLE_ANIMATION_CONFIG.OPACITY_INTERPOLATE,
          ),
          transform: [
            {
              translateY: visibleAnimation.interpolate(
                VISIBLE_ANIMATION_CONFIG.TRANSFORM_INTERPOLATE,
              ),
            },
          ],
        },
        {height: TAB_BAR_HEIGHT + bottomInset},
      ]}>
      <LinearGradient
        style={[styles.gradientBackground]}
        locations={GRADIENT_LOCATIONS}
        colors={GRADIENT_COLORS}
      />
      <TabBarBackground>
        <BottomTabBar {...props} />
      </TabBarBackground>
    </Animated.View>
  );
};

export const NavBottomTabBar = (props: BottomTabBarProps) => (
  <NavBottomTabBarComponent {...props} />
);

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    alignItems: 'center',
  },
  gradientBackground: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  blurredBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  translucentTabBarBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 24,
    paddingTop: 8,
    flexDirection: 'row',
  },
});
