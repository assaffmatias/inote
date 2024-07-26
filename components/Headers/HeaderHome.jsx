import { View, Text, Pressable } from "react-native"
import { Link } from "expo-router"
import { ArrowBack } from "../Icons";
import { EllipsisIcon } from "../Icons";

export function HeaderHome({openModal}) {
    return (
        <View className="flex-row justify-between my-4 items-center" >
            <Link asChild href={'/'} className="flex-row items-center" >
                <Pressable>
                    <ArrowBack />
                    <Text className="text-[#e0a103] text-xl ml-2">Folders</Text>
                </Pressable>
            </Link>
            <Pressable onPress={() => openModal(true)}>
                <EllipsisIcon />
            </Pressable>
        </View>
    )
}