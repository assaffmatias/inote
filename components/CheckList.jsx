import { View, TouchableOpacity, Text, TextInput } from "react-native"
import uuid from 'react-native-uuid';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';

export function CheckList({ checklists, setChecklists }) {

    const addChecklistItem = () => {
        const newItem = { id: uuid.v4(), text: '', completed: false };
        setChecklists([...checklists, newItem]);
    };

    const handleChecklistItemChange = (text, index) => {
        const updatedChecklists = [...checklists];
        updatedChecklists[index].text = text;
        setChecklists(updatedChecklists);
    };

    const toggleChecklistItem = (index) => {
        const updatedChecklists = [...checklists];
        updatedChecklists[index].completed = !updatedChecklists[index].completed;
        setChecklists(updatedChecklists);
    };

    const deleteChecklistItem = (index) => {
        const updatedChecklists = [...checklists];
        updatedChecklists.splice(index, 1);
        setChecklists(updatedChecklists);
    };

    return (
        <View className="flex w-[95%] mx-3 my-4" >
            {checklists.map((item, index) => (
                <View key={item.id} className="flex flex-row w-[100%] items-center justify-center my-3">
                    <TouchableOpacity
                        onPress={() => toggleChecklistItem(index)}
                    >
                        <Text>{item.completed ? (
                            <Ionicons name="checkmark-circle" size={32} color="#e0a103" />
                        ) : (
                            <MaterialIcons name="radio-button-unchecked" size={32} color="#e0a103" />
                        )}
                        </Text>
                    </TouchableOpacity>
                    <TextInput
                        className="flex-1 text-xl px-2"
                        placeholderTextColor="#ada7a1"
                        selectionColor="#e4b942"
                        value={item.text}
                        multiline
                        onChangeText={(text) => handleChecklistItemChange(text, index)}
                    />
                    <TouchableOpacity
                        onPress={() => deleteChecklistItem(index)}
                    >
                        <EvilIcons name="close" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            ))}
            <TouchableOpacity className="flex-row items-center" onPress={addChecklistItem}>
                <AntDesign name="plus" size={24} color="#ada7a1" />
                <Text className="ml-2 text-xl text-[#ada7a1]">List item</Text>
            </TouchableOpacity>
        </View>
    )
}