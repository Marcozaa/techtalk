// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth";
import 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDo_jEoteskl81dls_KKb7Q9XZGfPgX0ao",
  authDomain: "techtalk-9f0c7.firebaseapp.com",
  projectId: "techtalk-9f0c7",
  storageBucket: "techtalk-9f0c7.appspot.com",
  messagingSenderId: "103056854884",
  appId: "1:103056854884:web:d8322c7ecb678557617471",
  measurementId: "G-SHVCC435C1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app)
const auth = getAuth(app)

export {db, auth}