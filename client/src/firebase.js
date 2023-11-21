// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY ,
  authDomain: "myapplication3-db341.firebaseapp.com",
  databaseURL: "https://myapplication3-db341.firebaseio.com",
  projectId: "myapplication3-db341",
  storageBucket: "myapplication3-db341.appspot.com",
  messagingSenderId: "696795830615",
  appId: "1:696795830615:web:575ed3b7e5ff12d42b4612"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);