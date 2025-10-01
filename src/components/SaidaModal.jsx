import { Modal, Text, TextInput, TouchableOpacity, View, ImageBackground, Image, FlatList, TouchableWithoutFeedback } from "react-native";
import { useState, useEffect } from "react";
import api from "../../api";
import * as Font from 'expo-font';
import styled from "styled-components/native";

import upperDetail from '../assets/upperDetail.png';
import divisoria from '../assets/divisoriaLista.png';
import InputProps from "./Input";
import PickerPlaca from "./DropdownRNP";
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

export default function ModalSaida({ visible, onConfirm, onCancel}) {
  const [carros, setCarros] = useState([]);
  const [placa, setPlaca] = useState('');
  const [showSuccess, setSuccess] = useState(false);
  const [ultimaSaida, setUltimaSaida] = useState(null
    // {
    // placa: '',
    // dataEntrada: '',
    // horaEntrada: '',
    // dataSaida: '',
    // horaSaida: '',
    // preco: 0
    
  // }
  );

  useEffect(() => {
    if (!visible) {
      setPlaca("");
      setSuccess(false);
      setUltimaSaida(null
        // {
        // placa: '',
        // dataEntrada: '',
        // horaEntrada: '',
        // dataSaida: '',
        // horaSaida: '',
        // preco: 0}
      );
    }
  }, [visible]);

  useEffect(() => {
    Font.loadAsync({
      'ParkLaneNF': require('../assets/font/ParkLaneNF.ttf'),
      'Milonga': require('../assets/font/Milonga.ttf')
    });
  }, []);

  useEffect(() => {
    if(visible){
      api.get("/api/veiculos")
      .then(res => setCarros(res.data))
      .catch(err => console.error("Erro ao carregar carros: ", err));
    }
  }, [visible]);

  const handleConfirm = async () => {
    // const p = placa.trim();
    if (!placa) return;

    try{
      const response = await api.put("api/veiculos/saida", {placa});

      setUltimaSaida(response.data.dados);
      onConfirm?.(placa);
    }
    catch (error) {
      console.error("Erro ao liberar saída: ", error);
    }    
  };

  return (
    <Modal transparent={true} visible={visible} animationType='slide' statusBarTranslucent={true}>
      <TouchableWithoutFeedback onPress={onCancel}>
        <ModalContainer>
          <TouchableWithoutFeedback>
            <ModalContent>
              <ModalBg source={upperDetail} resizeMode="cover" />

              <InputWrapper>
                <TextModal>Saida</TextModal>
                <PickerPlaca
                  value={placa}
                  onValueChange={(value) => setPlaca(value)}
                  carros={carros}
                />
                <Button texto="Checkout" onPress={handleConfirm} />
                {ultimaSaida && (
                  <SuccessBox>
                    <SuccessText>Checkout concluido</SuccessText>
                    <Divisoria source={divisoria} />
                    <SuccessText>Placa: {ultimaSaida.placa}</SuccessText>
                    <SuccessText>Entrada: {ultimaSaida.dataEntrada}</SuccessText>
                    <SuccessText>Hora: {ultimaSaida.horarioEntrada}</SuccessText>
                    <SuccessText>Saida: {ultimaSaida.dataSaida}</SuccessText>
                    <SuccessText>Hora: {ultimaSaida.horarioSaida}</SuccessText>
                    <SuccessText>Preço: R$ {ultimaSaida.preco},00</SuccessText>
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

