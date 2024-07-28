import { View, TextInput } from "react-native"
import { SearchIcon } from "../Icons"

export function SearchNotes ({searchNotes, searchTerm, setSearchTerm}) {
    return (
        <View className="bg-[#e3e3e8] text-lg rounded-xl pl-1 flex-row items-center">
        <SearchIcon />
        <TextInput
            className="w-[90%] h-[40px] ml-1"
            placeholderTextColor="#78787d"
            placeholder="Search"
            color="#000"
            selectionColor="#e0a103"
            value={searchTerm}
            onChangeText={(text) => { setSearchTerm(text) }}
            onSubmitEditing={searchNotes}
        />
    </View>
    )
}