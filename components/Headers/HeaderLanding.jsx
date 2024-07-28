import { View, Pressable, Text } from "react-native"
import { Link } from "expo-router"

export function HeaderLanding({openMenu}) {
    return (
        <View className="flex-row justify-end my-4 items-center" >
            <Pressable onPress={() => openMenu(true)}>
                <Text className="text-[#e0a103] text-xl">Edit</Text>
            </Pressable>
        </View>
    )
}