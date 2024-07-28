import { View, Pressable, Text } from "react-native"
import { Link } from "expo-router";
import { CreateIcon } from "../Icons";

export function MenuHome({state}) {
    return (
        <View className="absolute bottom-0 w-[100vw] px-5 py-2 bg-[#f7f7f7] flex-row items-center justify-between border-t border-solid border-[#9c9c9e54]">
            <Text className="opacity-0">.</Text>
            <Text className="font-medium">{state.length} Notes</Text>
            <Link asChild href={'/create'}>
                <Pressable className="">
                    <CreateIcon />
                </Pressable>
            </Link>
        </View>
    )
}