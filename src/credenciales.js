// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA5SHL_qEP4WYGZtoij0McDw91Ghu-y3V8",
  authDomain: "react-app-1a999.firebaseapp.com",
  projectId: "react-app-1a999",
  storageBucket: "react-app-1a999.appspot.com",
  messagingSenderId: "557948253830",
  appId: "1:557948253830:web:889b73d1a35f03cf2a0307",
  measurementId: "G-MPTRML3NSN"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

export default firebaseApp;