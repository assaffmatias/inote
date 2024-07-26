import { View, Modal, TouchableWithoutFeedback, StyleSheet, Text, Pressable, TextInput } from "react-native"
import { NewFolderIcon } from "../Icons";

export function ModalLanding({ setModalVisible, modalVisible, folderName, setFolderName, createFolder }) {

    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <NewFolderIcon />
                            <TextInput
                                className="font-medium text-2xl flex-1"
                                placeholderTextColor="#9c9c9e"
                                placeholder="Folder name"
                                color="#454545"
                                selectionColor="#e0a103"
                                value={folderName}
                                onChangeText={text => setFolderName(text)}
                            />
                            <Pressable>
                                <Text className="text-lg text-[#e0a103] font-medium">Done</Text>
                            </Pressable>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    )
}


const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000062'
    },

    modalView: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        backgroundColor: 'white',
        width: '90%',
        shadowColor: '#000',
        padding: 30,
        borderRadius: 8,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
});