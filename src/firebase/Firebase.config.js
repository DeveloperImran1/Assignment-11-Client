// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCpeTYilmj3lChtyYcKu_1EhUzO65hI-M",
  authDomain: "assignment-eleven-6f668.firebaseapp.com",
  projectId: "assignment-eleven-6f668",
  storageBucket: "assignment-eleven-6f668.appspot.com",
  messagingSenderId: "904443135757",
  appId: "1:904443135757:web:1135905ea0070e543a9244"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;