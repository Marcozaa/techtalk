import React from 'react'
import { motion } from 'framer-motion';
import styled from 'styled-components'
import { ThumbUp } from 'tabler-icons-react';
import { BsGithub } from 'react-icons/bs';
import { useColorModeValue } from '@chakra-ui/react';
import { FaFireAlt, FaSmile } from 'react-icons/fa';
import { HiOutlineUpload } from 'react-icons/hi';
export default function Reactions() {
  return (
    <StyledReactionsContainer
    style={{background: useColorModeValue("white","#2D3748")}}
    animate={{
      opacity: [0, 1],
    }}
    transition={{ duration: 0.4 }}
    >
    <FaSmile className='icon'/>
    <FaFireAlt className='icon'/>
    <BsGithub className='icon'/>
    </StyledReactionsContainer>
  )
}

const StyledReactionsContainer = styled(motion.div)`
  display: flex ;
  justify-content:space-between ;
  align-items: center ;
  gap: 0.5rem;
  border-radius: 0.5rem ;
  padding: 0.5rem;
  .icon{
      cursor: pointer ;
  }
`


