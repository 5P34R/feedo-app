import React,{ useState, useEffect } from 'react'
import { Alert } from 'react-native';
import { Text, Box, HStack, Button, Center, Heading, Flex, Modal, FormControl, Input, FlatList } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import  DateTimePicker from '@react-native-community/datetimepicker';
import { db } from '../firebase'




const WaterChange = ({ navigation }) => {

    const [showModal, setShowModal] = useState(false);
    const [pastDate, setPastDate] = useState(new Date(1598051730000))
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate;
      setShow(false);
      setDate(currentDate);
    };

    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    };

    const showDatepicker = () => {
      showMode('date');
    };

    const showTimepicker = () => {
      showMode('time');
    };

    // convert to time
    function epochToTime(time){
      let t = time;
      var data = new Date(t * 1000).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})
      date = `${data.split(" ")[1]+" "+data.split(" ")[2]+", "+data.split(" ")[4]}`
      return { 
        date: date,
        time: data.split(" ")[3]
      }
    }

    const getData = () => {
      db.collection('Water')
      .get()
      .then(result => result.docs)
      .then(docs => docs.map(
        doc => ({
          id: doc.id,
          date: doc.data().date.seconds,
        })
      ))
      .then(res => setPastDate(res))
    }

    useEffect(() => {
      db.collection('Water').onSnapshot({
        next: querySnapshot => {
          const res = querySnapshot.docs.map(
            docSnapshot => ({
              id:docSnapshot.id,
              date: docSnapshot.data().date
            })
          )
          setPastDate(res)
        },
        error : (error) => console.log(error)
      })
      getData()
    },[setPastDate])



    const sendData = (date) => {
    // send to firestore
    if(date){
      db.collection('Water').add({
        date: date
      }).then(res => Alert("Added"))
      .catch(err => console.log(err))
     }
   // console.log("called")
    }
    

    return (
        <Box safeArea>
        <HStack p={4}>
            <Button bg="gray.100" onPress={() => navigation.navigate("Home")} >
            <Ionicons name="arrow-back" size={24} color="black" />
            </Button>
              <Text p={4} fontSize="xl">Water Change logs</Text>
        </HStack>

        
        <Flex direction='row' justifyContent="space-around">
          <Heading fontSize="xl" p="4" pb="3" mb={2}>
          Recent Water Change
          </Heading>
          <Button bg="gray.100" onPress={() => setShowModal(true)}>
            <Ionicons name="add" size={24} color="black" />
          </Button>
        </Flex>

         {/* Modal */}
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Select</Modal.Header>
          <Modal.Body>
          <Button onPress={showDatepicker} bg="gray.100"><Text>Show date picker!</Text></Button>
          <Button onPress={showTimepicker} bg="gray.100"><Text>Show time picker!</Text></Button>
          <Center>
          <Text>Current: {date.toLocaleString()}</Text>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              onChange={onChange}
            />)}
          </Center>
          
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button variant="ghost" colorScheme="blueGray" onPress={() => {
              setShowModal(false);
            }}>
                Cancel
              </Button>
              <Button onPress={() => {
                setShowModal(false);
                sendData(date);
            }}>
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

            {/* FlatList View */}
            <FlatList data={pastDate}
            renderItem={({
              item
            }) => 
            <Center p={4}>
              <Text fontSize="md">{
                item.date ? new Date(item.date * 1000).toLocaleString():undefined
              }</Text>
            </Center>
          } keyExtractor={item => item.id}
            /> 
            
            </Box>

         )
}

export default WaterChange 