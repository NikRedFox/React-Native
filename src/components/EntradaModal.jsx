import { Modal, Text, TextInput, TouchableOpacity, View, ImageBackground, Image, FlatList, TouchableWithoutFeedback } from "react-native";
import { useState, useEffect } from "react";
import * as Font from 'expo-font';
import styled from "styled-components/native";
import api from "../../api";

import upperDetail from '../assets/upperDetail.png';
import divisoria from '../assets/divisoriaLista.png';
import InputProps from "./Input";
import Button from "./Button";

const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.75);
  
`;

const ModalContent = styled.View`
  width: 80%;
  height: 600px;
  bottom: 0;
  background-color: #1c1c1c;
  border-radius: 12px;
  align-items: center;
  position: relative;
`;


const TextModal = styled.Text`
  color: #E3B779;
  font-size: 35px;
  font-family: 'Milonga';

`

const ModalBg = styled.Image`
  align-items: center;
  width: 100%;
  height: 108px;
  position: absolute;
`

const InputWrapper = styled.View`
  align-items: center;
  margin-top: 30px;
  gap: 20px;
`

const SuccessBox = styled.View`
  margin-top: 12px;
  padding: 10px 14px;
  border-radius: 10px;
  align-items: flex-start;
  gap: 10px;
`;

const SuccessText = styled.Text`
  color: #E3B779;
  font-family: 'Milonga';
  font-size: 18px;
  text-align: center;
  padding: 5px;
`;

const Divisoria = styled.Image`
  width: 200px;
  height: 20px;
  align-self: center;
  
`;

export default function ModalEntrada({ visible, onConfirm, onCancel }) {
  const [placa, setPlaca] = useState('');
  const [showSuccess, setSuccess] = useState(false);
  const [ultimaEntrada, setUltimaEntrada] = useState(null);
  const [carregando, setCarregando] = useState(false);  

  useEffect(() => {
    if (!visible) {
      setPlaca("");
      setSuccess(false);
      setUltimaEntrada(null);
    }
  }, [visible]);

  useEffect(() => {
    Font.loadAsync({
      'ParkLaneNF': require('../assets/font/ParkLaneNF.ttf'),
      'Milonga': require('../assets/font/Milonga.ttf')
    }).then(() => setLoaded(true));
  }, []);

  const handleConfirm = async () => {
    const p = placa.trim();
    if (!p) return;
    
    try{
      setCarregando(true);
      const response = await api.post("/api/veiculos/entrada", {placa});
      setUltimaEntrada(response.data.veiculo);
      onConfirm?.();
    }
    catch (error){
      console.error("Erro ao registrar entrada: ", error);
    }
    finally{
      setCarregando(false);
      setPlaca('');
    }   
  }

  return (
    <Modal transparent={true} visible={visible} animationType='slide' statusBarTranslucent={true}>
      <TouchableWithoutFeedback onPress={onCancel}>
        <ModalContainer>
          <TouchableWithoutFeedback>
            <ModalContent>
              <ModalBg source={upperDetail} resizeMode="cover" />
              <InputWrapper>
                <TextModal>Entrada</TextModal>
                <InputProps placeholder="Placa" value={placa} onChangeText={setPlaca} normalizar />
                <Button texto={carregando ? "Espere..." : "Cadastro"} onPress={handleConfirm} disabled={carregando}></Button>
                {ultimaEntrada && (
                  <SuccessBox>
                    <SuccessText>Cadastrado com sucesso</SuccessText>
                    <Divisoria source={divisoria} />
                    <SuccessText>Placa: {ultimaEntrada.placa}</SuccessText>
                    <SuccessText>Entrada: {ultimaEntrada.dataEntrada}</SuccessText>
                    <SuccessText>Hora: {ultimaEntrada.horarioEntrada} </SuccessText>
                    <Divisoria source={divisoria} />
                  </SuccessBox>
                )}
              </InputWrapper>
            </ModalContent>
          </TouchableWithoutFeedback>
        </ModalContainer>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

