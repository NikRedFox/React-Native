import { Modal, Text, TextInput, TouchableOpacity, View, ImageBackground, Image, FlatList, TouchableWithoutFeedback } from "react-native";
import { useState, useEffect } from "react";
import * as Font from 'expo-font';
import styled from "styled-components/native";
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
  height: 700px;
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
  /* background-color: rgba(227,183,121,0.12); */
  /* border: 1px solid #E3B779; */
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

export default function ModalSaida({ visible, onConfirm, onCancel, carros = [] }) {
  const [placa, setPlaca] = useState('');
  const [showSuccess, setSuccess] = useState(false);
  const [ultimaSaida, setUltimaSaida] = useState({
    placa: '',
    dataEntrada: '',
    horaEntrada: '',
    dataSaida: '',
    horaSaida: '',
    preco: 0
  });

  useEffect(() => {
    if (!visible) {
      setPlaca("");
      setSuccess(false);
      // setUltimaSaida(null);
    }
  }, [visible]);

  useEffect(() => {
    Font.loadAsync({
      'ParkLaneNF': require('../assets/font/ParkLaneNF.ttf'),
      'Milonga': require('../assets/font/Milonga.ttf')
    });
  }, []);

  const handleConfirm = () => {
    const p = placa.trim();
    if (!p) return;

    const carro = carros.find(c => c.placa === p);
    if (!carro) return;

    const agora = new Date();
    const dataSaida = agora.toLocaleDateString();
    const horaSaida = agora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const entrada = new Date(`${carro.data} ${carro.hora}`);

    const diffHoras = Math.ceil((agora - entrada) / 1000 / 60 / 60);
    const preco = diffHoras * 10;

    setUltimaSaida({
        placa: p,
        dataEntrada: carro.data,
        horaEntrada: carro.hora,
        dataSaida,
        horaSaida,
        preco
    });

    
    // onConfirm(p);
    setPlaca('');
    setSuccess(true);
  }


  return (
    <Modal transparent={true} visible={visible} animationType='slide' statusBarTranslucent={true}>
      <TouchableWithoutFeedback onPress={onCancel}>
        <ModalContainer>
          <ModalContent>
            <ModalBg source={upperDetail} resizeMode="cover" />

            <InputWrapper>
              <TextModal>Saida</TextModal>
              <InputProps placeholder="Placa" value={placa} onChangeText={setPlaca} />
              <Button texto="Checkout" onPress={handleConfirm}></Button>              
              {ultimaSaida.placa !== '' && (
                <SuccessBox>
                  <SuccessText>Checkout concluido</SuccessText>
                  <Divisoria source={divisoria} />
                  <SuccessText>Placa: {ultimaSaida.placa}</SuccessText>
                  <SuccessText>Entrada: {ultimaSaida.dataEntrada}</SuccessText>
                  <SuccessText>Hora: {ultimaSaida.horaEntrada}</SuccessText>
                  <SuccessText>Saida: {ultimaSaida.dataSaida}</SuccessText>
                  <SuccessText>Hora: {ultimaSaida.horaSaida}</SuccessText>
                  <SuccessText>Preço: {ultimaSaida.preco}</SuccessText>
                  <Divisoria source={divisoria} />
                </SuccessBox>
              ) }
            </InputWrapper>

          </ModalContent>
        </ModalContainer>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

