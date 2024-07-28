import { View, Pressable, Text } from "react-native"
import { Link } from "expo-router"
import { FolderIconGrey } from "../Icons"
import { MaterialCommunityIcons } from '@expo/vector-icons';

export function PinNotesCard({ pinnedNotes }) {
    return (
        <View className="bg-[#fff] ml-0 rounded-xl mb-4 mt-8">
            {pinnedNotes.slice().reverse().map((note, index) => (
                <Link
                    className="flex-row"
                    asChild
                    href={`/${note.id}`}
                    key={index}
                    style={{
                        paddingTop: 0,
                        borderBottomWidth: index === pinnedNotes.length - 1 ? 0 : 1,
                        borderBottomColor: '#ada7a169',
                    }}
                >
                    <Pressable >
                        <View className="bg-[#ffae19] rounded-tl-xl rounded-bl-xl w-[30%] items-center justify-center"
                            style={{
                                borderTopLeftRadius: pinnedNotes.length === 1 ? 12 : (index === 0 ? 12 : 0),
                                borderBottomLeftRadius: pinnedNotes.length === 1 ? 12 : (index === pinnedNotes.length - 1 ? 12 : 0),
                            }}
                        >
                            <MaterialCommunityIcons name="pin" size={32} color="white" />
                        </View>
                        <View className="ml-4" >
                            <Text className="font-semibold text-lg">{note.title}</Text>
                            <View className="flex-row items-center">
                                <Text className="text-[#9c9c9e]">{note.date}</Text>
                            </View>
                            <View className="flex-row items-center mt-1 mb-2">
                                <FolderIconGrey />
                                <Text className="text-[#9c9c9e] ml-2">Notes</Text>
                            </View>
                        </View>
                    </Pressable>
                </Link>
            ))}
        </View>
    )
}