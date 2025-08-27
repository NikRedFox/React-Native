import { Modal, Text, TouchableOpacity, StyleSheet, View } from "react-native";

export default function BasicModal({visible, onClose}){
    return(
        <Modal style={style.modal} visible={visible} animationType ='slide' >
            <View style={style.containerModal}>
                <Text style={style.textModal}>Modal</Text>
                <TouchableOpacity onPress={onClose}>
                    <Text>Fechar</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    )
}

const style = StyleSheet.create({
    containerModal:{
        flex: 1,
        height: '20%',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'green'
    },

    textModal:{
        color: 'red'
    }


})