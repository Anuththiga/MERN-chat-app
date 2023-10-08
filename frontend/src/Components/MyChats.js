import React, { useEffect, useState } from 'react'
import { ChatState } from '../Context/ChatProvider'
import { Box, Button, Stack, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { AddIcon } from '@chakra-ui/icons';
import ChatLoading from "../Components/Shared/ChatLoading";
import { getSender } from '../Config/ChatLogics';

const MyChats = () => {
    const [loggedUser, setLoggedUser] = useState();
    const { user, chats, setChats, selectedChat, setSelectedChat } = ChatState();

    const toast = useToast();

    const fetchAllChats = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                }
            }
            const { data } = await axios.get("api/chat", config);
            setChats(data);
            console.log(data);
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: "Failed to Load the chats",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            })
        }
    };

    useEffect(() => {
        setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
        fetchAllChats();
    }, []);

    return (
        <Box
            display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
            flexDir="column"
            alignItems="center"
            p={3}
            bg="white"
            w={{ base: "100%", md: "31%" }}
            borderRadius="lg"
            borderWidth="1px"
        >
            <Box
                pb={3}
                px={3}
                fontSize={{ base: "28px", md: "30px" }}
                fontFamily="Work sans"
                display="flex"
                w="100%"
                justifyContent="space-between"
                alignItems="center"
            >
                My chats
                <Button
                    display="flex"
                    fontSize={{ base: "17px", md: "10px", lg: "17px" }}
                    rightIcon={<AddIcon />}
                >
                    New Group Chat
                </Button>
            </Box>
            <Box
                display="flex"
                flexDir="column"
                p={3}
                bg="#f8f8f8"
                w="100%"
                h="100%"
                borderRadius="lg"
                overflowY="hidden"
            >
                {chats ? (
                    <Stack overflowY="scroll">
                        {chats.map((chat) => (
                            <Box
                                onClick={() => setSelectedChat(chat)}
                                cursor="pointer"
                                px={3}
                                py={2}
                                bg={selectedChat === chat ? "#25D366" : "#e8e8e8"}
                                color={selectedChat === chat ? "white" : "black"}
                                borderRadius="lg"
                                key={chat._id}
                            >
                                <Text>
                                    {
                                        !chat.isGroupChat ? getSender(loggedUser, chat.users) : chat.chatName
                                    }
                                </Text>
                                {chat.latestMessage && (
                                    <Text fontSize="xs">
                                        <b>{chat.latestMessage.sender.name} :</b>
                                        {
                                            chat.latestMessage.content.length > 50
                                                ? chat.latestMessage.content.substring(0, 51) + "..."
                                                : chat.latestMessage.content
                                        }
                                    </Text>
                                )}
                            </Box>
                        ))}
                    </Stack>
                ) : (<ChatLoading />)}
            </Box>
        </Box>
    )
}

export default MyChats