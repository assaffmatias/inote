// Dependencies
import { useState, useEffect } from "react";
import { View, Text, Pressable, TextInput, ScrollView, Alert } from "react-native"
import { Link } from "expo-router"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Components
import { Screen } from "../components/Screen"
import { HeaderHome } from "../components/Headers/HeaderHome";
import { MenuHome } from "../components/Menus/MenuHome";
import { ModalHome } from "../components/Modals/ModaHome";

// Icons
import { FolderIconGrey } from "../components/Icons";
import { SearchIcon } from "../components/Icons";

export default function Home() {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [pinnedNotes, setPinnedNotes] = useState([])
    const [modalVisible, setModalVisible] = useState(false)

    const getData = async () => {
        try {
            const notes = await AsyncStorage.getItem('@notes');
            if (notes !== null) {
                const parsedNotes = JSON.parse(notes);

                const pinned = parsedNotes.filter(note => note.pinned);
                setPinnedNotes(pinned);

                const notPinned = parsedNotes.filter(note => !note.pinned);
                setFilteredData(notPinned);

                setData(parsedNotes);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);


    const searchNotes = () => {
        if (searchTerm.trim() === '') {
            setFilteredData(data);
        } else {
            const filtered = data.filter(note =>
                note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                note.text.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredData(filtered);
        }
    };

    const deleteAllNotes = async (id) => {
        try {
            filteredData.length > 0 ?
            Alert.alert('Delete All Notes', 'All notes in your app will be deleted', [
                {
                    text: 'Cancel',
                    // onPress: () => setModalVisible(false),
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: async () => {
                        await AsyncStorage.removeItem('@notes');
                        alert('Notes Deleted');
                        setModalVisible(false);
                        getData()
                        setFilteredData([])
                        setPinnedNotes([])
                    }
                },
            ])
            : alert('No notes found')
        } catch (error) {
            console.error(error);
        }
    };

    const unpinAllNotes = async () => {
        try {
            pinnedNotes.length > 0 ?
            Alert.alert('Unpinned All Notes', 'All notes will be unpinned', [
                {
                    text: 'Cancel',
                    // onPress: () => setModalVisible(false),
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: async () => {
                        const value = await AsyncStorage.getItem('@notes');
                        let notes = JSON.parse(value);

                        notes = notes.map(note => ({
                            ...note,
                            pinned: false
                        }));

                        await AsyncStorage.setItem('@notes', JSON.stringify(notes));
                        alert('All notes unpinned successfully');

                        setData(notes);
                        setFilteredData(notes);

                        const pinned = notes.filter(note => note.pinned);
                        setPinnedNotes(pinned);
                    }
                },
            ])
            : alert('No notes pinned found')
        } catch (error) {
            console.error('Error unpinning notes:', error);
        }
    };

    return (
        <Screen>
            <HeaderHome openModal={setModalVisible} />
            <ModalHome setModalVisible={setModalVisible} modalVisible={modalVisible} deleteAllNotes={deleteAllNotes} unpinAllNotes={unpinAllNotes} />
            <ScrollView>
                <View className="w-[100%] h-[100%]">
                    <Text className="text-4xl mb-2 font-medium">Notes</Text>
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
                    {pinnedNotes.length > 0 && (
                        <View>
                            {/* <Text className="text-2xl mt-8 mb-2 ml-4 font-medium">Pinned</Text> */}
                            <View className="bg-[#fff] ml-0 rounded-xl mb-4 pr-4 mt-8">
                                {pinnedNotes.map((note, index) => (
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
                        </View>
                    )}
                    {/* {filteredData.length > 0 && <Text className="text-2xl mt-8 mb-2 ml-1 font-medium">All Notes</Text>} */}
                    <View className="bg-[#fff] ml-0 rounded-xl mb-16 px-4 mt-4">
                        {filteredData.slice().reverse().map((note, index) => (
                            <Link asChild href={`/${note.id}`} key={index} style={{ paddingTop: 5, borderBottomWidth: index === filteredData.length - 1 ? 0 : 1, borderBottomColor: '#ada7a169' }}>
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
                </View>
            </ScrollView>
            <MenuHome state={filteredData} />
        </Screen>
    )
}