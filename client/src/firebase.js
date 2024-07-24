// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-a4448.firebaseapp.com",
  projectId: "mern-estate-a4448",
  storageBucket: "mern-estate-a4448.appspot.com",
  messagingSenderId: "359880712821",
  appId: "1:359880712821:web:8a880fe21e720e5f168e3c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);