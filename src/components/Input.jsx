import React from "react";
import styled from "styled-components/native";
import { TextInput, Image } from "react-native";
import inputBg from '../assets/inputBg.png';

const InputWrapper = styled.View`
    /* width: 80%; */
`

const Input = styled.TextInput.attrs({
    placeholderTextColor: '#E3B779',
})`
    width: 100%;
    color: #E3B779;
    font-size: 35px;
    font-family: 'Milonga';
    padding-left: 10px;
    margin-bottom: -10px;

`

const LineImage = styled.Image`
`

export default function InputProps({ placeholder, value, onChangeText, normalizar }) {
    const handleChange = (textoDigitado) => {
        let resultado = textoDigitado;
        if(normalizar){
            resultado = textoDigitado.replace(/[^A-Za-z0-9]/g, "").toUpperCase();
        }
        onChangeText(resultado);
    };

    return (
        <InputWrapper>
            <Input placeholder={placeholder} value={value} onChangeText={handleChange} />
            <LineImage source={inputBg} />
        </InputWrapper>
    )
};