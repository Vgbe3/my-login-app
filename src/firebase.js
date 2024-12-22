// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getAuth,  createUserWithEmailAndPassword, signInWithEmailAndPassword ,fetchSignInMethodsForEmail} from "firebase/auth";

// Firebase config จาก Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyAXiJfl0OZOl5jQA_V_bY4fA4mKxGUCGUQ",
  authDomain: "my-login-app01.firebaseapp.com",
  projectId: "my-login-app01",
  storageBucket: "my-login-app01.firebasestorage.app",
  messagingSenderId: "388783552194",
  appId: "1:388783552194:web:a2191649ffca831d53ad5b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export auth object
const auth = getAuth(app);
const db = getFirestore(app);
export { auth
  , createUserWithEmailAndPassword
  , signInWithEmailAndPassword 
  , fetchSignInMethodsForEmail
  ,db
  , doc
  , setDoc}
export default app;