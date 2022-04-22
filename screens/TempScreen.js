import React, {useEffect, useState} from 'react'
import { Button, Box, Text } from 'native-base'

import {db} from '../firebase'


const Temperature = ({ navigation }) => {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        db.collection('tasks')
        .get()
        .then(result => result.docs)
        .then(docs => docs.map( doc => ({
            id: doc.id,
            value: doc.data().value,
            createdAt : doc.data().createdAt
        }) ))
        .then(tasks => setTasks(tasks))
    }
    ,[])
    return (
        <Box safeArea>
            {
                tasks.map(task => 
                <Text>{task.value}</Text>
                )
            }
        </Box>
    )
}

export default Temperature;