// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCn0pHci0GDWNavDmBjN6IsVAIg2suxG4Y",
    authDomain: "fir-course-6a34b.firebaseapp.com",
    projectId: "fir-course-6a34b",
    storageBucket: "fir-course-6a34b.appspot.com",
    messagingSenderId: "66806244753",
    appId: "1:66806244753:web:7498e329e380f04c7da630",
    measurementId: "G-VKP42C8LD2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app)

export const storage = getStorage(app);