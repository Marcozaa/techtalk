import logo from './logo.svg';
import './App.css';
import { db } from './firebase/firebase';
import {collection, addDoc, Timestamp} from 'firebase/firestore'
import {useAuthState} from 'react-firebase-hooks/auth';
import Login from './components/Login.tsx'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from './firebase/firebase';
import Homepage from './pages/Homepage';
import { useState } from 'react';





  
/**
const handleSubmit = async (e) => {
   e.preventDefault()
   try {
     await addDoc(collection(db, 'tasks'), {
       title: "proba",
       description: "description",
       completed: false,
       created: Timestamp.now()
     })
   } catch (err) {
     alert(err)
   }
 }
  */
function App() {

const [user] = useAuthState(auth); // State for displaying if user is logged in or not.

const [collection, setCollection] = useState(); // Keep in the state the current chat
// We're going to do a bit of prop drilling on this one.



  
  return (
    <>
    {/**If the users is already logged show the homepage, else the login screen. */}
    {user ? 
    ( <Homepage 
      name={auth.currentUser.displayName}
      profilePic={auth.currentUser.photoURL}
      email={auth.currentUser.email}
      setCollection={setCollection}
      chosenCollection={collection}
      />) : 
     <Login/>}
     </>
  );
}

export default App;
