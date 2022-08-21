import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBHeHVAW7H-ux_UwxtIozxRSXy7Iq1LI7A",
  authDomain: "codesandbox-34809.firebaseapp.com",
  projectId: "codesandbox-34809",
  storageBucket: "codesandbox-34809.appspot.com",
  messagingSenderId: "879690667803",
  appId: "1:879690667803:web:34c9682393d312a13525be"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
