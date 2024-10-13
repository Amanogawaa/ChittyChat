import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCfNyvLPolEp7ZWMZTqXZJiJRzzXHuloS0",
  authDomain: "chitty-chat-3cc2d.firebaseapp.com",
  projectId: "chitty-chat-3cc2d",
  storageBucket: "chitty-chat-3cc2d.appspot.com",
  messagingSenderId: "69069596973",
  appId: "1:69069596973:web:2d5f35234911573360cba4",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
