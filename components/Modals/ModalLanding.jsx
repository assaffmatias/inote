import { View, Modal, TouchableWithoutFeedback, StyleSheet, Text, Pressable, TextInput } from "react-native"

export function ModalLanding({ setModalVisible, modalVisible, folderName, setFolderName, createFolder }) {
    const handleCancel = () => {
        setFolderName('')
        setModalVisible(false)
    }

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
                            <Text className="font-medium text-xl m-0" >New Folder</Text>
                            <Text className="m-0 mb-4" >Enter a new name for the folder</Text>
                            <TextInput
                                className="text-lg border-[1px] border-solid border-[#9c9c9e54] rounded-lg p-2 w-[90%]"
                                placeholderTextColor="#9c9c9e"
                                placeholder="Folder name"
                                color="#454545"
                                selectionColor="#e0a103"
                                value={folderName}
                                onChangeText={text => setFolderName(text)}
                            />
                            <View className="flex-row mt-6 w-full border-t border-solid border-[#9c9c9e54]" >
                                <Pressable onPress={handleCancel} className="flex-1 justify-center items-center py-3">
                                    <Text className="text-lg text-[#e0a103] font-medium">Cancel</Text>
                                </Pressable>
                                <Pressable onPress={() => createFolder(folderName)} className="border-l border-solid border-[#9c9c9e54] flex-1 justify-center items-center py-3">
                                    <Text className="text-lg text-[#e0a103] font-medium">Save</Text>
                                </Pressable>
                            </View>

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
        alignItems: 'center',
        backgroundColor: 'white',
        width: '80%',
        shadowColor: '#000',
        paddingTop: 20,
        borderRadius: 8,
    },
});