import { View, Pressable, Text } from "react-native"
import { Link } from "expo-router"
import { FolderIconGrey } from "../Icons"

export function NotesCard ({orderDate, filteredData}) {
    return (
        <View className="bg-[#fff] ml-0 rounded-xl mb-16 mt-4">
        {(orderDate ? filteredData : filteredData.slice().reverse()).map((note, index) => (
            <Link asChild href={`/${note.id}`} key={index} style={{ paddingTop: 5, paddingLeft: 20, borderBottomWidth: index === filteredData.length - 1 ? 0 : 1, borderBottomColor: '#ada7a169' }}>
                <Pressable>
                    <Text className="font-semibold text-lg">{note.title}</Text>
                    <View className="flex-row items-center" >
                        <Text className="text-[#9c9c9e]" >{note.date}</Text>
                    </View>
                    <View className="flex-row items-center mt-1 mb-2">
                        <FolderIconGrey />
                        <Text className="text-[#9c9c9e] ml-2">Notes</Text>
                    </View>
                </Pressable>
            </Link>
        ))}
    </View>
    )
}