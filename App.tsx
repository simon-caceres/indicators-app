import React, { createContext, useReducer } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './src/Routes/RootNavigation';
import { NativeBaseProvider } from 'native-base';
import { Routes } from './src/Routes/Routes';

export const TitleContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_NEW_TITLE": {
      return {
        ...state,
        title: action.value
      };
    }
    default:
      return state;
  }
};

const initialState = {
  title: ''
};

const TitleContextProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <TitleContext.Provider value={{ state, dispatch }}>
      {props.children}
    </TitleContext.Provider>
  );
};

StatusBar.setBarStyle('dark-content');

export default function App() {
  return (
    <TitleContextProvider>
      <NavigationContainer ref={navigationRef}>
        <NativeBaseProvider>
          <Routes />
        </NativeBaseProvider>
      </NavigationContainer>
    </TitleContextProvider>
  );
};
