import { Image, Text, View, StyleSheet } from "react-native";

export default function Card (props){
    return(
        <View style={style.container}>
            <Image style={style.img} source={props.image}/>
            <Text style={style.title}>{props.title}</Text>
        </View>
    )
}

const style = StyleSheet.create({
    container:{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        
    },

    title:{
        fontSize: 24
    },

    img:{
        width: 150,
        height: 150
    }
})