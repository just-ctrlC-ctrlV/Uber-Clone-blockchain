// Import the functions you need from the SDKs you need
import { initializeApp, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCf8PvTT1r5QxBO6B1-wJ4yU36b8zUrF4U",
  authDomain: "uber-clone-blockchain-4eefe.firebaseapp.com",
  projectId: "uber-clone-blockchain-4eefe",
  storageBucket: "uber-clone-blockchain-4eefe.appspot.com",
  messagingSenderId: "32570495882",
  appId: "1:32570495882:web:9b2a3cf140b10799412e73",
  measurementId: "G-ZS55PFCSFH",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
