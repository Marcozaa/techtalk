import React from 'react';
import { createStyles, Text, Avatar, Group, TypographyStylesProvider, Paper } from '@mantine/core';
import { motion } from 'framer-motion';
import { Box } from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/react';
import { useState } from 'react';
import Reactions from './Reactions';
import styled from 'styled-components'

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
  author: {
    name: string;
    image: string;
  };
}

export function ChatMessage({ postedAt, body, author }: CommentHtmlProps) {
  const { classes } = useStyles();
  const [hover, setHover] = useState(false);
  function handleMouseOver(){
    setHover(true)
  }

  function handleMouseOut(){
    setHover(false)

  }
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
      <Reactions />
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
`