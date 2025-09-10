import styled from 'styled-components/native';
import React from 'react';
import { Text } from 'react-native';
import buttonBackground from '../assets/buttonBg.png'

const ButtonWrapper = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    /* margin-top: 60px; */

`
const Background = styled.ImageBackground`
    justify-content: center;
    align-items: center;
    width: 184px;
    height: 81px;
`

const ButtonText = styled.Text`
    color: #E3B779;
    font-size: 35px;    
    font-family: 'Milonga';
`

export  default function Button({ texto, onPress}){
    return(
        <ButtonWrapper onPress={onPress}>
            <Background source={buttonBackground} resizeMode='cover'>
                <ButtonText >{texto}</ButtonText>
            </Background>
        </ButtonWrapper>
    )
}