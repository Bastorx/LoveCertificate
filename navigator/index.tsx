import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { FormScreen, PresentationScreen, ThankScreen } from '../screens';
import { View } from 'react-native';
import { Text } from 'react-native-elements';

const Stack = createStackNavigator();

export const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ cardStyle: { backgroundColor: 'transparent' }, headerShown: false }}>
        <Stack.Screen name="Presentation" component={PresentationScreen} />
        <Stack.Screen name="Form" component={FormScreen} />
        <Stack.Screen name="Thank" component={ThankScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
