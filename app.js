
// Auth
import { getAuth } from "firebase/auth";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { loadEnv } from "vite";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

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
const analytics = getAnalytics(app);
const auth = getAuth(app);
// Authentication

// Sign Up
createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
    });
// Sign In existing
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });
// Authentication state observer
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        // ...
    } else {
        // User is signed out
        // ...
    }
});
// Google auth
const provider = new GoogleAuthProvider();
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
const auth = getAuth();
signInWithPopup(auth, provider)
    .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
    }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
    });

// Sign up a new user

function register() {
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("User created:", user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(`Error (${errorCode}): ${errorMessage}`);
        });
};
// Sign in a new user

function login() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("User signed in:", user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(`Error (${errorCode}): ${errorMessage}`);
        });
};
// Sign in with google

function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
        .then((result) => {
            const user = result.user;
            console.log("User signed in with Google:", user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(`Error (${errorCode}): ${errorMessage}`);
        });
};

// User authentication state (to determine if they're logged in or not)

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
    // User is signed in.
        console.log("User is signed in:", user);
    } else {
    // No user is signed in.
        console.log("No user is signed in.");
    }
});

// Download PDF files

document.getElementById('downloadButton').addEventListener('click', function() {
    // Check if user is authenticated
    const user = firebase.auth().currentUser;
    if (user) {
        // User is authenticated, initiate download
        const storageRef = firebase.storage().ref();
        const pdfRef = storageRef.child('test.pdf');
        pdfRef.getDownloadURL().then(function(url) {
            // Create a link element to trigger the download
            const a = document.createElement('a');
            a.href = url;
            a.download = 'test.pdf'; // Name of the downloaded file
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }).catch(function(error) {
            console.error('Error getting download URL:', error);
        });
    } else {
        // User is not authenticated, redirect to login or show error message
        alert('Please log in to download the PDF.');
        // Alternatively, you can redirect to a login page.
        // window.location.href = 'login.html';
    }
});