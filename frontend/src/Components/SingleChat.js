import React from 'react'
import { ChatState } from '../Context/ChatProvider'
import { Box, IconButton, Text } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { getSender, getSenderDetails } from '../Config/ChatLogics';
import ProfileModal from './Modal/ProfileModal';
import UpdateGroupChatModal from './Modal/UpdateGroupChatModal';

const SingleChat = ({ updateAgain, setUpdateAgain }) => {
    const { selectedChat, setSelectedChat, user } = ChatState();
  console.log(selectedChat)
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