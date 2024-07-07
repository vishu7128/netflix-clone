// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyyGtQwFsWmzUxub_InE_kdf4IzmGmmfM",
  authDomain: "netflix-clone-b3eff.firebaseapp.com",
  projectId: "netflix-clone-b3eff",
  storageBucket: "netflix-clone-b3eff.appspot.com",
  messagingSenderId: "352587013973",
  appId: "1:352587013973:web:e1329d9e7cb8897f9d59dc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Database

const db = getDatabase(app);
export default db;
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
