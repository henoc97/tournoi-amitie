// services/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCBS6_jzZI5sCla3DJxK7zz1wqPMt9asrA",
    authDomain: "tournoi-amitie.firebaseapp.com",
    projectId: "tournoi-amitie",
    storageBucket: "tournoi-amitie.firebasestorage.app",
    messagingSenderId: "438529610818",
    appId: "1:438529610818:web:115cc4e6362a30efaac9db",
    measurementId: "G-P2QYQRHKF7"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
