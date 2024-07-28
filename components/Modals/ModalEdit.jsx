import { View, Modal, TouchableWithoutFeedback, StyleSheet, Text, Pressable } from "react-native"
import { PinIcon } from "../Icons";
import { DeleteIcon } from "../Icons";
import { PinOffIcon } from "../Icons";
import { EraseIcon } from "../Icons";

export function ModalEdit({ setModalVisible, modalVisible, deleteNote, id, togglePinned, pinned }) {
    const handleTogglePinned = () => {
        togglePinned(id);
    };

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
                                onPress={handleTogglePinned}
                                className="p-4 flex-row w-[100%] justify-between items-center border-b-[1px] border-solid border-[#ada7a169]"
                            >
                                <Text className="text-lg text-[#454545]">{pinned ? "Unpin" : "Pin"}</Text>
                                {pinned ? <PinOffIcon /> : <PinIcon /> }
                                
                            </Pressable>
                            <Pressable
                                className="p-4 flex-row w-[100%] justify-between items-center border-b-[1px] border-solid border-[#ada7a169]"
                                onPress={() => deleteNote(id)}
                            >
                                <Text className="text-lg text-[#454545]">Delete</Text>
                                <DeleteIcon />
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
});