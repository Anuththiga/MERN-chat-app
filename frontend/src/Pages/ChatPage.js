import React, { useState } from 'react';
import { ChatState } from "../Context/ChatProvider";
import Header from '../Components/Header';
import { Box } from '@chakra-ui/react';
import MyChats from '../Components/MyChats';
import ChatBox from '../Components/ChatBox';

const ChatPage = () => {
  const { user } = ChatState();
  const [updateAgain, setUpdateAgain] = useState(false);

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
        {user && <MyChats updateAgain={updateAgain} />}
        {user && (
          <ChatBox updateAgain={updateAgain} setUpdateAgain={setUpdateAgain} />
        )}
      </Box>
    </div>
  )
}

export default ChatPage