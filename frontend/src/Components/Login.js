import React from 'react';
import { VStack, FormControl, FormLabel, Input, Button, InputGroup, InputRightElement } from "@chakra-ui/react";

const Login = () => {
  return (
    <VStack spacing="10px">
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input 
          type="email"
          placeholder="Enter your Email"
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input 
            type="password"
            placeholder="Enter password"
          />  
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm">
              Hide
            </Button>
          </InputRightElement>   
        </InputGroup>
      </FormControl>
      <Button
        width="100%"
        colorScheme="blue"
        style={{ marginTop: 15 }}
      >
        Login
      </Button>
    </VStack>
  )
}

export default Login