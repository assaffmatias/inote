import { View, Pressable } from "react-native"
import { Link } from "expo-router";
import { CreateIcon } from "../Icons";
import { AddIcon } from "../Icons";
import { AddFolder } from "../Icons";

export function MenuLanding({ openModal }) {
    return (
        <View className="absolute bottom-0 w-[100vw] px-5 py-2 bg-white flex-row items-center justify-between border-t border-solid border-[#9c9c9e54]">
            <Pressable onPress={() => openModal(true)}>
                <AddFolder />
            </Pressable>
            <Link asChild href={'/create'}>
                <Pressable className="">
                    <CreateIcon name="create-outline" size={28} color="#e0a103" />
                </Pressable>
            </Link>
        </View>
    )
}