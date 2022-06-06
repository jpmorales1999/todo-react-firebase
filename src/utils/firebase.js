// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyARpLDgr6YXn59cDv2vu6ifViEdQTcPrUg",
    authDomain: "tasks-a9b1b.firebaseapp.com",
    projectId: "tasks-a9b1b",
    storageBucket: "tasks-a9b1b.appspot.com",
    messagingSenderId: "43477407208",
    appId: "1:43477407208:web:eebbee095b33ea0f19805d"
}

// Initialize Firebase and Export
export default firebase.initializeApp(firebaseConfig)