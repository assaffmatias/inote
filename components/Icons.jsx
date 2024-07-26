import { Ionicons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

export const FolderIcon = (props) => (
    <Ionicons name="folder-outline" size={28} color="#e0a103" {...props}/>
)

export const FolderIconGrey = (props) => (
    <Ionicons name="folder-outline" size={18} color="#9c9c9e" {...props} />
)

export const ArrowRightIcon = (props) => (
    <EvilIcons name="arrow-right" size={32} color="#9c9c9e" {...props}/>
)

export const ArrowBack = (props) => (
    <Octicons name="chevron-left" size={32} color="#e0a103" {...props}/>
)

export const SearchIcon = (props) => (
    <EvilIcons name="search" size={24} color="#78787d" {...props}/>
)

export const CreateIcon = (props) => (
    <Ionicons name="create-outline" size={28} color="#e0a103" {...props}/>
)

export const AddIcon = (props) => (
    <Ionicons name="add" size={28} color="#e0a103" {...props}/>
)

export const EllipsisIcon = (props) => (
    <Ionicons name="ellipsis-horizontal-circle" size={28} color="#e0a103" {...props}/>
)

export const NewFolderIcon = (props) => (
    <Ionicons name="folder" size={32} color="#e0a103" {...props}/>
)

export const PinIcon = (props) => (
    <MaterialCommunityIcons name="pin" size={24} color="#454545" {...props}/>
)

export const DeleteIcon = (props) => (
    <MaterialCommunityIcons name="delete-forever" size={28} color="#454545" {...props}/>
)

export const EraseIcon = (props) => (
    <MaterialCommunityIcons name="eraser" size={24} color="#454545" {...props}/>
)

export const CloseCircleIcon = (props) => (
    <Ionicons name="close-circle" size={24} color="#454545" {...props}/>
)

export const PinOffIcon = (props) => (
    <MaterialCommunityIcons name="pin-off" size={24} color="#454545" {...props}/>
)