// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbCL1CilGa1lVHXZdcdTAg_zDni1nHa5w",
  authDomain: "chatio-otp.firebaseapp.com",
  projectId: "chatio-otp",
  storageBucket: "chatio-otp.firebasestorage.app",
  messagingSenderId: "990040910177",
  appId: "1:990040910177:web:5db37a59f8c6b48d3bbd20",
  measurementId: "G-Q852GC9JJJ"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
auth.useDeviceLanguage();

export { auth };