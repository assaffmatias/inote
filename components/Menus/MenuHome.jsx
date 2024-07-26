import { View, Pressable, Text } from "react-native"
import { Link } from "expo-router";
import { CreateIcon } from "../Icons";

export function MenuHome({state}) {
    return (
        <View className="absolute bottom-0 w-[100vw] px-5 py-2 bg-white flex-row items-center justify-between">
            <Text className="opacity-0">.</Text>
            {state.length > 1 ? (
                <Text className="font-medium">{state.length} Notes</Text>
            ) : (
                <Text className="font-medium">{state.length} Note</Text>
            )}
            <Link asChild href={'/create'}>
                <Pressable className="">
                    <CreateIcon />
                </Pressable>
            </Link>
        </View>
    )
}