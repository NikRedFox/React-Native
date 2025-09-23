import { Dimensions, Image, TouchableOpacity, View, Text, FlatList, Modal } from 'react-native';
import {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import backgroundImage from '../assets/mobileBg.png'
import split from '../assets/buttonSplit.png';
import divisoria from '../assets/divisoriaLista.png';
import ModalEntrada from '../components/EntradaModal.jsx';
import ModalSaida from '../components/SaidaModal.jsx';
import * as Font from 'expo-font';

const {width, height} = Dimensions.get('window');

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

export default function HomeLista(){
    const [loaded, setLoaded] = useState(false)
    const [carros, setCarros] = useState([]);
    const [modalEntradaVisible, setModalEntradaVisible] = useState(false);
    const [modalSaidaVisible, setModalSaidaVisible] = useState(false);
    const [placaSelecionada, setPlacaSelecionada] = useState('');

    const abrirModalEntrada =()=> setModalEntradaVisible(true);
    const abrirModalSaida =()=> setModalSaidaVisible(true);

    useEffect(() => {
      Font.loadAsync({
        'ParkLaneNF': require('../assets/font/ParkLaneNF.ttf'),
        'Milonga': require('../assets/font/Milonga.ttf')
      }).then(() => setLoaded(true));
    }, []);


    useEffect(()=>{
      const dadosFake = [
        {id: '1', placa: 'ABC-1234', data: '15/09/2025', hora: '14:30'},
        {id: '2', placa: 'DEF-5678', data: '15/09/2025', hora: '14:30'},
        {id: '3', placa: 'GHI-9101', data: '15/09/2025', hora: '14:30'},
        {id: '4', placa: 'JKL-1121', data: '15/09/2025', hora: '14:30'},
        {id: '5', placa: 'MNO-3141', data: '15/09/2025', hora: '14:30'},
        {id: '6', placa: 'PQR-5161', data: '15/09/2025', hora: '14:30'},
      ];

      setCarros(dadosFake);
    }, [])
    
    if (!loaded) return null;

    const handleEntrada = (placa) => {
      const agora = new Date();
      const data = agora.toLocaleDateString("pt-BR");
      const hora = agora.toLocaleTimeString("pt-BR", {hour: "2-digit", minute: "2-digit"});
      
      setCarros([...carros, { id: Date.now().toString(), placa, data, hora }]);
      // setModalEntradaVisible(false);
    };

    const handleSaida = (placa) =>{
      setCarros(carros.filter(carros.placa !== placa));
      setModalSaidaVisible(false);
    };

    const renderItem = ({item}) =>(
      <Card>
        <Placa>Placa:    {item.placa}</Placa>
        <Info>Entrada:    {item.data}</Info>
        <Info>Hora:         {item.hora}</Info>
      </Card>
    )
  
    return(
         <ListaContainer source ={backgroundImage} resizeMode='cover'>
            <Texto>Lista</Texto>             
            <View style={{flex:1}}>
              <FlatList
                data={carros}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                ItemSeparatorComponent={()=> (
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
              onConfirm={(placa) => handleEntrada(placa)}
              onCancel={()=> setModalEntradaVisible(false)}
              carros={carros}
            />

            <ModalSaida
              visible={modalSaidaVisible} 
              onConfirm={(placa) => handleSaida(placa)}
              onCancel={()=> setModalSaidaVisible(false)}
              carros = {carros}
            />
          </ListaContainer>

          

    )
};


