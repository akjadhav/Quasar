// Import the functions you need from the SDKs you need
import firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_iOuO7CSvezV5O9FPVamp-wXfb_zsqJU",
  authDomain: "hackgt21-888c9.firebaseapp.com",
  projectId: "hackgt21-888c9",
  storageBucket: "hackgt21-888c9.appspot.com",
  messagingSenderId: "741870794045",
  appId: "1:741870794045:web:304c35ce3e03d48d8f0154"
};

// Initialize Firebase
let app;
if (firebase.apps.length == 0) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app()
}

const auth = firebase.auth()
const database = firebase.database()
export { auth, database };