// firebase-config.ts
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import { getFirestore, collection, getDoc, getDocs, doc, setDoc, updateDoc, query, orderBy, increment } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDAmL-FwnG2wcSQbhZDHS097TMqPekYWA0",
  authDomain: "togame-1968e.firebaseapp.com",
  projectId: "togame-1968e",
  storageBucket: "togame-1968e.firebasestorage.app",
  messagingSenderId: "786484439486",
  appId: "1:786484439486:web:5384a105835652e98ab1ef",
  measurementId: "G-PQJ7CN7WYB"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export { signInWithPopup, signOut };
export { collection, getDoc, getDocs, doc, setDoc, updateDoc, query, orderBy, increment };
