import { Avatar, Box, Text } from '@chakra-ui/react';
import React from 'react';

const UserListItem = ({ user, handleFunction }) => {

    return (
        <Box
            onClick={handleFunction}
            cursor="pointer"
            bg="#e8e8e8"
            _hover={{
                background: "#25D366",
                color: "white",
            }}
            w="100%"
            display="flex"
            alignItems="center"
            color="black"
            px={3}
            py={2}
            mb={2}
            borderRadius="lg"
        >
            <Avatar
                cursor="pointer"
                mr={2}
                size="sm"
                name={user.name}
                src={user.image}
            />
            <Box>
                <Text>{user.name}</Text>
                <Text fontSize="xs"><b>Email :</b>{user.email}</Text>
            </Box>
        </Box>
    )
}

export default UserListItem