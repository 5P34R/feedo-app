import React,{useState, useEffect} from 'react';
import 'react-native-gesture-handler'
import { NativeBaseProvider, Box, Flex, Spacer, Divider, Text, Button, Icon, Pressable, Center } from 'native-base';

import {db, getDoc, doc} from '../firebase'

import { FontAwesome5 } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

function HomeScreen({ navigation }){

    const [data, setData] = useState('')
    const [fdata, setfData] = useState('')


    const getWaterData = () => {
        db.collection("Water").get()
        .then(snapshot => {
            setfData(snapshot.docs[0].data())
        })
        console.log(fdata.date.seconds)
    }


    const getCurrentDate = ()=> {

        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
    
        //Alert.alert(date + '-' + month + '-' + year);
        // You can turn it in to your desired format
        let time =  date + '-' + month + '-' + year;//format: dd-mm-yyyy;
        setData(time)
        // getWaterData()
    }

    useEffect(() => {
        getCurrentDate();
        // getWaterData();
        // getData();
      }, []);
    
    return(

            <Box safeArea flex="1" flexDirection="column" justifyContent="space-evenly">
                <Box p={10} py={8}>
                        <Text fontSize="lg" bold>Today</Text>
                        <Text fontSize="md" italic>{data}</Text>
                </Box>
                <Flex mb={2} direction="row"  justifyContent="space-evenly">

                  <Button px={10} py={10} rounded="lg" bg="gray.100" shadow={8} onPress={() => navigation.navigate('PH')}>
                            <Flex direction='row' bottom={6}>
                                <Icon as={Fontisto} name="blood-test" size={6} color="black" />
                                <Text px={2} fontSize="lg" color="black">pH</Text> 
                            </Flex>
                            <Text alignContent="center" fontSize="2xl">80</Text> 
                        </Button>


                        <Button px={12} py={10} rounded="lg" bg="gray.100" shadow={8} onPress={() => navigation.navigate('Temperature')}>
                            <Flex direction='row' bottom={6}>
                                <FontAwesome5 name="temperature-low" size={20} color="black" />
                                <Text fontSize="xs" ml={2}>o</Text>
                               <Text fontSize="lg" color="black">C</Text> 
                                
                            </Flex>
                               <Text fontSize="2xl">80</Text> 
                            </Button>

                            
                </Flex>
                <Button onPress={() => navigation.navigate("Water")} bg="gray.100" py={8} mx={8} justifyContent="center" shadow={8}>
                   <Center>
                    <Text fontSize="md">Last Water Change</Text>
                       <Text fontWeight="bold">{
                           data
                       }</Text>
                   </Center>
                </Button>
            </Box>

)}

export default HomeScreen;