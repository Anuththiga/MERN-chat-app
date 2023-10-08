import React from 'react';
import { ChatState } from "../Context/ChatProvider";
import Header from '../Components/Header';
import { Box } from '@chakra-ui/react';
import MyChats from '../Components/MyChats';

const ChatPage = () => {
  const { user } = ChatState();

  return (
    <div style={{ width: "100%" }}>
      {user && <Header />}
      <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        h="91.5vh"
        p="10px"
      >
        {user && <MyChats />}
      </Box>
    </div>
  )
}

export default ChatPage