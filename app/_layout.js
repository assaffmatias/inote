import { View } from "react-native";
import { AppProvider } from "../components/Providers/AppContext";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function Layout() {

    return (
        <AppProvider>
            <View className="flex-1 bg-[#f1f1f6]">
                <StatusBar style="dark" />
                <Slot />
            </View>
        </AppProvider>
    )
}