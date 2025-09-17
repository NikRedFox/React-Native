import { Modal, Text, TextInput, TouchableOpacity, View, ImageBackground, TouchableWithoutFeedback } from "react-native";
import { useState } from "react";
import styled from "styled-components/native";
import upperDetail from '../assets/upperDetail.png';
import InputProps from "./Input";

const ModalContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  background-color: rgba(183, 176, 159, 0.75);
  /* margin-bottom: 180px; */
  /* height: 80%;
  align-self: stretch;
  width: 100%; */
  
`;

const ModalContent = styled.View`
  width: 80%;
  height: 90%;
  bottom: 0;
  /* padding: 20px; */
  background-color: #1c1c1c;
  border-radius: 12px;
  align-items: center;
`;


const TextModal = styled.Text`
  color: #E3B779;
  font-size: 35px;

`

const ModalBg = styled.ImageBackground`
  align-items: center;
  width: 100%;
  background-image: cover;  
`

export default function ModalEntrada({visible, onConfirm, onCancel}){
    const [placa, setPlaca] = useState('');    

    const handleConfirm = () =>{
        onConfirm(placa);
        setPlaca('');
    }

    return(      
      <Modal transparent={true} visible={visible} animationType ='slide' statusBarTranslucent={true}>          
        <TouchableWithoutFeedback onPress={onCancel}>
          <ModalContainer>
              <TouchableWithoutFeedback onPress={()=>{}}>
                <ModalContent>
                  <ModalBg source={upperDetail} resizeMode="cover">
                    <TextModal>Registrar Entrada</TextModal>
                    <InputProps placeholder="Placa" value={placa} onChangeText={setPlaca} />
                    <TouchableOpacity onPress={handleConfirm}><TextModal>Confirmar</TextModal></TouchableOpacity>
                    <TouchableOpacity onPress={onCancel}><TextModal>Cancelar</TextModal></TouchableOpacity>
                  </ModalBg>                                    
                </ModalContent> 
              </TouchableWithoutFeedback>
          </ModalContainer>
        </TouchableWithoutFeedback>                             
      </Modal>        
    )
}

