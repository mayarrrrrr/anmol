import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// 1. Go to https://console.firebase.google.com, create a project (free tier is fine).
// 2. Add a Web App, copy the config object it gives you, and paste it below.
// 3. In the Firebase console enable: Firestore Database (start in test mode, then
//    tighten rules using firestore.rules in this project), and
//    Authentication → Sign-in method → Google.
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5kIKTrrY24ij08awCoE_8ZgaNOX40mic",
  authDomain: "kamaranniversary.firebaseapp.com",
  projectId: "kamaranniversary",
  storageBucket: "kamaranniversary.firebasestorage.app",
  messagingSenderId: "1055536484941",
  appId: "1:1055536484941:web:7d9c9aef3e3c776aef0204",
  measurementId: "G-Z2T4E0CF3J"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// The one email allowed to sign in and edit the message.
// Swap this for your client's real Google account email.
export const ADMIN_EMAIL = 'akokmayar607@gmail.com';
