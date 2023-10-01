import React, { useState } from 'react';
import { VStack, FormControl, FormLabel, Input, Button, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useToast } from '@chakra-ui/react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);

  const navigate = useNavigate();
  const toast = useToast();

  const handleClick = () => setShow(!show);

  const submit = async () => {
    setIsLoading(true);
    if (!email || !password) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setIsLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        }
      };

      const { data } = await axios.post("api/user/login", { email, password }, config);
      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setIsLoading(false);
      navigate("/chats");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setIsLoading(false);
    }
  }

  return (
    <VStack spacing="10px">
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        width="100%"
        colorScheme="blue"
        style={{ marginTop: 15 }}
        isLoading={isLoading}
        onClick={submit}
      >
        Login
      </Button>
      <Button
        width="100%"
        colorScheme="red"
        variant="solid"
        onClick={() => {
          setEmail("guest@example.com");
          setPassword("1234");
        }}
      >
        Guest User Login
      </Button>
    </VStack>
  )
}

export default Login