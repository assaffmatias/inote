import { Ionicons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';


export const FolderIcon = (props) => (
    <Ionicons name="folder-outline" size={28} color="#e0a103" {...props} />
)

export const FolderIconGrey = (props) => (
    <Ionicons name="folder-outline" size={18} color="#9c9c9e" {...props} />
)

export const ArrowRightIcon = (props) => (
    <EvilIcons name="arrow-right" size={28} color="#9c9c9e" {...props} />
)

export const ArrowBack = (props) => (
    <Octicons name="chevron-left" size={32} color="#e0a103" {...props} />
)

export const SearchIcon = (props) => (
    <EvilIcons name="search" size={24} color="#78787d" {...props} />
)

export const CreateIcon = (props) => (
    <Ionicons name="create-outline" size={28} color="#e0a103" {...props} />
)

export const AddIcon = (props) => (
    <Ionicons name="add" size={28} color="#e0a103" {...props} />
)

export const EllipsisIcon = (props) => (
    <Ionicons name="ellipsis-horizontal-circle" size={28} color="#e0a103" {...props} />
)

export const NewFolderIcon = (props) => (
    <Ionicons name="folder" size={32} color="#e0a103" {...props} />
)

export const PinIcon = (props) => (
    <MaterialCommunityIcons name="pin" size={32} color="#black" {...props} />
)

export const PinOffIcon = (props) => (
    <MaterialCommunityIcons name="pin-off" size={32} color="#black" {...props} />
)

export const DeleteIcon = (props) => (
    <MaterialIcons name="delete-forever" size={32} color="black" {...props} />
)

export const OrderIcon = (props) => (
    <View className="rotate-90">
        <Octicons name="arrow-switch" size={28} color="#black" {...props} />
    </View>
)

export const AddFolder = (props) => (
    <View className="relative">
        <Ionicons name="folder-outline" size={28} color="#e0a103" {...props} />
        <View className="absolute right-[-4px] bg-white rounded-full" >
            <Ionicons name="add-circle" size={16} color="#e0a103" {...props} />
        </View>
    </View>
)