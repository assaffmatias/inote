// Dependencies
import { useContext, useEffect, useState } from 'react';
import { View, TextInput, Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Components
import AppContext from '../components/Providers/AppContext';
import { Screen } from '../components/Providers/Screen';
import { HeaderEdit } from '../components/Headers/HeaderEdit';
import { ModalEdit } from '../components/Modals/ModalEdit';

export default function Edit() {
    const { id } = useLocalSearchParams();
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [originalTitle, setOriginalTitle] = useState('');
    const [originalText, setOriginalText] = useState('');
    const [newTitle, setNewTitle] = useState('');
    const [newText, setNewText] = useState('');
    const { editData } = useContext(AppContext);
    const [modalVisible, setModalVisible] = useState(false);
    const [pinned, setPinned] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const value = await AsyncStorage.getItem('@notes');
                const notes = JSON.parse(value);
                const foundNote = notes.find(note => note.id === id);
                setTitle(foundNote.title);
                setText(foundNote.text);
                setOriginalTitle(foundNote.title);
                setOriginalText(foundNote.text);
                setPinned(foundNote.pinned);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const sendData = () => {
        editData(id, title, text, pinned);
    };

    const revertChanges = () => {
        setTitle(originalTitle);
        setText(originalText);
    };

    const redoChanges = () => {
        setTitle(newTitle);
        setText(newText);
    };

    const handleTitleChange = (text) => {
        setNewTitle(text);
        setTitle(text);
    };

    const handleTextChange = (text) => {
        setNewText(text);
        setText(text);
    };

    const deleteNote = async (id) => {
        try {
            Alert.alert('Delete Note?', 'You will not be able to undo the changes', [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Continue',
                    onPress: async () => {
                        const value = await AsyncStorage.getItem('@notes');
                        const notes = JSON.parse(value);
                        const updatedNotes = notes.filter(note => note.id !== id);
                        await AsyncStorage.setItem('@notes', JSON.stringify(updatedNotes));
                        setModalVisible(false);
                        router.navigate('/home');
                    }
                },
            ]);
        } catch (error) {
            console.error(error);
        }
    };

    const togglePinned = async (id) => {
        try {
            const value = await AsyncStorage.getItem('@notes');
            let notes = JSON.parse(value);
            const foundIndex = notes.findIndex(note => note.id === id);

            if (foundIndex !== -1) {
                notes[foundIndex].pinned = !notes[foundIndex].pinned;

                await AsyncStorage.setItem('@notes', JSON.stringify(notes));

                setPinned(notes[foundIndex].pinned);
                // notes[foundIndex].pinned === true ? alert('Pinned') : alert('Unpinned');
            } else {
                console.log('Note with ID', id, 'not found.');
            }
        } catch (error) {
            console.error('Error updating note:', error);
        }
    };

    return (
        <Screen>
            <HeaderEdit
                openModal={setModalVisible}
                sendData={sendData}
                revertChanges={revertChanges}
                redoChanges={redoChanges}
                title={title}
                newTitle={newTitle}
                originalTitle={originalTitle}
                text={text}
                newText={newText}
                originalText={originalText}
            />
            <ModalEdit
                setModalVisible={setModalVisible}
                modalVisible={modalVisible}
                deleteNote={deleteNote}
                id={id}
                togglePinned={togglePinned}
                pinned={pinned}
            />
            <View className="gap-3">
                <TextInput
                    className="font-medium text-3xl"
                    placeholderTextColor="#9c9c9e"
                    placeholder="Note Title"
                    color="#454545"
                    selectionColor="#e0a103"
                    value={title}
                    onChangeText={handleTitleChange}
                />
                <TextInput
                    className="text-xl"
                    placeholderTextColor="#9c9c9e"
                    placeholder="Note Text"
                    color="#454545"
                    selectionColor="#e0a103"
                    value={text}
                    onChangeText={handleTextChange}
                    multiline
                />
            </View>
        </Screen>
    );
}