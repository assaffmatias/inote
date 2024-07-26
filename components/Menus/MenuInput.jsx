import { View, Pressable } from "react-native"
import { MaterialIcons } from '@expo/vector-icons';

export function MenuInput({ checkVisible, setCheckVisible }) {
    return (
        <View className="absolute bottom-0 w-[100vw] px-5 py-2 bg-white flex-row items-center justify-between" >
            <Pressable onPress={() => setCheckVisible(!checkVisible)}>
                <MaterialIcons name="format-list-bulleted-add" size={28} color="#e0a103" />
            </Pressable>
        </View>
    )
}