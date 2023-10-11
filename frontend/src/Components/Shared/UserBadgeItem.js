import { Badge } from '@chakra-ui/react'
import React from 'react';
import { CloseIcon } from "@chakra-ui/icons";

const UserBadgeItem = ({ user, handleFunction, admin }) => {
    return (
        <Badge
            px={2}
            py={1}
            m={1}
            mb={2}
            fontSize={12}
            cursor="pointer"
            borderRadius="lg"
            variant="solid"
            colorScheme="purple"
            onClick={handleFunction}
        >
            {user.name}
            {admin === user._id && <span> (Admin)</span>}
            <CloseIcon pl={1} />
        </Badge>
    )
}

export default UserBadgeItem