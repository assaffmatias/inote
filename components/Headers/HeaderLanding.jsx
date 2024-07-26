import { View } from "react-native"
import { Link } from "expo-router"

export function HeaderLanding() {
    return (
        <View className="flex-row justify-end my-4 items-center" >
            <Link href={'/home'} className="text-[#e0a103] text-xl">Edit</Link>
        </View>
    )
}