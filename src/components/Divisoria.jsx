import React from "react";
import styled from "styled-components/native";
import { Text, Image } from 'react-native';
import divisoria from '../assets/sideDetail.png';
import divisoriaInversa from '../assets/sideDetailInverso.png';

const DivisoriaWrapper = styled.View`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 40px;
    margin-bottom: 25px;
    gap: 15px;
`

const LineText = styled.Text`
    color: #E3B779;
    font-family: 'Milonga';
    font-size: 35px;
`

const EsqImg = styled.Image`

`

const DirImg = styled.Image`
`

export default function Divisoria() {
    return (
        <DivisoriaWrapper>
            <EsqImg source={divisoria} />
            <LineText>Ou</LineText>
            <DirImg source={divisoriaInversa} />
        </DivisoriaWrapper>
    )
}