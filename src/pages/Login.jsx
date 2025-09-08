import { Text, Image, Pressable, TouchableOpacity, View, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import backgroundImage from '../assets/mobileBg.png'
import InputProps from '../components/Input.jsx';
import InputPropsSecure from '../components/InputSecure.jsx';
import Button from '../components/Button.jsx'
import * as Font from 'expo-font';

const {width, height} = Dimensions.get('window');

const LoginContainer = styled.ImageBackground`
  flex: 1;
  /* justify-content: center; */
  align-items: center;  
`;

const Texto = styled.Text`
  color: #E3B779;
  font-size: 40px;
  padding: 90px 0px;
  text-align: center;
  font-family: 'ParkLaneNF';
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
          <InputProps placeholder="Login"/>
          <InputPropsSecure placeholder="Senha"/>
          <Button texto="Entrar" /*onPress={alert("Funcionou")}*//>
            
        </LoginContainer>
    )
};


