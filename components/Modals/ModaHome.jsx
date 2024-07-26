import { View, Modal, TouchableWithoutFeedback, StyleSheet, Text, Pressable } from "react-native"
import { PinOffIcon } from "../Icons";
import { DeleteIcon } from "../Icons";
import { CloseCircleIcon } from "../Icons";

export function ModalHome({ setModalVisible, modalVisible, deleteAllNotes, unpinAllNotes}) {

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
                            <Pressable
                                onPress={unpinAllNotes}
                                className="p-4 flex-row w-[100%] justify-between items-center border-b-[1px] border-solid border-[#ada7a169]"
                            >
                                <Text className="text-lg text-[#454545]">Unpinned all</Text>
                                <PinOffIcon />
                            </Pressable>
                            <Pressable
                                className="p-4 flex-row w-[100%] justify-between items-center border-b-[1px] border-solid border-[#ada7a169]"
                                onPress={deleteAllNotes}
                            >
                                <Text className="text-lg text-[#454545]">Delete all notes</Text>
                                <DeleteIcon />
                            </Pressable>
                            <Pressable
                                className="p-4 flex-row w-[100%] justify-between items-center"
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text className="text-lg text-[#454545]">Close</Text>
                                <CloseCircleIcon />
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
        justifyContent: 'flex-end',
        alignItems: 'center',
    },

    modalView: {
        backgroundColor: 'white',
        width: '100%',
        shadowColor: '#000',
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