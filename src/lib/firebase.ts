// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your Firebase config object
const firebaseConfig = {
  apiKey: "AIzaSyBAtxbywhf7RtqYUP0UMFMSZT9rf-RxoXE",
  authDomain: "bootcamp-14bf4.firebaseapp.com",
  projectId: "bootcamp-14bf4",
  storageBucket: "bootcamp-14bf4.firebasestorage.app",
  messagingSenderId: "1043627706331",
  appId: "1:1043627706331:web:ece45e2fe79521fd0d09fe",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore and Auth
export const db = getFirestore(app);
export const auth = getAuth(app);
