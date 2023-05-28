import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/storage";
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANFG0QVuSVK78nZgvQG_MM3Ggm_Fu7E5o",
  authDomain: "firechat-ff60a.firebaseapp.com",
  projectId: "firechat-ff60a",
  storageBucket: "firechat-ff60a.appspot.com",
  messagingSenderId: "1028737881996",
  appId: "1:1028737881996:web:06b2f376b981391a92e8a9",
  measurementId: "G-KEH6T24TJB"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default firebase;