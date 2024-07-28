// Dependencies
import { useState, useEffect } from "react";
import { View, Text, ScrollView, Alert } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';

// Components
import { Screen } from "../components/Providers/Screen"
import { HeaderHome } from "../components/Headers/HeaderHome";
import { MenuHome } from "../components/Menus/MenuHome";
import { ModalHome } from "../components/Modals/ModaHome";
import { NotesCard } from "../components/Cards/NotesCard";
import { PinNotesCard } from "../components/Cards/PinNotesCard";
import { SearchNotes } from "../components/Search/SearchNotes";

export default function Home() {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [pinnedNotes, setPinnedNotes] = useState([])
    const [modalVisible, setModalVisible] = useState(false)
    const [orderDate, setOrderDate] = useState(false)

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
            filteredData.length > 0 || pinnedNotes.length > 0 ?
                Alert.alert('Delete All Notes?', 'You will not be able to undo the changes', [
                    {
                        text: 'Cancel',
                        style: 'cancel',
                    },
                    {
                        text: 'Continue',
                        onPress: async () => {
                            await AsyncStorage.removeItem('@notes');
                            setModalVisible(false);
                            getData()
                            setData([])
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

    const orderByDate = () => {
        setOrderDate(!orderDate)
    }

    return (
        <Screen>
            <HeaderHome openModal={setModalVisible} />
            <ModalHome setModalVisible={setModalVisible} modalVisible={modalVisible} deleteAllNotes={deleteAllNotes} orderByDate={orderByDate}/>
            <ScrollView>
                <View className="w-[100%] h-[100%]">
                    <Text className="text-4xl mb-2 font-medium">Notes</Text>
                    <SearchNotes searchNotes={searchNotes} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                    {pinnedNotes.length > 0 && (
                        <PinNotesCard pinnedNotes={pinnedNotes}/> 
                    )}
                    <NotesCard orderDate={orderDate} filteredData={filteredData} />
                </View>
            </ScrollView>
            <MenuHome state={data} />
        </Screen>
    )
}