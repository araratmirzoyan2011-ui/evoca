import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // Ավելացված է getAuth-ը

const firebaseConfig = {
  apiKey: "AIzaSyB7_T3s6fQzq1AanGVjxp_qLS86Q2im2Wk",
  authDomain: "evoca-79db6.firebaseapp.com",
  projectId: "evoca-79db6",
  storageBucket: "evoca-79db6.firebasestorage.app",
  messagingSenderId: "323323365849",
  appId: "1:323323365849:web:771ecc02427591050df1c8",
  measurementId: "G-9MP2TQVD1D"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app); // Ավելացված է auth-ի export-ը