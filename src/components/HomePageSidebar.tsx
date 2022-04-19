import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { FaBell, FaClipboardCheck, FaHashtag, FaRss } from "react-icons/fa";
import { AiFillGift } from "react-icons/ai";
import { BsGearFill, BsPlus } from "react-icons/bs";
import { FiMenu, FiSearch } from "react-icons/fi";
import { HiCode, HiCollection } from "react-icons/hi";
import { MdHome, MdOpenInNew } from "react-icons/md";
import React from "react";
import { useColorMode } from "@chakra-ui/react";
import ChatSection from "./ChatSection";
import { useState } from "react";
import { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { doc, setDoc } from "firebase/firestore"; 
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { onSnapshot, orderBy, query } from "firebase/firestore";
import { Logout, Moon, Sun } from "tabler-icons-react";
import { auth } from "../firebase/firebase";
import {
  Menu, // The wrapper component provides context, state, and focus management.
  MenuButton, // The wrapper for the menu items. Must be a direct child of Menu.
  MenuList, // The trigger for the menu list. Must be a direct child of Menu.
  MenuItem, // The trigger that handles menu selection. Must be a direct child of a MenuList.
  MenuItemOption, // A wrapper to group related menu items.
  MenuGroup, // A visual separator for menu items and groups.
  MenuOptionGroup, // A wrapper for checkable menu items (radio and checkbox).
  MenuDivider, //  The checkable menu item, to be used with MenuOptionGroup.
} from '@chakra-ui/react'
export default function Swibc({name, profilePic, email,chosenCollection, setCollection}) {

  const [channels, setChannels] = useState([])
  const { isOpen, onOpen, onClose } = useDisclosure() // Chakra modal 
  const [newChannelName, setNewChannelName] = useState("")

  async function addChannel(){
    // Add new chat group to the database
    // Add a new document in collection "cities" with "LA" add id
    var inputValue = (document.getElementById("newChannelInput") as HTMLInputElement).value
    await setDoc(doc(db, "chats", inputValue), {
    });
  }
  useEffect(() => {
   setChannels([])
    onSnapshot(collection(db, "chats"), (snapshot)=>{
         setChannels([])
      snapshot.docs.map(doc=> setChannels((channels) => [...channels,doc.id]))
    })
 
}, [])


function signOut(){
  auth.signOut()
}


  const sidebar = useDisclosure();
 const { colorMode, toggleColorMode } = useColorMode()
  const NavItem = (props) => {
    const { icon, children, ...rest } = props;
    return (
      <Flex
        align="center"
        px="4"
        mx="2"
        rounded="md"
        py="3"
        cursor="pointer"
        color="whiteAlpha.700"
        _hover={{
          bg: "blackAlpha.300",
          color: "whiteAlpha.900",
        }}
        role="group"
        fontWeight="semibold"
        transition=".15s ease"
        {...rest}
      >
          
        {icon && (
          <Icon
            mr="2"
            boxSize="4"
            _groupHover={{
              color: "gray.300",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    );
  };

  const SidebarContent = (props) => (
    <Box
      as="nav"
      pos="fixed"
      top="0"
      left="0"
      zIndex="sticky"
      h="full"
      pb="10"
      overflowX="hidden"
      overflowY="auto"
      bg="brand.600"
      borderColor="blackAlpha.300"
      borderRightWidth="1px"
      w="60"
      {...props}
    >
      <Flex px="4" py="5" align="center">
 
        <Text
        color={useColorModeValue("Black","white")}
        fontSize="2xl" ml="2" fontWeight="semibold">
          TechTalk
        </Text>
      </Flex>
      <Flex p={'1rem'} justifyContent={'space-between'} alignItems={'center'}>
      <p>Create new channel</p>
      <BsPlus onClick={onOpen} style={{ cursor: 'pointer'}}/>

      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Channel name</ModalHeader>
          <ModalCloseButton />
          <Flex justifyContent={'center'} alignItems={'center'}>
          <Input 
          w={'80%'} 
          variant='filled'
          id="newChannelInput"
          placeholder='Channel name...'  />
          </Flex>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={()=>{onClose(); addChannel()}}>
              Add
            </Button>
            <Button variant='ghost' onClick={()=>{onClose()}}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Flex
        direction="column"
        as="nav"
        fontSize="sm"
        color="gray.600"
        aria-label="Main Navigation"
      >
        {channels.map(channel =>(
          <NavItem 
          color={"gray"}
          onClick={(e)=>{e.preventDefault(); setCollection(channel)}}
          icon={FaHashtag}> {channel}</NavItem>
        ))}
      
      </Flex>
    </Box>
  );
  return (
    <Box
      as="section"
      bg={useColorModeValue("gray.50", "gray.700")}
      minH="100vh"
      minW='100%'
    >
      <SidebarContent display={{ base: "none", md: "unset" }} />
      <Drawer
        isOpen={sidebar.isOpen}
        onClose={sidebar.onClose}
        placement="left"
      >
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent w="full" borderRight="none" />
        </DrawerContent>
      </Drawer>
      <Box ml={{ base: 0, md: 60 }} transition=".3s ease">
        <Flex
          as="header"
          align="center"
          justify="space-between"
          w="full"
          px="4"
          bg={useColorModeValue("white", "gray.800")}
          borderBottomWidth="1px"
          borderColor="blackAlpha.300"
          h="14"
        >
          <IconButton
            aria-label="Menu"
            display={{ base: "inline-flex", md: "none" }}
            onClick={sidebar.onOpen}
            icon={<FiMenu />}
            size="sm"
          />
          
            <Text># {chosenCollection}</Text>
          

          <Flex align="center">
          <Button onClick={toggleColorMode}>
         {colorMode === 'light' ? <Moon/> : <Sun/>}
          </Button>
          <Menu>
            <MenuButton>
              <Avatar
                ml="4"
                size="sm"
                name="anubra266"
                src={profilePic}
                cursor="pointer"
              />
            </MenuButton>
            <MenuList>
              <MenuGroup title='Profile'>
                <MenuItem
                onClick={signOut}
                >Log out &nbsp; <Logout /></MenuItem>
              </MenuGroup>
            </MenuList>
          </Menu>
          </Flex>
        </Flex>

        <Box as="main" p="4">
          
     
            <ChatSection 
            chosenCollection={chosenCollection} 
            name={name}
            profilePic={profilePic}
            email={email}
            setCollection={setCollection}
            />

        </Box>
      </Box>
    </Box>
  );
}

function BasicUsage() {
  
  return (
    <>
      
    </>
  )
}