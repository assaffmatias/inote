import { View, Modal, TouchableWithoutFeedback, StyleSheet, Text, Pressable, TextInput } from "react-native"

export function ModalFolder({ modalMenu, setModalMenu, deleteAllFolders }) {

    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalMenu}
                onRequestClose={() => {
                    setModalMenu(!modalMenu);
                }}>
                <TouchableWithoutFeedback onPress={() => setModalMenu(false)}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text className="text-xl m-0" >Delete all folders?</Text>
                            <View className="flex-row mt-6 w-full border-t border-solid border-[#9c9c9e54]" >
                                <Pressable onPress={() => setModalMenu(false)} className="flex-1 justify-center items-center py-3">
                                    <Text className="text-lg text-[#e0a103] font-medium">No</Text>
                                </Pressable>
                                <Pressable onPress={deleteAllFolders} className="border-l border-solid border-[#9c9c9e54] flex-1 justify-center items-center py-3">
                                    <Text className="text-lg text-[#e0a103] font-medium">Yes</Text>
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