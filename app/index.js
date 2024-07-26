// Dependencies
import { useState, useEffect } from "react";
import { Text, View, Pressable } from "react-native"
import { Link } from "expo-router"
import AsyncStorage from '@react-native-async-storage/async-storage';

// Components
import { HeaderLanding } from "../components/Headers/HeaderLanding";
import { MenuLanding } from "../components/Menus/MenuLanding";
import { ModalLanding } from "../components/Modals/ModalLanding";
import { Screen } from "../components/Screen"

//Icons
import { FolderIcon } from "../components/Icons";
import { ArrowRightIcon } from "../components/Icons";

export default function Landing() {
    const [data, setData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false)
    const [folderName, setFolderName] = useState('');
    const [folders, setFolders] = useState([]);

    const getData = async () => {
        try {
            const notes = await AsyncStorage.getItem('@notes');
            const foldersData = await AsyncStorage.getItem('@folders');

            if (notes !== null) {
                setData(JSON.parse(notes));
            }

            if (foldersData !== null) {
                const parsedFolders = JSON.parse(foldersData);
                setFolders(parsedFolders);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const saveFolders = async (updatedFolders) => {
        try {
            await AsyncStorage.setItem('@folders', JSON.stringify(updatedFolders));
            setFolders(updatedFolders);
        } catch (error) {
            console.error('Error saving folders:', error);
        }
    };

    const createFolder = async (folderName) => {
        try {
            const newFolder = {
                id: Date.now().toString(),
                name: folderName,
                notes: []
            };

            const updatedFolders = [...folders, newFolder];
            await saveFolders(updatedFolders);

        } catch (error) {
            console.error('Error creating folder:', error);
        }
    };

    return (
        <Screen>
            <HeaderLanding />
            <ModalLanding setModalVisible={setModalVisible} modalVisible={modalVisible} folderName={folderName} setFolderName={setFolderName} createFolder={createFolder} />
            <Text className="text-4xl font-medium mb-4">Folders</Text>
            <Link asChild href={'/home'}>
                <Pressable>
                    <View className="bg-[#fff] rounded-xl p-5" >
                        <View className="flex-row items-center justify-between">
                            <View className="flex-row items-center gap-3">
                                <FolderIcon />
                                <Text className="text-lg" >All Notes</Text>
                            </View>
                            <View className="flex-row items-center gap-3">
                                <Text className="text-[#9c9c9e] text-xl">{data.length}</Text>
                                <ArrowRightIcon />
                            </View>
                        </View>
                    </View>
                </Pressable>
            </Link>
            <MenuLanding openModal={setModalVisible} />
        </Screen>
    )
}