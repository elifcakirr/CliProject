
import React from 'react';
import DrawerNavigation from './src/navigation/DrawerNavigation';
import { Provider as PaperProvider } from 'react-native-paper';

export default function App() {
  return (
    <PaperProvider>
      <DrawerNavigation />
    </PaperProvider>




  )
}

