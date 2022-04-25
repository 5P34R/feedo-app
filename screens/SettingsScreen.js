import React,{useState} from 'react';
import 'react-native-gesture-handler'
import {Box, Button, Center, HStack, Text, Flex, Heading, VStack} from 'native-base'

import { Ionicons } from '@expo/vector-icons';
import  DateTimePicker from '@react-native-community/datetimepicker';
import { db } from '../firebase'
import { FlatList } from 'react-native-gesture-handler';

function SettingsScreen({ navigation }) {

    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('time');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate;
      setShow(false);
      setDate(currentDate);
      sendValue();
    };

    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    };

    // const showDatepicker = () => {
    //   showMode('date');
    // };

    const showTimepicker = () => {
      showMode('time');
    };

    //firebase
     const sendValue = async ()=> {
     await db.collection("Dispensor").add({
        id: 2,
        time : date
      })
      .then(res => console.log(res))
      .catch(err => console.log(err))
      // console.log(date.toLocaleString())
    }

    return (
      <Box safeArea>
        <HStack p={4}>
            <Button bg="gray.100" onPress={() => navigation.navigate("Home")} >
            <Ionicons name="arrow-back" size={24} color="black" />
            </Button>
              <Text p={4} fontSize="xl">Dispensor Timing</Text>
        </HStack>

          <Center> 
            <Heading fontSize="xl" p="4" pb="3" mb={2} >
              Select time for Dispensor
            </Heading>
          </Center>

       <Center>
       <Button bg="tomato" onPress={showTimepicker}><Text>Select time!</Text></Button>
       <Center>
          <Text>Current: { date ? date.toLocaleString().split(" ")[3] : "Choose time"}</Text>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={false}
              onChange={onChange}
            />)}
          </Center>
       </Center>

       <FlatList />

        </Box>
    );
}

export default SettingsScreen;