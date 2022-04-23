import React from 'react'
import { Box, Button, HStack, Text } from 'native-base'
import { Ionicons } from '@expo/vector-icons';


const Header = (props) => {
    return (
        <HStack p={4}>
            <Button bg="gray.100" onPress={navigation.navigate("Home")}>
            <Ionicons name="arrow-back" size={24} color="black" />
            </Button>
            <Text>{props.title}</Text>
        </HStack>
    )
}

export default Header;