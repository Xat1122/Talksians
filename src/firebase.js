import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3GXiC6226_57JxVfQ-eD55FfhmdSwk58",
  authDomain: "mateenchat.firebaseapp.com",
  projectId: "mateenchat",
  storageBucket: "mateenchat.appspot.com",
  messagingSenderId: "701661630245",
  appId: "1:701661630245:web:037d33da5a847ffef454cc"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore()