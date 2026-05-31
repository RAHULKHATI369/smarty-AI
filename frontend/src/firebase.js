import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// Replace these with your actual config from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyAkokUGCCJOTK6__60VZz4IGobzfUFfAwo",
  authDomain: "mr-360-ai-858c4.firebaseapp.com",
  projectId: "mr-360-ai-858c4",
  storageBucket: "mr-360-ai-858c4.firebasestorage.app",
  messagingSenderId: "102971371274",
  appId: "1:102971371274:web:b534d1e2bef384b09c94f3",
  measurementId: "G-C6KL8HVTJN"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
