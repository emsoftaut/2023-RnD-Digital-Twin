// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCXzy62ANYirBr4P-gL75Q8F1oU97etEoI",
  authDomain: "digitaltwintest-83dbd.firebaseapp.com",
  projectId: "digitaltwintest-83dbd",
  storageBucket: "digitaltwintest-83dbd.appspot.com",
  messagingSenderId: "878669379516",
  appId: "1:878669379516:web:817b0af360e9a5e0845db9",
  measurementId: "G-C10XSMH3KG",
  databaseURL: "https://digitaltwintest-83dbd-default-rtdb.asia-southeast1.firebasedatabase.app",
};

// Initialize Apps
const appAuth = initializeApp(firebaseConfig); // This authenticates the website
const appDb = getDatabase(appAuth); // This authenticates the database
const analytics = getAnalytics(appAuth);
const authInstance = getAuth(appAuth);

export { appAuth, analytics, appDb, authInstance };