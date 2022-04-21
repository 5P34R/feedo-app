import * as React from 'react';


import { NativeBaseProvider, Box} from 'native-base';


import Navbar from './components/Navbar';
export default function App() {
  return (
    <NativeBaseProvider safeAreaTop={15}>
        <Navbar />
    </NativeBaseProvider>
  );
}