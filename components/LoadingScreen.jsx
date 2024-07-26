import { View, Image } from 'react-native';
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';

const icon = require('../assets/app-icon.png')

export function LoadingScreen({ setLoading }) {

  useEffect(() => {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000);

      return () => clearTimeout(timer);
    }, []);


  return (
    <View className="w-full h-full justify-center items-center bg-black" >
      <StatusBar hidden />
        <Image source={icon} className="w-[150px] h-[150px]" />
    </View>
  )
}