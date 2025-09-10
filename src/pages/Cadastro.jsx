import { Dimensions } from 'react-native';
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
  font-size: 60px;
  padding: 95px 0px 65px 0px;
  text-align: center;
  font-family: 'ParkLaneNF';
`

const InputContainer = styled.View`
  margin-bottom: 40px;
  gap: 28px;
`

const ButtonWrapper = styled.View`
    gap: 28px;
`

export default function Cadastro(){
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
          <Texto>Cadastro</Texto>
          <InputContainer>
            <InputProps placeholder="Login"/>
            <InputPropsSecure placeholder="Senha"/>
            <InputProps placeholder="Email"/>
          </InputContainer>
          
          <ButtonWrapper>
            <Button texto="Concluir" /*onPress={alert("Funcionou")}*//>
            <Button texto="Voltar" /*onPress={()=> navigation.navigate('Login')}*//>
          </ButtonWrapper>
          
            
        </LoginContainer>
    )
};


