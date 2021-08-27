import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './src/Routes/RootNavigation';
import { NativeBaseProvider } from 'native-base';
import {Routes} from './src/Routes/Routes';

StatusBar.setBarStyle('dark-content');

export default function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <NativeBaseProvider>
        <Routes />
      </NativeBaseProvider>
    </NavigationContainer>
  );
};

