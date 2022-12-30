// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getStorage, ref } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2um9gWHpAXxybMSiFq7wSRJLgVDrb_SA",
  authDomain: "chatdom-d6a60.firebaseapp.com",
  projectId: "chatdom-d6a60",
  storageBucket: "chatdom-d6a60.appspot.com",
  messagingSenderId: "33032398260",
  appId: "1:33032398260:web:eadf1540f2bc847a0c7ee1",
  measurementId: "G-DW04LN545R"
};

// Initialize Firebase
// Initialize Firebase
let app;
if (firebase.apps.length === 0) 
  app = firebase.initializeApp(firebaseConfig);
else app = firebase.app();

// const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = app.firestore();
const auth = firebase.auth();
const storage = getStorage();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider,storage };

const analytics = getAnalytics(app);