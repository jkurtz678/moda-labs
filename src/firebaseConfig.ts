// Import the functions you need from the SDKs you need
import '@firebase/storage';
import { initializeApp, type FirebaseApp } from "firebase/app";
import { getStorage, connectStorageEmulator } from "firebase/storage";
import { getAuth, connectAuthEmulator, type Auth } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

//import { getAnalytics } from "firebase/analytics";

const DEVELOPEMENT_ENV = "development";
const PRODUCTION_ENV = "production";

const prod_firebase_config = {
  apiKey: "AIzaSyCS8IGk-zwb_9IFygDfUn6lX9RwJHY_l4E",
  authDomain: "moda-archive.firebaseapp.com",
  projectId: "moda-archive",
  storageBucket: "moda-archive.appspot.com",
  messagingSenderId: "69869751266",
  appId: "1:69869751266:web:e5bdf8ab9c39af3d8647bb",
  measurementId: "G-ZWTS6YX264"
};

const local_firebase_config = {
  apiKey: "AIzaSyA0lDjpY4iqrOzQWDbMtHs_I7bNc_PXz2w",
  authDomain: "moda-archive-local-56de2.firebaseapp.com",
  projectId: "moda-archive-local-56de2",
  storageBucket: "moda-archive-local-56de2.appspot.com",
  messagingSenderId: "93817466249",
  appId: "1:93817466249:web:b7a5d5092fae482628c558",
  measurementId: "G-DQ47C6ZY5K"
};

let app: FirebaseApp;
let new_auth: Auth;
if (import.meta.env.MODE === DEVELOPEMENT_ENV) {
  app = initializeApp(local_firebase_config)
  new_auth = getAuth(app);
  const db = getFirestore(app);
  const storage = getStorage();

  console.log("connecting to emulators...")
  connectAuthEmulator(new_auth, "http://localhost:9099");
  connectFirestoreEmulator(db, 'localhost', 8080);
  connectStorageEmulator(storage, "localhost", 9199);
} else {
  app = initializeApp(prod_firebase_config)
  new_auth = getAuth(app);
}

export const auth = new_auth;
export default app;
