import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, Text, View } from 'react-native';

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

export default function App() {
  return (
    <Container>
      <StatusBar style='auto' translucent />
      {/* <Login></Login> */}
      {/* <Cadastro/> */}
      <HomeLista />
    </Container>
  )
};

