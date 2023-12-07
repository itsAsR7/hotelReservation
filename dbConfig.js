import { initializeApp } from "firebase/app";
import { getFirestore,doc, updateDoc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage,ref, storageRef, uploadBytes, getDownloadURL} from "@firebase/storage"


const firebaseConfig = {
  apiKey: "AIzaSyCvaFUEZT6AE2gRZwTFkCrLAgzv-m0g1_M",
  authDomain: "hotelreservation-34451.firebaseapp.com",
  projectId: "hotelreservation-34451",
  storageBucket: "hotelreservation-34451.appspot.com",
  messagingSenderId: "58565957981",
  appId: "1:58565957981:web:0c500086b75f88464a30b4",
  
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth,ref,storage,storageRef, uploadBytes, getDownloadURL };