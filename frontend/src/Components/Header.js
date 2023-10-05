import React, { useState } from 'react';
import { Avatar, Flex, Button, Menu, MenuButton, MenuList, Text, Tooltip, MenuItem, MenuDivider, Drawer, useDisclosure, DrawerOverlay, DrawerContent, DrawerBody, DrawerHeader, Box, Input, useToast } from "@chakra-ui/react";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { ChatState } from '../Context/ChatProvider';
import ProfileModal from './Modal/ProfileModal';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ChatLoading from './Shared/ChatLoading';
import UserListItem from './Shared/UserListItem';


const Header = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [ searchResult, setSearchResult] = useState([]);

  const { isOpen, onOpen, onClose } = useDisclosure()
  const { user } = ChatState();

  const navigate = useNavigate();
  const toast = useToast();

  const logout = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  const handleSearch = async () => {
    if(!search) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
        toast({
          title: "Error Occured!",
          description: "Failed to Load the Search Results",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-left",
        });
    }
  };

  return (
    <>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="2px"
      >
        <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
          <Button variant="ghost" onClick={onOpen}>
            <i className="fa fa-search" aria-hidden="true"></i>
            <Text d={{ base: "none", md: "flex" }} px={4}>
              Search User
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize="2xl" fontFamily="Work sans">
          Chatter
        </Text>
        <div>
          <Menu>
            <MenuButton p={1}>
              <BellIcon fontSize="2xl" m={1} />
            </MenuButton>
            {/* <MenuList></MenuList> */}
          </Menu>

          <Menu>
            <MenuButton as={Button} bg="white" rightIcon={<ChevronDownIcon />}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.image}
              />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={logout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Flex>

      <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <Box display="flex" pb={2}>
              <Input
                placeholder="Search b name or email"
                value={search}
                mr={2}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {loading ? (<ChatLoading />) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                />
              ))
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default Header