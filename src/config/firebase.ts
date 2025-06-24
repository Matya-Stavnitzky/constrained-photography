// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPa3uwx6y-MakYAMRAoWZwUyqOtWG_L50",
  authDomain: "constrained-photography.firebaseapp.com",
  projectId: "constrained-photography",
  storageBucket: "constrained-photography.firebasestorage.app",
  messagingSenderId: "917996178796",
  appId: "1:917996178796:web:5eb8f64222fa5c64483749",
  measurementId: "G-C3B29CC1Y8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); 