import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet } from 'react-native';

import Login from './src/pages/Login';
import Card from './src/components/Card';
import Button from './src/components/Button';

export default function App() {
  return (
    <SafeAreaView style={style.container}>
      <StatusBar hidden/>
      <Card image={require('./src/assets/lizard-lizard-lizard-hoppers-disney-meme-vBWPkrsMlfKGHpVL-full.jpg')} title='Teste 1'/>
      <Card image={require('./src/assets/icon.png')} title='Teste 2'/>
      <Card image={require('./src/assets/toothless-dancing.gif')}title='Teste 3'/>
      <Button label="Começar"/>

      
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
  container:{
      flex: 1
  }

})