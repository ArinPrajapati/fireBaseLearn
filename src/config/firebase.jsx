import { initializeApp } from "firebase/app";
import {getAuth , GoogleAuthProvider} from  "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyCy2TCZblFoXEMtLEI6IcHGwlL1D0ZQlBM",
  authDomain: "fir-course-dc231.firebaseapp.com",
  projectId: "fir-course-dc231",
  storageBucket: "fir-course-dc231.appspot.com",
  messagingSenderId: "275017889671",
  appId: "1:275017889671:web:cf48fbad1b6fec8de78522",
  measurementId: "G-M9PR61PZ0V"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider();

export const db = new getFirestore(app);
export const storage = getStorage(app);