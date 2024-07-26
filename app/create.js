// Dependencies
import uuid from 'react-native-uuid';
import { useState, useContext } from "react"
import { View, TextInput, ScrollView } from "react-native"
import { format } from 'date-fns';

// Components
import AppContext from "../components/AppContext";
import { Screen } from "../components/Screen"
import { HeaderCreate } from "../components/Headers/HeaderCreate";
import { CheckList } from "../components/CheckList";
import { MenuInput } from '../components/Menus/MenuInput';

export default function () {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const { storeData } = useContext(AppContext)
    const [checklists, setChecklists] = useState([]);
    const [checkVisible, setCheckVisible] = useState(false)
    const [pinned, setPinned] = useState(false)
    

    const handleTitle = () => {
        const id = uuid.v4();
        const now = new Date();
        const date = format(now, 'MMM dd, yyyy');
        storeData(id, title, text, date, pinned)
        setTitle('')
        setText('')
        setChecklists([]);
    }

    return (
        <Screen>
            <HeaderCreate handleTitle={handleTitle} />
            <ScrollView>
                <View className="gap-3">
                    <TextInput
                        className="font-medium text-3xl"
                        placeholderTextColor="#9c9c9e"
                        placeholder="Note Title"
                        color="#454545"
                        selectionColor="#e0a103"
                        value={title}
                        onChangeText={setTitle}
                    />
                    <TextInput
                        className="text-xl"
                        placeholderTextColor="#9c9c9e"
                        placeholder="Note Text"
                        color="#454545"
                        selectionColor="#e0a103"
                        value={text}
                        onChangeText={setText}
                        multiline
                    />
                    {checkVisible && <CheckList checklists={checklists} setChecklists={setChecklists} />}
                </View>
            </ScrollView>

            {/* <MenuInput checkVisible={checkVisible} setCheckVisible={setCheckVisible} /> */}
        </Screen>
    )
}