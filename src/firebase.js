// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBr51vlCuty4CYw8GDG6kQ5Y_o0GbPKEmk",
  authDomain: "task-manager-9acc0.firebaseapp.com",
  projectId: "task-manager-9acc0",
  storageBucket: "task-manager-9acc0.firebasestorage.app",
  messagingSenderId: "519483613437",
  appId: "1:519483613437:web:ab768f8f711f22a2021e94",
  measurementId: "G-6X9J4RYR7N"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);//Firestore instance.