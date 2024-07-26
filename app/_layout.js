import { View } from "react-native";
import { AppProvider } from "../components/AppContext";
import { Slot } from "expo-router";
import { LoadingScreen } from "../components/LoadingScreen";
import { useState, useEffect } from "react";

export default function Layout() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simular la carga inicial de la aplicación
        const loadData = async () => {
          try {
            // Aquí puedes realizar tareas de inicialización, carga de datos, etc.
            // Simulación de carga por tiempo
            setTimeout(() => {
              setLoading(false); // Después de 3 segundos, ocultar la pantalla de carga
            }, 3000); // 3000 milisegundos = 3 segundos
    
          } catch (error) {
            console.error('Error loading data:', error);
          }
        };
    
        loadData(); // Llamada a la función de carga inicial
    
      }, []);

      if (loading) {
        return <LoadingScreen setLoading={setLoading} />;
      }

    return (
        <AppProvider>
            <View className="flex-1 bg-[#f1f1f6]">
                <Slot /> 
            </View>
        </AppProvider>
    )
}