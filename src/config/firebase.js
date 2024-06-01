// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7C8V1XkRA5GAaqAUQ99fppkhDakMUm3Q",
  authDomain: "intern-87839.firebaseapp.com",
  projectId: "intern-87839",
  storageBucket: "intern-87839.appspot.com",
  messagingSenderId: "113073421620",
  appId: "1:113073421620:web:9bcfd93ad027ed656e7961",
  measurementId: "G-TP47KTBJC5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export {analytics,auth,firestore,storage}