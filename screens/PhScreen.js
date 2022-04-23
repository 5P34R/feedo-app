import react,{ useEffect, useState } from "react";
import { Box, Button, Heading, FlatList, HStack, Avatar, VStack, Text, Spacer, Center } from "native-base";
import { db } from '../firebase'

import { Ionicons } from '@expo/vector-icons';

import LogBox from "../components/LogBox"; 
import Header from "../components/GoBack";


const PhScreen = ({ navigation }) => {

  const [pHs, setPHs] = useState([])

  function epochToTime(time){
    var data = new Date(time * 1000).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})
    date = `${data.split(" ")[1]+" "+data.split(" ")[2]+", "+data.split(" ")[4]}`
    return { 
      date: date,
      time: data.split(" ")[3]
    }
  }


  useEffect(() => {
    db.collection('pH')
    .get()
    .then(result => result.docs)
    .then(docs => docs.map(
      doc => ({
        id: doc.id,
        value: doc.data().value,
        time: epochToTime(doc.data().createdAt.seconds).time,
        date: epochToTime(doc.data().createdAt.seconds).date
      })
     
    ))
    .then(res => setPHs(res))
}
,[])

      return (
      <Box safeArea>
        <HStack p={4}>
            <Button bg="gray.100" onPress={() => navigation.navigate("Home")}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </Button>
              <Text p={4} fontSize="xl">pH logs</Text>
        </HStack>

        
        <Center>
          <Heading fontSize="xl" p="4" pb="3" mb={2}>
            pH Values
          </Heading>
        </Center>
          <FlatList 
            data={pHs}
            renderItem={({
              item
            }) => <LogBox date={item.date} value={item.value} time={item.time}/>
          
          } keyExtractor={item => item.id}
            />
          </Box>
         )
}

export default PhScreen;