
// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4-Iya-ydrdpiceQeFGMIkcXLqBk_tUec",
    authDomain: "dojo-blog-44c2d.firebaseapp.com",
    projectId: "dojo-blog-44c2d",
    storageBucket: "dojo-blog-44c2d.appspot.com",
    messagingSenderId: "751823257302",
    appId: "1:751823257302:web:e511b9fb062199ec8e5377",
    measurementId: "G-7VFN92KDBY"              // Replace with your App ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Auth
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
