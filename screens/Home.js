import React,{useState, useEffect} from 'react';
import 'react-native-gesture-handler'
import { NativeBaseProvider, Box, Flex, Spacer, Divider, Text, Button, Icon } from 'native-base';

import { fireDB } from '../firebase';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

function HomeScreen({ navigation }){

    const [data, setData] = useState('')
    const [fdata, setfData] = useState('')

    const cityRef = fireDB.doc(db, 'cities', 'BJ');
    setDoc(cityRef, { capital: true }, { merge: true });
    setfData(cityRef)

    const getCurrentDate = ()=> {

        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
    
        //Alert.alert(date + '-' + month + '-' + year);
        // You can turn it in to your desired format
        let time =  date + ' ' + month + ' ' + year;//format: dd-mm-yyyy;
        setData(time)
    }

    useEffect(() => {
        getCurrentDate();
      }, []);
    
    return(
        <NativeBaseProvider>
            <Box safeArea flex="1" >
                <Box p={10} py={8}>
                        <Text fontSize="lg" bold>Today</Text>
                        <Text fontSize="lg" bold>{fdata}</Text>
                        <Text fontSize="md" italic>{data}</Text>
                </Box>
                <Flex mb={2} direction="row"  justifyContent="space-evenly">
                     <Box px={8} py={10} rounded="lg" bg="gray.100" shadow={8}>
                            <Flex direction='row' bottom={6}>
                            <Fontisto name="blood-test" size={20} color="black" />
                               <Text px={2} fontSize="lg" color="black">ph</Text> 
                               
                            </Flex>
                               <Text fontSize="xl">80</Text> 
                            </Box>

                            <Box px={6} py={10} rounded="lg" bg="gray.100" shadow={8}>
                            <Flex direction='row' bottom={6}>
                                <FontAwesome5 name="temperature-low" size={20} color="black" />
                               <Text px={2} fontSize="lg" color="black">Temp</Text> 
                                
                            </Flex>
                               <Text fontSize="xl">80</Text> 
                            </Box>
                </Flex>
                    <Flex mt={2} direction='row' justifyContent="space-around">
                        <Box px={6} py={10} rounded="lg" bg="gray.100" shadow={8}>
                                <Flex direction='row' bottom={6}>
                                <Ionicons name="water" size={24} color="black" />
                                <Text px={2} fontSize="lg" color="black">Water</Text> 
                               
                                </Flex>
                                <Text fontSize="xl">80</Text> 
                                </Box>

                            <Box px={6} py={10} rounded="lg" bg="gray.100" shadow={8}>
                                <Flex direction='row' bottom={6}>
                                <Entypo name="circle" size={24} color="black" />
                                <Text px={2} fontSize="lg" color="black">cond..</Text> 
                                
                                </Flex>
                               <Text fontSize="xl">80</Text> 
                            </Box>
                    </Flex>
            </Box>
        </NativeBaseProvider>
)}

export default HomeScreen;