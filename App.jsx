import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, Text, View } from 'react-native';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './src/pages/Login';
import Cadastro from './src/pages/Cadastro';
import HomeLista from './src/pages/HomeLista';

import { useState } from 'react';
import styled from 'styled-components/native';

const Container = styled.SafeAreaView`
  flex: 1;
  display: flex;
  background-color: #151517;
`
const RootStack = createNativeStackNavigator({
  initialRouteName: 'HomeLista',
  screens: {
    // Login:  Login,
    // Cadastro: Cadastro,
    HomeLista: HomeLista
  },

  screenOptions:{
    
  }
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return (
    <Container>
      <StatusBar style='auto' translucent />
      <Navigation/>
    </Container>
  )
};

