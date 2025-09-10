import { Text, Image, Pressable, TouchableOpacity, View, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import backgroundImage from '../assets/mobileBg.png'
import InputProps from '../components/Input.jsx';
import InputPropsSecure from '../components/InputSecure.jsx';
import Button from '../components/Button.jsx'
import * as Font from 'expo-font';
import Divisoria from '../components/Divisoria.jsx';

const {width, height} = Dimensions.get('window');

const LoginContainer = styled.ImageBackground`
  flex: 1;
  /* justify-content: center; */
  align-items: center;  
`;

const Texto = styled.Text`
  color: #E3B779;
  font-size: 39px;
  padding: 80px 0px;
  text-align: center;
  font-family: 'ParkLaneNF';
`

const InputContainer = styled.View`
  margin-bottom: 55px;
`

export default function Login(){
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
      Font.loadAsync({
        'ParkLaneNF': require('../assets/font/ParkLaneNF.ttf'),
        'Milonga': require('../assets/font/Milonga.ttf')
      }).then(() => setLoaded(true));
    }, []);

    if (!loaded) return null;
  
    return(
        <LoginContainer source ={backgroundImage} resizeMode='cover'>
          <Texto>Estacionamento Golden Flex</Texto>
          <InputContainer>
            <InputProps placeholder="Login"/>
            <InputPropsSecure placeholder="Senha"/>
          </InputContainer>
          
          <Button texto="Entrar" /*onPress={alert("Funcionou")}*//>
          <Divisoria/>
          <Button texto="Cadastro"/>
            
        </LoginContainer>
    )
};


