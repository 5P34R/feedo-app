import * as React from 'react';

import { LogBox } from 'react-native';

import { NativeBaseProvider, Box} from 'native-base';


import Navbar from './components/Navbar';


LogBox.ignoreLogs(['Setting a timer']);
export default function App() {
  return (
    <NativeBaseProvider safeAreaTop={15}>
        <Navbar />
    </NativeBaseProvider>
  );
}