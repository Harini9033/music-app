// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDEySK-4x08L3S5bt0EtvAJEFR6Qe4NbbQ",
  authDomain: "innovators-hub-music-65752.firebaseapp.com",
  projectId: "innovators-hub-music-65752",
  storageBucket: "innovators-hub-music-65752.firebasestorage.app",
  messagingSenderId: "624608757673",
  appId: "1:624608757673:web:9855186289935ce85d26b8"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const __AUTH=getAuth(firebaseApp)
export const __DB=getFirestore(firebaseApp)