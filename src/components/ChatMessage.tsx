import React from 'react';
import { createStyles, Text, Avatar, Group, TypographyStylesProvider, Paper } from '@mantine/core';
import { motion } from 'framer-motion';
import { Box, Flex } from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/react';
import { useState } from 'react';
import Reactions from './Reactions';
import styled from 'styled-components'
import { useEffect } from 'react';
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { FaFire, FaGithub, FaSmile } from 'react-icons/fa';
import { Code } from '@mantine/core';
import { checkActionCode } from 'firebase/auth';

const useStyles = createStyles((theme) => ({
  comment: {
    padding: `${theme.spacing.lg}px ${theme.spacing.xl}px`,
  },

  body: {
    paddingLeft: 54,
    paddingTop: theme.spacing.sm,
    fontSize: theme.fontSizes.sm,
  },

  content: {
    '& > p:last-child': {
      marginBottom: 0,
    },
  },
}));

interface CommentHtmlProps {
  postedAt: string;
  body: string;
  id: string;
  chosenCollection: string;
  author: {
    name: string;
    image: string;
  };
}

export function ChatMessage({ postedAt, body, author, id, chosenCollection }: CommentHtmlProps) {
  const { classes } = useStyles();
  const [hover, setHover] = useState(false);
  const [reactions, setReactions] = useState([]);


  function handleMouseOver(){
    setHover(true)
  }

  function handleMouseOut(){
    setHover(false)

  }



  useEffect(() => { // Listener for reaction updates
        setReactions([])


        onSnapshot(
          doc(db, "chats/"+chosenCollection+"/messages/"+id), 
          { includeMetadataChanges: true }, 
          (doc) => {
            setReactions(doc.data())
            return
          });

          
       
      
}, []) 
  return (
     <StyledMessageContainer
     className='messageContainer'
      onMouseEnter ={handleMouseOver} 
      onMouseLeave={handleMouseOut}
     animate={{
      opacity: [0, 1],
    }}
    transition={{ duration: 0.5 }}
  >
    {hover == true? (
      <div className="reactionsContainer">
      <Reactions id={id} chosenCollection={chosenCollection} />
      </div>
    ): null}
    <Box 

    p={'1rem'}
    bg={useColorModeValue("white", "gray.800")}
    borderRadius={'1rem'}
    marginTop={'0.5rem'}>
      <Group>
        <Avatar src={author.image} alt={author.name} radius="xl" />
        <div
        >
          <Text size="sm">{author.name}</Text>
          <Text size="xs" color="dimmed">
            {postedAt}
          </Text>
        </div>
      </Group>
      <TypographyStylesProvider className={classes.body}>
        <Text color={useColorModeValue("black", "white")} className={classes.content} dangerouslySetInnerHTML={{ __html: body }} />
        <div className="reactionsCounters">
          {reactions && (
            <>
            <Box bg={'gray'} marginTop={'0.8rem'} p={'0.5rem'} borderRadius={'0.5rem'} color={'white'}>
              <Flex justifyContent={'center'} alignItems={'center'} gap={'0.8rem'}>
              <FaSmile />
              {reactions.smile}
              </Flex>
            </Box>
            <Box bg={'gray'} marginTop={'0.8rem'} p={'0.5rem'} borderRadius={'0.5rem'} color={'white'}>
              <Flex justifyContent={'center'} alignItems={'center'} gap={'0.8rem'}>
              <FaFire />
              {reactions.fire}
              </Flex>
            </Box>
            <Box bg={'gray'} marginTop={'0.8rem'} p={'0.5rem'} borderRadius={'0.5rem'} color={'white'}>
              <Flex justifyContent={'center'} alignItems={'center'} gap={'0.8rem'}>
              <FaGithub /> 
              {reactions.gitHub}
              </Flex>
            </Box>
            </>
          )}
       </div>
      </TypographyStylesProvider>
      </Box> 
    </StyledMessageContainer>
  );
}
const StyledMessageContainer = styled(motion.div)`
  position: relative ;
    .reactionsContainer{
        position: absolute;
        top: -5px;
        right: 2rem;
    }
    .reactionsCounters{
      display: flex;
      justify-content:flex-start ;
      align-items:center ;
      gap: 0.5rem;
      
    }
`