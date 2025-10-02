import { Dimensions } from 'react-native';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font';
import styled from 'styled-components/native';
import api from '../../api.js';

import backgroundImage from '../assets/mobileBg.png'
import InputProps from '../components/Input.jsx';
import InputPropsSecure from '../components/InputSecure.jsx';
import Button from '../components/Button.jsx'

const { width, height } = Dimensions.get('window');

const CadastroContainer = styled.ImageBackground`
  flex: 1;
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

export default function Cadastro() {
  const [loaded, setLoaded] = useState(false);
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [email, setEmail] = useState('');
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

  const handleCadastro = async () => {
    if (!nome || !senha || !email) {
      setErro("Preencha todos os campos");
      return;
    }
    try {
      setCarregando(true);
      setErro('');

      const response = await api.post("auth/register", {
        nome: nome,
        senha: senha,
        email: email
      });

      console.log("Cadastro OK:", response.data);

      navigation.navigate("Login");

    } catch (e) {
      console.error("Erro no cadastro:", e.response?.data || e.message);
      setErro("Erro ao cadastrar, tente novamente.");
    } finally {
      setCarregando(false);
    }
  };


  return (
    <CadastroContainer source={backgroundImage} resizeMode='cover'>
      <Texto>Cadastro</Texto>
      <InputContainer>
        <InputProps placeholder="nome" value={nome} onChangeText={setNome} />
        <InputPropsSecure placeholder="Senha" value={senha} onChangeText={setSenha} />
        <InputProps placeholder="Email" value={email} onChangeText={setEmail} />
        <InputProps placeholder="Login" value={login} onChangeText={setLogin} />
        <InputPropsSecure placeholder="Senha" value={senha} onChangeText={setSenha} />
        <InputProps placeholder="Email" value={email} onChangeText={setEmail} />
      </InputContainer>

      <ButtonWrapper>
        <Button texto="Concluir"/>
        <Button texto="Voltar" /*onPress={()=> navigation.navigate('Login')}*/ />
      </ButtonWrapper>


    </CadastroContainer>
  )
};


