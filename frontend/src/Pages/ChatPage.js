import React from 'react';
import { ChatState } from "../Context/ChatProvider";
import Header from '../Components/Header';

const ChatPage = () => {
  const { user } = ChatState();

  return (
    <div style={{ width: "100%" }}>
      {user && <Header />}
    </div>
  )
}

export default ChatPage