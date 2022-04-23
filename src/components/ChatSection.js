import React from 'react'
import styled from '@emotion/styled'
import { useEffect } from 'react'
import { db } from '../firebase/firebase'
import { collection, onSnapshot } from 'firebase/firestore'
import { useState } from 'react'
import { ChatMessage } from './ChatMessage.tsx'
import { motion } from 'framer-motion'
import { Input, InputRightElement, InputLeftElement, InputGroup, Button } from '@chakra-ui/react'
import { FaceId } from 'tabler-icons-react'
import { ArrowRightBar } from 'tabler-icons-react'
import { doc, setDoc } from "firebase/firestore"; 
import { addDoc } from "firebase/firestore"; 
import { MdSend } from 'react-icons/md'
import { query, where, getDocs } from "firebase/firestore";
import { orderBy } from 'firebase/firestore'
import { FaSmileBeam } from 'react-icons/fa'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from '@chakra-ui/react'
export default function ChatSection({chosenCollection,name, profilePic, email, setCollection}) {


async function get2(){

}

get2()


const [inputState, setInputState] = useState("")

async function addMessage(){

document.getElementById('chatSection') // Scroll to bottom of div so we can see the new message
.scroll({ top: document.getElementById('chatSection').scrollHeight, behavior: 'smooth' }); // Scroll tothe bottom of page when sending a message

const newDoc = await addDoc(collection(db, "chats/"+chosenCollection+"/messages"), {
  message: inputState,
  name: name,
  profilePic: profilePic,
  timestamp:  new Date()
});
setCollection(chosenCollection) // Force messages update client-side

}

function difference_minutes(timeStartp, timeEndp) 
 {
    /**
    * We need to get the elapsed time since the message has been sent 
    */
var timeStart = timeStartp.getTime();
var timeEnd = timeEndp.getTime()
 var hourDiff = timeEnd - timeStart; //in ms
var secDiff = hourDiff / 1000; //in s
var minDiff = hourDiff / 60 / 1000; //in minutes
var hDiff = hourDiff / 3600 / 1000; //in hours
var humanReadable = {};
humanReadable.hours = Math.floor(hDiff);
humanReadable.minutes = minDiff - 60 * humanReadable.hours;
return humanReadable; //{hours: 0, minutes: 30}
  
 }

    const [messages, setMessages] = useState([]) // This state contains all the messages in a single chat
    const [messagesIds, setMessagesIds] = useState([]) // This state contains all the messages in a single chat

    useEffect(() => { // We'll get all the messages in a single goup chat
        setMessages([])
        setMessagesIds([])

        onSnapshot(query(collection(db, "chats/"+chosenCollection+"/messages"),
        orderBy("timestamp")), (snapshot)=>{
            setMessages([])
            setMessagesIds([])
            snapshot.docs.map(doc =>{

              setMessages((messages) => [...messages,doc.data()])
              setMessagesIds((messagesIds) => [...messagesIds, doc.id])
            }

            )
        })
      
}, [chosenCollection]) // Every time we change section useEffect will be triggered.


  return (
    <>
    <StyledChatSection>
        <section className="messages"  id='chatSection'>
        {messages.map((singleMessage,i) => (
            <>
            <ChatMessage 
            key={i}
            postedAt={difference_minutes
                (new Date(singleMessage.timestamp.seconds*1000), // Message sent timestamp
                new Date() // Timestamp of this exact moment
                ).hours != 0 
                ? 
            difference_minutes
                (new Date(singleMessage.timestamp.seconds*1000), // Message sent timestamp
                new Date() // Timestamp of this exact moment
                ).hours + " hours ago"
                :
             Math.trunc(difference_minutes
                (new Date(singleMessage.timestamp.seconds*1000), // Message sent timestamp
                new Date() // Timestamp of this exact moment
                ).minutes) + " minutes ago"
            }
            chosenCollection={chosenCollection}
            id={messagesIds[i]}
            body={singleMessage.message}
            author={{
            name: singleMessage.name,
            image: singleMessage.profilePic}}
            />
            </>
        ))}
        </section>
    </StyledChatSection>
    {chosenCollection != null ? (
    <StyledChatInput>
    <InputGroup>
    <InputLeftElement
      
      color='white.300'
      fontSize='1.2em'
      children={
      <Menu>
  <MenuButton as={Button}>
<FaSmileBeam />
  </MenuButton>
  <MenuList style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
    <div style={{display: 'flex', justifyContent: 'center', gap: '0.2rem', alignItems: 'center'}}>
      <Button onClick={(e)=>setInputState(inputState + "😀")}>😀</Button>
      <Button onClick={(e)=>setInputState(inputState + "😃")}>😃</Button>
      <Button onClick={(e)=>setInputState(inputState + "😁")}>😁</Button>
      </div>
    <div style={{display: 'flex', justifyContent: 'center', gap: '0.2rem', alignItems: 'center'}}>
      <Button onClick={(e)=>setInputState(inputState + "😍")}>😍</Button>
      <Button onClick={(e)=>setInputState(inputState + "😔")}>😔</Button>
      <Button onClick={(e)=>setInputState(inputState + "🤯")}>🤯</Button>
      </div>
    <div style={{display: 'flex', justifyContent: 'center', gap: '0.2rem', alignItems: 'center'}}>
      <Button onClick={(e)=>setInputState(inputState + "🧠")}>🧠</Button>
      <Button onClick={(e)=>setInputState(inputState + "👀")}>👀</Button>
      <Button onClick={(e)=>setInputState(inputState + "🙌")}>🙌</Button>
      </div>
    <div style={{display: 'flex', justifyContent: 'center', gap: '0.2rem', alignItems: 'center'}}>
      <Button onClick={(e)=>setInputState(inputState + "👩‍💻")}>👩‍💻</Button>
      <Button onClick={(e)=>setInputState(inputState + "👑")}>👑</Button>
      <Button onClick={(e)=>setInputState(inputState + "👨‍💻")}>👨‍💻</Button>
      </div>
    <div style={{display: 'flex', justifyContent: 'center', gap: '0.2rem', alignItems: 'center'}}>
      <Button onClick={(e)=>setInputState(inputState + "❤️")}>❤️</Button>
      <Button onClick={(e)=>setInputState(inputState + "📈")}>📈</Button>
      <Button onClick={(e)=>setInputState(inputState + "📉")}>📉</Button>
      </div>
   
  </MenuList>
</Menu>
  }
      
    />
    <Input 

    variant={'filled'}
    onKeyPress={e=> {
        if (e.key === 'Enter') {
           addMessage()
           setInputState("")
        }
     }}
    onChange={(e)=>setInputState(e.target.value)}
    value={inputState}
    placeholder={`Send a message to #${chosenCollection}`} />
    <InputRightElement children={<MdSend
    onClick={addMessage}
    style={{cursor:"pointer"}} />} />
  </InputGroup>
  </StyledChatInput>
            
        ):null}
    </>
  )
}

const StyledChatSection = styled.div`

 
    width: 100%;
    position: relative ;
    
    .messages{
        min-height: 85vh ;
       max-height: 90vh;
       overflow-y:scroll ;
    }
    /*@media only screen and (max-width: 600px) {
      .messages{
            min-height: 80vh ;
          max-height: 80vh;
          overflow-y:scroll ;
        }
    }*/
    @media only screen and (min-width: 600px) {
      .messages{
            min-height: 75vh ;
          max-height: 80vh;
          overflow-y:scroll ;
        }
    }
    @media only screen and (min-height: 1100px) {
      .messages{
            min-height: 90vh ;
          max-height: 90vh;
          overflow-y:scroll ;
        }
    }
    @media only screen and (max-height: 650px) {
      .messages{
            min-height: 75vh ;
          max-height: 75vh;
          overflow-y:scroll ;
        }
    }

    .messages::-webkit-scrollbar {
    width: 5px;
    }

    /* Track */
    .messages::-webkit-scrollbar-track {
    background: #f1f1f1;
    }

    /* Handle */
    .messages::-webkit-scrollbar-thumb {
    background: #888;
    }

    /* Handle on hover */
    .messages::-webkit-scrollbar-thumb:hover {
    background: #555;
    }

`
/**
 *     .messageTextInput{
        
        display: flex ;
        justify-content: center ;
        align-items: center;
        width:80% ;
        position: fixed ;
        bottom: 1rem;
        background-color: #2c2c2c;
    }
 */
const StyledChatInput = styled.div`
width: 75vw;
height: 2rem;
display:flex ;
justify-content: center;
align-items: center;
position: fixed;
bottom: 1rem;
@media only screen and (max-width: 767px) {
      width: 95%;
    }

`