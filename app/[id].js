import { View, TextInput, Alert, Button } from 'react-native';
import { Screen } from '../components/Screen';
import { useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext, useEffect, useState } from 'react';
import AppContext from '../components/AppContext';
import { HeaderEdit } from '../components/Headers/HeaderEdit';
import { ModalEdit } from '../components/Modals/ModalEdit';
import { useRouter } from 'expo-router';

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
            Alert.alert('Delete Note', 'This note will be completely removed', [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: async () => {
                        const value = await AsyncStorage.getItem('@notes');
                        const notes = JSON.parse(value);
                        const updatedNotes = notes.filter(note => note.id !== id);
                        await AsyncStorage.setItem('@notes', JSON.stringify(updatedNotes));
                        alert('Note Deleted');
                        setModalVisible(false);
                        router.navigate('/home');
                    }
                },
            ]);
        } catch (error) {
            console.error(error);
        }
    };

    const clearNote = () => {
        Alert.alert('Clear Note', 'All content of this note will be deleted', [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'OK',
                onPress: async () => {
                    setTitle('');
                    setText('');
                    alert('Cleaned Note');
                    setModalVisible(false);
                }
            },
        ]);
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
                notes[foundIndex].pinned === true ? alert('Pinned') : alert('Unpinned');
                console.log('Note pinned status updated successfully:', notes[foundIndex].pinned);
            } else {
                console.log('Note with ID', id, 'not found.');
            }
        } catch (error) {
            console.error('Error updating note:', error);
        }
    };

    console.log(`title: ${title}`);
    console.log(`NewTitle: ${newTitle}`);
    console.log(`OriginalTitle: ${originalTitle}`);


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
                clearNote={clearNote}
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