import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Portfolio from '../screens/Portfolio/Portfolio';
import Options from '../screens/Options/Options';
import {colors} from '../constants';
import {
  DashboardStackParamsList,
  OptionsStackParamsList,
  PortfolioStackParamsList,
  ShortcutsStackParamsList,
} from './types';
import Browser from '../screens/Browser/Browser';
import Shortcuts from '../screens/Shortcuts/Shortcuts';

const Tab = createBottomTabNavigator();

const HomeStack = createNativeStackNavigator<DashboardStackParamsList>();

function DashboardStackScreen() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Browsers">
      <HomeStack.Screen name="Browsers" component={Browser} />
    </HomeStack.Navigator>
  );
}

const PortfolioStack = createNativeStackNavigator<PortfolioStackParamsList>();

function PortfolioStackScreen() {
  return (
    <PortfolioStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Portfolios">
      <PortfolioStack.Screen name="Portfolios" component={Portfolio} />
    </PortfolioStack.Navigator>
  );
}

const OptionsStack = createNativeStackNavigator<OptionsStackParamsList>();

function OptionsStackScreen() {
  return (
    <OptionsStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Option">
      <OptionsStack.Screen name="Option" component={Options} />
    </OptionsStack.Navigator>
  );
}

const ShortcutsStack = createNativeStackNavigator<ShortcutsStackParamsList>();

function ShortcutsStackScreen() {
  return (
    <ShortcutsStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Shortcut">
      <ShortcutsStack.Screen name="Shortcut" component={Shortcuts} />
    </ShortcutsStack.Navigator>
  );
}

const Navigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarActiveTintColor: colors.secondary,
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            switch (route.name) {
              case 'Browser':
                iconName = focused ? 'globe' : 'globe-outline';
                break;
              case 'Portfolio':
                iconName = focused ? 'wallet' : 'wallet-outline';
                break;
              case 'Shortcuts':
                iconName = focused ? 'md-grid' : 'md-grid-outline';
                break;
              case 'Options':
                iconName = focused ? 'md-menu' : 'md-menu-outline';
                break;
              default:
                iconName = focused ? 'ios-home' : 'ios-home-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}>
        <Tab.Screen name="Browser" component={DashboardStackScreen} />
        <Tab.Screen name="Portfolio" component={PortfolioStackScreen} />
        <Tab.Screen name="Shortcuts" component={ShortcutsStackScreen} />
        <Tab.Screen name="Options" component={OptionsStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
