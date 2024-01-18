// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBF2eWDQD2E0HbFg5NTWqhRyAkSiQ6uEzY",
  authDomain: "realtor-react-82750.firebaseapp.com",
  projectId: "realtor-react-82750",
  storageBucket: "realtor-react-82750.appspot.com",
  messagingSenderId: "632019543116",
  appId: "1:632019543116:web:72b980fbe49a587afd00e9",
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();
