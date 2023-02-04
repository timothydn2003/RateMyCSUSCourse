import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBtC6HfPmbXB_xZPeR8fCQdBaYYcZFVPn0",
  authDomain: "ratemycsuscourse.firebaseapp.com",
  projectId: "ratemycsuscourse",
  storageBucket: "ratemycsuscourse.appspot.com",
  messagingSenderId: "157615246149",
  appId: "1:157615246149:web:c7f105865568c0dac1cc2c",
  measurementId: "G-2R9H6BNHMZ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)