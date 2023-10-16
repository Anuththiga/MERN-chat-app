import React, { useEffect, useState } from 'react'
import { ChatState } from '../Context/ChatProvider'
import { Box, FormControl, IconButton, Input, Spinner, Text, useToast } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { getSender, getSenderDetails } from '../Config/ChatLogics';
import ProfileModal from './Modal/ProfileModal';
import UpdateGroupChatModal from './Modal/UpdateGroupChatModal';
import axios from 'axios';
import ScrollableChat from './ScrollableChat';

const SingleChat = ({ updateAgain, setUpdateAgain }) => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    const toast = useToast();

    const { selectedChat, setSelectedChat, user } = ChatState();
   
    const fetchMessages = async () => {
        if(!selectedChat) return;

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            setLoading(true);

            const { data } = await axios.get(`api/message/${selectedChat._id}`, config);

            setMessages(data);
            setLoading(false);

        } catch (error) {
            toast({
                title: "Error Occured!",
                description: "Failed to Load the Messages",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
              });
        }
    };
    
    
    const typingHandler = (e) => {
        setNewMessage(e.target.value);
    }

    const sendMessage = async (event) => {
        if(event.key === "Enter" && newMessage) {
            try {
                const config = {
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${user.token}`,
                    }
                };
                setNewMessage("");
                const { data } = await axios.post("/api/message", {
                    content: newMessage,
                    chatId: selectedChat
                },
                config
                );

                setMessages([...messages, data]);
            } catch (error) {
                toast({
                    title: "Error Occured!",
                    description: "Failed to send the Message",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                  });
            }
        }
    };

    useEffect(() => {
        fetchMessages();
    }, [selectedChat]);
    console.log(messages)

    return (
    <>
    {selectedChat ? (
    <>
        <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
        >
            <IconButton
                display={{ base: "flex", md: "none" }}
                icon={<ArrowBackIcon />}
                onClick={() => setSelectedChat("")}
            />
                {!selectedChat.isGroup ? (
                    <>
                        {getSender(user, selectedChat.users)}
                        <ProfileModal user={getSenderDetails(user, selectedChat.users)} />
                    </>
                ) : (
                    <>
                    {selectedChat.chatName.toUpperCase()}
                    <UpdateGroupChatModal 
                        updateAgain={updateAgain}
                        setUpdateAgain={setUpdateAgain}
                        fetchMessages={fetchMessages}
                    />
                    </>
                )}
        </Text>
        <Box
            display="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#e8e8e8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
        >
            {loading ? (
                <Spinner 
                    size="xl"
                    w={20}
                    h={20}
                    alignSelf="center"
                    margin="auto"
                />
            ) : (
                <div
                    style={{ 
                        display: "flex",
                        flexDirection: "column",
                        overflowY: "scroll", 
                        scrollbarWidth: "none" 
                    }}
                >
                    <ScrollableChat messages={messages} />
                </div>
            )}
            <FormControl
                isRequired
                mt={3}
                onKeyDown={sendMessage}
            >
                <Input 
                    variant="filled"
                    bg="e0e0e0"
                    placeholder="Enter a message..."
                    value={newMessage}
                    onChange={typingHandler}
                />
            </FormControl>

        </Box>
    </>
    )
    : (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            h="100%"
        >
            <Text fontFamily="Work sans" fontSize="3xl" pb={3}>
                Click on a user to start chatting
            </Text>
        </Box>
    )}
    </>
  )
}

export default SingleChat