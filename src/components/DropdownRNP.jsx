import React from "react";
import RNPickerSelect from 'react-native-picker-select';
import styled from "styled-components/native";
import inputBg from '../assets/inputBg.png';
import { Image } from "react-native";

const InputWrapper = styled.View`
    width: 100%;
    align-items: center;
    margin-bottom: 40px;
`;

const LineImage = styled.Image`
  position: absolute;
  bottom: 0;
  top: 50;
  width: 80%;
  height: 40px;
`;

export default function PickerPlaca({ value, onValueChange, carros }) {
    return (
        <InputWrapper>
            <RNPickerSelect
                value={value}
                onValueChange={onValueChange}
                items={carros.map(c => ({ label: c.placa, value: c.placa }))}
                placeholder={{ label: 'Selecione a placa', value: null }}
                style={{
                    inputAndroid: {
                        color: '#E3B779',
                        fontSize: 30,
                        fontFamily: 'Milonga',
                        paddingLeft: 10,
                        paddingVertical: 8,
                    },
                    placeholder: {
                        color: '#E3B779',
                    }
                }}
                useNativeAndroidPickerStyle={false}
                Icon={() => null}
            />
            <LineImage source={inputBg} />
        </InputWrapper>
    );
}
