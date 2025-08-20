import { Text, TouchableOpacity } from "react-native";

export default function Button ({label}){
    return(
        <TouchableOpacity>
            <Text>
                {label}
            </Text>
        </TouchableOpacity>
    )
}