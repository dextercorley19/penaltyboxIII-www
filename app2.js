// Import necessary functions and objects
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: loadEnv.apiKey,
  authDomain: loadEnv.authDomain,
  projectId: loadEnv.projectId,
  storageBucket: loadEnv.storageBucket,
  messagingSenderId: loadEnv.messagingSenderId,
  appId: loadEnv.appId,
  measurementId: loadEnv.measurementId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Authentication
const auth = getAuth();

// Sign Up
createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        console.log("User signed up:", user);
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`Error (${errorCode}): ${errorMessage}`);
    });

// Sign In existing
signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        console.log("User signed in:", user);
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`Error (${errorCode}): ${errorMessage}`);
    });

// Authentication state observer
onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        console.log("User is signed in with UID:", uid);
    } else {
        console.log("User is signed out.");
    }
});

// Google auth
const provider = new GoogleAuthProvider();
signInWithPopup(auth, provider)
    .then((result) => {
        const user = result.user;
        console.log("User signed in with Google:", user);
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`Error (${errorCode}): ${errorMessage}`);
    });
