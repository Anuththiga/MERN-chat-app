import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useState } from 'react';
import { useToast } from '@chakra-ui/react';

const SignUp = () => {
    const [show, setShow] = useState(false);

    const toast = useToast()

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmpassword, setConfirmpassword] = useState();
    const [image, setImage] = useState();
    const [imageLoading, setImageLoading] = useState(false);

    const handleClick = () => setShow(!show);
    const postDetails = (img) => {
        setImageLoading(true);
        if(img === undefined) {
            toast({
                title: "Please Select an Image!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
              });
              return;
        }

        if (img.type === "image/jpeg" || img.type === "image/png") {
            const data = new FormData();

            data.append("file", img);
            data.append("upload_preset", "chatter-app");
            data.append("cloud_name", "du1dwf1dp");
            fetch("https://api.cloudinary.com/v1_1/du1dwf1dp/image/upload", {
                method: "post",
                body: data,
            })
            .then((res) => res.json())
            .then((data) => {
                setImage(data.url.toString());
                console.log(data.url.toString());
                setImageLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setImageLoading(false);
            });
        } else {
            toast({
                title: "Please Select an Image!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
              });
              setImageLoading(false);
              return;
        }
    };
    const submit = () => {};

  return (
    <VStack spacing="5px">
        <FormControl id="firstname" isRequired>
            <FormLabel>Name</FormLabel>
            <Input
                placeholder="Enter your name"
                onChange={(e) => setName(e.target.value)}
            />
        </FormControl>
        <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
                type="email"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
            />
        </FormControl>
        <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup size="md">
                <Input 
                    type={show ? "text" : "password"}
                    placeholder="Enter Password"
                    onChange={(e) => setPassword(e.target.value)}
                />   
                <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                    </Button>
                </InputRightElement>      
            </InputGroup>
        </FormControl>
        <FormControl id="confirm-password" isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup size="md">
                <Input
                    type={show ? "text" : "password"}
                    placeholder="Confirm password"
                    onChange={(e) => setConfirmpassword(e.target.value)}
                />
                <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? "Hide" : "Show"}
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
                onChange={(e) => postDetails(e.target.files[0])}
            />
        </FormControl>
        <Button
            width="100%"
            colorScheme="blue"
            style={{ marginTop: 15 }}
            onClick={submit}
            isLoading={imageLoading}
        >
            Sign Up
        </Button>
    </VStack>
  )
}

export default SignUp