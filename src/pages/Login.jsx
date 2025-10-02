import { Dimensions } from 'react-native';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';    
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Font from 'expo-font';

import backgroundImage from '../assets/mobileBg.png'
import Divisoria from '../components/Divisoria.jsx';
import InputProps from '../components/Input.jsx';
import InputPropsSecure from '../components/InputSecure.jsx';
import Button from '../components/Button.jsx'
import api from '../../api.js';

const { width, height } = Dimensions.get('window');

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

export default function Login() {
  const [loaded, setLoaded] = useState(false);
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');
  const navigation = useNavigation();     

  useEffect(() => {
    Font.loadAsync({
      'ParkLaneNF': require('../assets/font/ParkLaneNF.ttf'),
      'Milonga': require('../assets/font/Milonga.ttf')
    }).then(() => setLoaded(true));
  }, []);

  if (!loaded) return null;

  const handleLogin = async ()=> {
    if (!login || !senha){
      setErro("Preencha login e senha");
      return;
    }

    try{
      setCarregando(true);
      setErro('');
      
      const response = await api.post("auth/login", {
        username: email,
        senha: senha
      });

      const token = response.data.token;

      console.log("Token recebido: ", token); 

      navigation.replace("HomeLista");  
    }

    catch(e){
      console.error(e);
      setErro("Login ou senha incorretos");
    }

    finally{
      setCarregando(false);
    }
  }

  return (
    <LoginContainer source={backgroundImage} resizeMode='cover'>
      <Texto>Estacionamento Golden Flex</Texto>
      <InputContainer>
        <InputProps 
          placeholder="Login" 
          value={login} 
          onChangeText={setLogin}
        />
        <InputPropsSecure 
          placeholder="Senha" 
          value={senha} 
          onChangeText={setSenha} 
        />
        {erro ? <Texto style={{fontSize: 16, marginBottom: 10}}>{erro} </Texto> : null}
      
      </InputContainer>

      <Button 
        texto={carregando ? "Aguarde..." : "Entrar"} 
        onPress={handleLogin}  
      />
      <Divisoria /> 
      <Button texto="Cadastro" />

    </LoginContainer>
  )
};


