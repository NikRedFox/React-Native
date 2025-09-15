import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import styled from "styled-components/native";


const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.View`
  width: 80%;
  padding: 20px;
  background-color: #1c1c1c;
  border-radius: 12px;
  align-items: center;
`;

const ModalInput = styled.TextInput`
  width: 100%;
  border: 1px solid #E3B779;
  color: #E3B779;
  font-size: 20px;
  margin-bottom: 12px;
  padding: 10px;
`;

export default function ModalEntrada({visible, onConfirm, onCancel}){
    const [placa, setPlaca] = useState('');    
    const [modalEntradaVisible, setModalEntradaVisible] = useState(false);
    const [modalSaidaVisible, setModalSaidaVisible] = useState(false);

    const handleConfirm = () =>{
        onConfirm(placa);
        setPlaca('');
    }

    return(
        <Modal transparent={true} visible={visible} animationType ='slide' >
            <ModalContainer>
                <ModalContent>
                    <Text>Registrar Entrada</Text>
                    <ModalInput placeholder="Placa" value="{placa}" onChangeText={setPlaca} />
                    <TouchableOpacity onPress={onConfirm}><Text>Confirmar</Text></TouchableOpacity>
                    <TouchableOpacity onPress={onCancel}><Text>Cancelar</Text></TouchableOpacity>
                </ModalContent>
            </ModalContainer>
        </Modal>
    )
}

