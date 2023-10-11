import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjAJBkD7SxvrSD1g8QS-e62e5dyh6JQeY",
  authDomain: "hotelreservation-5bb37.firebaseapp.com",
  projectId: "hotelreservation-5bb37",
  storageBucket: "hotelreservation-5bb37.appspot.com",
  messagingSenderId: "517486606704",
  appId: "1:517486606704:web:d64c71e5223a2eae73b7b5"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };