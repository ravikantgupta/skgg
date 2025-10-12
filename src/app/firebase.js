// /src/firebase.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// ✅ Initialize Firebase only once and give unique variable name
const firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// ✅ Export auth and app
export const auth = getAuth(firebaseApp);
export default firebaseApp;
