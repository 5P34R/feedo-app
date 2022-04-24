import react,{ useEffect, useState } from "react";
import { Box, Button, Heading, FlatList, HStack, Avatar, VStack, Text, Spacer, Center } from "native-base";
import { db } from '../firebase'

import { Ionicons } from '@expo/vector-icons';

import LogBox from "../components/LogBox"; 
import Header from "../components/GoBack";


const Temperature = ({ navigation }) => {

  const [temp, setTemp] = useState([])

  function epochToTime(time){
    var data = new Date(time * 1000).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})
    date = `${data.split(" ")[1]+" "+data.split(" ")[2]+", "+data.split(" ")[4]}`
    //console.log("time "+time)
    return { 
      date: date,
      time: data.split(" ")[3]
    }
  }

  function getTemp(){
    db.collection('temperature')
    .get()
    .then(result => result.docs)
    .then(docs => docs.map(
      doc => ({
        id: doc.id,
        value: doc.data().value,
        time : epochToTime(doc.data().myMap.name).time,
        date : epochToTime(doc.data().myMap.name).date
        // timestamp: doc.data().myMap?.name
        // time: epochToTime(doc.data().MyMap?.name).time,
        // date: epochToTime(doc.data().MyMap?.name).date,
      })
    ))
    .then(res => setTemp(res))
  }

  useEffect(() => {
    db.collection('temperature').onSnapshot({
      next: querySnapshot => {
        const res = querySnapshot.docs.map(
          docSnapshot => ({
            id:docSnapshot.id,
            value: docSnapshot.data().value,
            time : epochToTime(docSnapshot.data().myMap.name).time,
            date: epochToTime(docSnapshot.data().myMap.name).date
          })
        )
          setTemp(res)
      },
      error: (error) => console.log(error)
    })

    getTemp()
    }
    ,[setTemp])
      return (
      <Box safeArea>
        <HStack p={4}>
            <Button bg="gray.100" onPress={() => navigation.navigate("Home")}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </Button>
              <Text p={4} fontSize="xl">Temperature logs</Text>
        </HStack>

        
        <Center>
          <Heading fontSize="xl" p="4" pb="3" mb={2}>
          Temperature Values
          </Heading>
        </Center>
          <FlatList 
            data={temp}
            renderItem={({
              item
            }) => <LogBox type="temp" date={item.date} value={item.value} time={item.time}/>
          
          } keyExtractor={item => item.id}
            />
          </Box>
         )
}

export default Temperature;