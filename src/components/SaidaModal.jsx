import { Modal, Text, TextInput, TouchableOpacity, View, ImageBackground, Image, FlatList, TouchableWithoutFeedback } from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
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
      axios.get("http://10.105.80.130:8080/carros")
      .then(res => setCarros(res.data))
      .catch(err => console.error("Erro ao carregar carros: ", err));
    }
  }, [visible]);

  const handleConfirm = async () => {
    // const p = placa.trim();
    if (!placa) return;

    try{
      const response = await axios.put("http://10.0.2.2:8080/api/veiculos/saida", {placa});

      setUltimaSaida(response.data.dados);
      onConfirm?.(placa);
    }
    catch (error) {
      console.error("Erro ao liberar saída: ", error);
    }
    // const carro = carros.find(c => c.placa === carro);
    // if (!carro) return; 
    
    // axios.post("/saida", (rew, res) =>{ }

 

    // const agora = new Date();
    // const dataSaida = agora.toLocaleDateString();
    // const horaSaida = agora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // const [dia, mes, ano] = carro.data.split('/');
    // const [hora, minuto] = carro.hora.split(':');

    // const entrada = new Date(ano, mes - 1, dia, hora, minuto);

    // const diffHoras = Math.ceil((agora - entrada) / 1000 / 60 / 60);
    // const preco = diffHoras * 10;

    // setUltimaSaida({
    //   placa: p,
    //   dataEntrada: carro.data,
    //   horaEntrada: carro.hora,
    //   dataSaida,
    //   horaSaida,
    //   preco
    // });


    // setPlaca('');
    // setSuccess(true);
    // onConfirm(p);
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
                    <SuccessText>Hora: {ultimaSaida.horaEntrada}</SuccessText>
                    <SuccessText>Saida: {ultimaSaida.dataSaida}</SuccessText>
                    <SuccessText>Hora: {ultimaSaida.horaSaida}</SuccessText>
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

