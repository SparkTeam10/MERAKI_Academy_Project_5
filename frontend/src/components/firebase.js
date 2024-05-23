// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY ,
  authDomain: "booking-app-a20f3.firebaseapp.com",
  projectId: "booking-app-a20f3",
  storageBucket: "booking-app-a20f3.appspot.com",
  messagingSenderId: "933700070249",
  appId: "1:933700070249:web:de8a70493add2855302bf8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);