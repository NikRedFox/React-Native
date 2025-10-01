import { Dimensions, Image, TouchableOpacity, View, Text, FlatList, Modal } from 'react-native';
import { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import * as Font from 'expo-font';
import api from '../../api.js';

import backgroundImage from '../assets/mobileBg.png'
import split from '../assets/buttonSplit.png';
import divisoria from '../assets/divisoriaLista.png';
import ModalEntrada from '../components/EntradaModal.jsx';
import ModalSaida from '../components/SaidaModal.jsx';

const { width, height } = Dimensions.get('window');

const ListaContainer = styled.ImageBackground`
  flex: 1;
  align-items: center;  
`;

const Texto = styled.Text`
  color: #E3B779;
  font-size: 60px;
  padding: 55px 0px 6px 0px;
  text-align: center;
  font-family: 'ParkLaneNF';
`

const Split = styled.Image`
`

const Divisoria = styled.Image`
  width: 90%;
  display: flex;
  align-self: center;
`

const Card = styled.View`
  padding: 16px;
  margin: 8px 16px;
  border-radius: 12px;
  /* border: 1px solid #292725; */
  gap: 10px;
`

const Placa = styled.Text`
  color: #E3B779;
  font-size: 25px;
  font-family: 'Milonga';
`

const Info = styled.Text`
  color: #E3B779;
  font-size: 20px;
  font-family: 'Milonga';
`

const ButtonContainer = styled.View`
  height: 180px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  gap: 10px;
`

const BglessButtonE = styled.Text`
  font-family: 'Milonga';
  color: #E3B779;
  font-size: 30px;
`

const BglessButtonS = styled.Text`
  font-family: 'Milonga';
  color: #E3B779;
  font-size: 30px;
  width: 105px;
  text-align: center;
`

export default function HomeLista() {
  const [loaded, setLoaded] = useState(false)
  const [veiculos, setVeiculos] = useState([]);
  const [modalEntradaVisible, setModalEntradaVisible] = useState(false);
  const [modalSaidaVisible, setModalSaidaVisible] = useState(false);
  // const [placaSelecionada, setPlacaSelecionada] = useState('');

  const abrirModalEntrada = () => setModalEntradaVisible(true);
  const abrirModalSaida = () => setModalSaidaVisible(true);

  const [item, setItem] = useState([

  ])

  useEffect(() => {
    Font.loadAsync({
      'ParkLaneNF': require('../assets/font/ParkLaneNF.ttf'),
      'Milonga': require('../assets/font/Milonga.ttf')
    }).then(() => setLoaded(true));
  }, []);

  const loadVeiculos = async () => {
    try{
      const response = await api.get('/api/veiculos');
      setItem(response.data);
    }
    catch(error) {
      console.error('Erro ao carregar veiculos: ', error);
    }
  };

  useEffect(() => {
    loadVeiculos();
  }, []);

  const handleEntrada = async () => {   
    setModalEntradaVisible(false);
    await loadVeiculos();   
  };

  const handleSaida = async () => {    
    setModalSaidaVisible(false);
    await loadVeiculos();
  };

  if (!loaded) return null;

  const renderItem = ({ item }) => (
    <Card>
      <Placa>Placa:    {item.placa}</Placa>
      <Info>Entrada:    {item.dataEntrada}</Info>
      <Info>Hora:         {item.horarioEntrada}</Info>
    </Card>
  )

  return (
    <ListaContainer source={backgroundImage} resizeMode='cover'>
      <Texto>Lista</Texto>
      <View style={{ flex: 1 }}>
        <FlatList
          data={item}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
          ItemSeparatorComponent={() => (
            <Divisoria
              source={divisoria}
            />
          )}
        />
      </View>

      <ButtonContainer>
        <TouchableOpacity>
          <BglessButtonE onPress={abrirModalEntrada}>Entrada</BglessButtonE>
        </TouchableOpacity>

        <Split source={split}></Split>

        <TouchableOpacity>
          <BglessButtonS onPress={abrirModalSaida}>Saida</BglessButtonS>
        </TouchableOpacity>
      </ButtonContainer>

      <ModalEntrada
        visible={modalEntradaVisible}
        onConfirm={handleEntrada}
        onCancel={() => setModalEntradaVisible(false)}
      />

      <ModalSaida
        visible={modalSaidaVisible}
        onConfirm={handleSaida}
        onCancel={() => setModalSaidaVisible(false)}
        veiculos={veiculos}
      />
    </ListaContainer>
  )
};


