import { View, Text, Pressable } from "react-native"
import { Link } from "expo-router"
import { ArrowBack } from "../Icons"
import { EllipsisIcon } from "../Icons"
import { MaterialCommunityIcons } from '@expo/vector-icons';

export function HeaderEdit({ openModal, sendData, revertChanges, redoChanges, title, newTitle, originalTitle, text, newText, originalText }) {

    return (
        <View className="flex-row justify-between my-4 items-center" >
            <Link asChild href={'/home'} className="flex-row items-center" >
                <Pressable>
                    <ArrowBack />
                    <Text className="text-[#e0a103] text-xl ml-2">Notes</Text>
                </Pressable>
            </Link>
            <View className="flex-row">
                {title !== originalTitle || text !== originalText ? (
                    <Pressable onPress={revertChanges} className="ml-4">
                        <MaterialCommunityIcons name="arrow-u-left-top" size={24} color="#e0a103" />
                    </Pressable>
                ) : (
                    <Pressable className="ml-4">
                        <MaterialCommunityIcons name="arrow-u-left-top" size={24} color="#9c9c9e" />
                    </Pressable>
                )}
                {newTitle.length === 0 || newTitle === originalTitle || newText.length === 0 || newText === originalTitle ? (
                    <Pressable className="ml-4">
                        <MaterialCommunityIcons name="arrow-u-right-top" size={24} color="#9c9c9e" />
                    </Pressable>
                ) : (
                    <Pressable onPress={redoChanges} className="ml-4">
                        <MaterialCommunityIcons name="arrow-u-right-top" size={24} color="#e0a103" />
                    </Pressable>
                )}

            </View>
            <View className="flex-row items-center" >
                <Pressable onPress={() => openModal(true)}>
                    <EllipsisIcon />
                </Pressable>
                <Pressable onPress={sendData}>
                    <Text className="text-[#e0a103] text-xl ml-4 font-medium">Done</Text>
                </Pressable>
            </View>
        </View>
    )
}