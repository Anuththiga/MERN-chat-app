import { Box } from '@chakra-ui/react'
import React from 'react'
import { ChatState } from '../Context/ChatProvider'
import SingleChat from './SingleChat';

const ChatBox = ({ updateAgain, setUpdateAgain }) => {
  const { selectedChat } = ChatState();

  return (
    <Box
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      bg="white"
      borderRadius="lg"
      borderWidth="1px"
      w={{ base: "100%", md: "68.5%" }}
    >
      <SingleChat updateAgain={updateAgain} setUpdateAgain={setUpdateAgain} />
    </Box>
  )
}

export default ChatBox