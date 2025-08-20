import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, Image, Pressable, TouchableOpacity, View } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={style.container}>
      <StatusBar hidden/>
      <Image style={style.img} source={require ('./assets/toothless-dancing.gif')}/>
      <Text style={style.title}>Hello World</Text>
      <View style={style.btnContainer}>
        <Pressable style={({pressed}) =>[style.btn, pressed && style.pressed]}>
          <Text>Cadastro</Text>
        </Pressable>
        <TouchableOpacity style={style.btn}>
          <Text>Login</Text>
        </TouchableOpacity>
      </View>

      
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
  container:{
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'green'
  },
  title:{
    fontSize: 50,
    fontFamily: 'Comic Sans MS'
  },
  img:{
    height: 200
  },
  btn:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '30%',
    height: 80,
    borderRadius: 12,
    borderWidth: 5,
  },
  pressed:{
    backgroundColor: 'red'
  },
  btnContainer:{
    display: 'flex',
    flexDirection: 'row',
    gap: 10
  }
  
})

