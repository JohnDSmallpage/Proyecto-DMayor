import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"





// const firebaseConfig = {
//     apiKey: "AIzaSyCJoOaknb9ouhkLMxI_wmTSmLz6F_yyn5s",
//     authDomain: "d-mayor-ad6ee.firebaseapp.com",
//     projectId: "d-mayor-ad6ee",
//     storageBucket: "d-mayor-ad6ee.appspot.com",
//     messagingSenderId: "94552483401",
//     appId: "1:94552483401:web:1f55cf1bebad8fe4cfc198"
// };

const firebaseConfig = {
    apiKey: "AIzaSyD5999bJPY8rGnjDr0d7NMfEMbTJA2QCRA",
    authDomain: "copia-8df64.firebaseapp.com",
    projectId: "copia-8df64",
    storageBucket: "copia-8df64.appspot.com",
    messagingSenderId: "565136626228",
    appId: "1:565136626228:web:27c0fad30fe0f54aeeb061"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);//Conexion modulo de firebase
export const db = getFirestore(app);//conexion base de datos firestore
export const store = getStorage(app);//conexion con el storage de firebase


export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({prompt:"select_account"})