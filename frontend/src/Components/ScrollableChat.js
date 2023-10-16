import React from 'react';
import ScrollableFeed from 'react-scrollable-feed';
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from '../Config/ChatLogics';
import { Avatar, Tooltip } from '@chakra-ui/react';
import { ChatState } from '../Context/ChatProvider';

const ScrollableChat = ({ messages }) => {
    const { user } = ChatState();
    return (
        <ScrollableFeed>
            {messages && messages.map((message, index) => (
                <div style={{ display: "flex" }} key={message._id}>
                    {(isSameSender(messages, message, index, user._id) ||
                        isLastMessage(messages, index, user._id)) && (
                            <Tooltip label={message.sender.name} placement="bottom-start" hasArrow>
                                <Avatar
                                    mt="7px"
                                    name={message.sender.name}
                                    src={message.sender.image}
                                    mr={1}
                                    size="sm"
                                    cursor="pointer"
                                />
                            </Tooltip>
                        )}
                    <span style={{
                        backgroundColor: `${message.sender._id === user._id ? "#bee3f8" : "#b9f5d0"
                            }`,
                        padding: "5px 15px",
                        maxWidth: "75%",
                        borderRadius: "20px",
                        marginLeft: isSameSenderMargin(messages, message, index, user._id),
                        marginTop: isSameUser(messages, message, index, user._id) ? 3 : 10,
                    }}>
                        {message.content}
                    </span>
                </div>

            ))}
        </ScrollableFeed>
    )
}

export default ScrollableChat