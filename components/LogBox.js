import React from 'react';

import {Box, VStack, HStack, Text, Center} from 'native-base'



const LogBox = (props) => {
    return(
        <Box borderBottomWidth="1" _dark={{
            borderColor: "gray.600"
          }} borderColor="coolGray.200" pl="4" pr="5" py="2">
                  <HStack space={3} justifyContent="space-between">
                    <VStack>
                      <Text _dark={{
                  color: "warmGray.50" 
                }} color="coolGray.800" bold>
                        {props.date}
                      </Text>
                      <Center>
                      <Text color="coolGray.600" _dark={{
                  color: "warmGray.200"
                }}>
                        ph :{props.value}
                      </Text>
                      </Center>
                    </VStack>
                    <Text fontSize="xs" _dark={{
                color: "warmGray.50"
              }} color="coolGray.800" alignSelf="flex-start">
                      {props.time}
                    </Text>
                  </HStack>
                </Box>
          )
}

export default LogBox