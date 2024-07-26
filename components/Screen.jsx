import { View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function Screen ({children}) {
    const insets = useSafeAreaInsets()

    return (
        <View className="bg-[#f1f1f6] w-[100%] h-[100%] px-5" style={{paddingTop: insets.top, paddingBottom: insets.bottom}}>
            {children}
        </View>
    )
}