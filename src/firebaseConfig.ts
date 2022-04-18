// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import '@firebase/storage';
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCS8IGk-zwb_9IFygDfUn6lX9RwJHY_l4E",
  authDomain: "moda-archive.firebaseapp.com",
  projectId: "moda-archive",
  storageBucket: "moda-archive.appspot.com",
  messagingSenderId: "69869751266",
  appId: "1:69869751266:web:e5bdf8ab9c39af3d8647bb",
  measurementId: "G-ZWTS6YX264"
};

// Initialize Firebase
//const analytics = getAnalytics(app);
export default initializeApp(firebaseConfig);
