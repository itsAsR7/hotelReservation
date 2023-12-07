import { initializeApp } from "firebase/app";
import { getFirestore,doc, updateDoc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage,ref, storageRef, uploadBytes, getDownloadURL} from "@firebase/storage"


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDL-73g3oApdEF_J7msi2CyfVHxvfKVhGI",
  authDomain: "hotelreservation-5e6dc.firebaseapp.com",
  projectId: "hotelreservation-5e6dc",
  storageBucket: "hotelreservation-5e6dc.appspot.com",
  messagingSenderId: "408857447547",
  appId: "1:408857447547:web:d641f11838e3a810a966de"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth,ref,storage,storageRef, uploadBytes, getDownloadURL };