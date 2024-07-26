import { View, Text, Pressable } from "react-native"
import { Link } from "expo-router"
import { ArrowBack } from "../Icons";

export function HeaderCreate({handleTitle}) {
    return (
        <View className="flex-row justify-between my-4 items-center" >
            <Link asChild href={'/home'} className="flex-row items-center" >
                <Pressable>
                    <ArrowBack />
                    <Text className="text-[#e0a103] text-xl ml-2">Notes</Text>
                </Pressable>
            </Link>
            <Pressable onPress={handleTitle}>
                <Text className="text-[#e0a103] text-xl font-medium">Done</Text>
            </Pressable>
        </View>
    )
}