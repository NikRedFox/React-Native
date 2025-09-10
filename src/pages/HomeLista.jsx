import { Dimensions, Image, TouchableOpacity, View, Text } from 'react-native';
import {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import backgroundImage from '../assets/mobileBg.png'
import split from '../assets/buttonSplit.png';
import Button from '../components/Button.jsx'
import * as Font from 'expo-font';

const {width, height} = Dimensions.get('window');

const ListaContainer = styled.ImageBackground`
  flex: 1;
  align-items: center;  
`;

const Texto = styled.Text`
  color: #E3B779;
  font-size: 60px;
  padding: 55px 0px 65px 0px;
  text-align: center;
  font-family: 'ParkLaneNF';
`

const Split = styled.Image`
`

const ButtonWrapper = styled.View`
    gap: 28px;
    display: flex;
    flex-direction: row;
`

// const BglessButton = styled.TouchableOpacity`
//   width: 100px;
//   height: 50px;
//   background-color: transparent;
// `

export default function HomeLista(){
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
      Font.loadAsync({
        'ParkLaneNF': require('../assets/font/ParkLaneNF.ttf'),
        'Milonga': require('../assets/font/Milonga.ttf')
      }).then(() => setLoaded(true));
    }, []);

    if (!loaded) return null;
  
    return(
         <ListaContainer source ={backgroundImage} resizeMode='cover'>
                  <Texto>Estacionamento Golden Flex</Texto>
                  
                  
                  <Button texto="Entrar" /*onPress={alert("Funcionou")}*//>
                  <Button texto="Cadastro"/>
                    
                </ListaContainer>
    )
};


