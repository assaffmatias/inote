import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [notes, setNotes] = useState([]);
  const router = useRouter();

  const storeData = async (id, title, text, date, pinned) => {
    try {
      const newNote = { id, title, text, date, pinned };
      const existingNotes = await AsyncStorage.getItem('@notes');
      const currentNotes = existingNotes ? JSON.parse(existingNotes) : [];
      const updatedNotes = [...currentNotes, newNote];

      await AsyncStorage.setItem('@notes', JSON.stringify(updatedNotes));

      router.navigate('/home');
    } catch (error) {
      console.error(error);
    }
  };

  const editData = async (id, title, text, pinned) => {
    try {
      const value = await AsyncStorage.getItem('@notes');
      let notes = JSON.parse(value);
  
      const foundIndex = notes.findIndex(note => note.id === id);
  
      if (foundIndex !== -1) {
        notes[foundIndex].title = title;
        notes[foundIndex].text = text;
        notes[foundIndex].pinned = pinned;
  
        await AsyncStorage.setItem('@notes', JSON.stringify(notes));
        
        router.navigate('/home');
      } else {
        console.log('Note with ID', id, 'not found.');
      }
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        state: notes,
        storeData,
        editData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;