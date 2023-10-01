import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React from 'react'

const SignUp = () => {
  return (
    <VStack spacing="5px">
        <FormControl id="firstname" isRequired>
            <FormLabel>Name</FormLabel>
            <Input
                placeholder="Enter your name"
            />
        </FormControl>
        <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
                type="email"
                placeholder="Enter your email"
            />
        </FormControl>
        <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup size="md">
                <Input 
                    placeholder="Enter Password"
                />   
                <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm">
                        Hide
                    </Button>
                </InputRightElement>      
            </InputGroup>
        </FormControl>
        <FormControl id="password" isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup size="md">
                <Input
                    placeholder="Confirm password"
                />
                <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm">
                        Hide
                    </Button>
                </InputRightElement>
            </InputGroup>
        </FormControl>
        <FormControl id="image">
            <FormLabel>Upload your Image</FormLabel>
            <Input
                type="file"
                p={1.5}
                accept="image/*"
            />
        </FormControl>
        <Button
            width="100%"
            colorScheme="blue"
            style={{ marginTop: 15 }}
        >
            Sign Up
        </Button>
    </VStack>
  )
}

export default SignUp