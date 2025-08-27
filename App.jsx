import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';

import Login from './src/pages/Login';
import Card from './src/components/Card';
import Button from './src/components/Button';
import BasicModal from './src/components/BasicModal';
import { useState } from 'react';

export default function App() {
  const [open, setOpen] = useState(false)
  return (
    <SafeAreaView style={style.container}>
      <StatusBar hidden/>
      {/* <Card image={require('./src/assets/lizard-lizard-lizard-hoppers-disney-meme-vBWPkrsMlfKGHpVL-full.jpg')} title='Teste 1'/>
      <Card image={require('./src/assets/icon.png')} title='Teste 2'/>
      <Card image={require('./src/assets/toothless-dancing.gif')}title='Teste 3'/>
      <Button label="Começar"/> */}
      <Text>Utilizando Hooks e Modal</Text>
      <TouchableOpacity onPress={()=> setOpen(!open)}>
        <Text>Handle</Text>
      </TouchableOpacity>
      {
        open ? <Text>True</Text> : <Text>False</Text>
      }
      <BasicModal visible={open} onClose={() => setOpen(false)}/>      
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
  container:{
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent:'center'
  },

  modal:{
    height: '50%',
    display: 'flex',
    justifyContent: 'flex-end'
  }
  

})