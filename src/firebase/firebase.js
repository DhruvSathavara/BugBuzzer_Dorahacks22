// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional 
 

const firebaseConfig = {
  apiKey:  process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_DOMAIN,
  projectId: process.env.REACT_APP_PROJECTIS,
  storageBucket:process.env.REACT_APP_BUCKET,
  messagingSenderId: process.env.REACT_APP_SENDERID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MEASEREMENTID
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig); 
 export const db = getFirestore(app);