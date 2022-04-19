import React from 'react'
import styled from 'styled-components'
import Swibc from '../components/HomePageSidebar.tsx'
import { db } from '../firebase/firebase'
import { useEffect } from 'react'
import { query, collection } from 'firebase/firestore'
import { onSnapshot } from 'firebase/firestore'
import { useState } from 'react'
import { doc, getDoc } from "firebase/firestore";
import ChatSection from '../components/ChatSection'
export default function Homepage({name, profilePic, email, chosenCollection, setCollection}) {
  return (

    <StyledHomeDiv>
        <Swibc 
        name={name}
        profilePic={profilePic}
        email={email}
        setCollection={setCollection}
        chosenCollection={chosenCollection}
        />

        </StyledHomeDiv>
  )
}


const StyledHomeDiv = styled.div`
    display: flex ;
    height: 100vh;
`