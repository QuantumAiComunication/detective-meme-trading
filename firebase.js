import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import {
  getDatabase,
  ref,
  onValue
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyASuwSOx1iNCl9GUZE4GOiDtg_0ugIaYxw",
  authDomain: "detectivememebots.firebaseapp.com",
  databaseURL: "https://detectivememebots-default-rtdb.firebaseio.com",
  projectId: "detectivememebots",
  storageBucket: "detectivememebots.firebasestorage.app",
  messagingSenderId: "38367696556",
  appId: "1:38367696556:web:717a2cfca4f8d417597109"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

onAuthStateChanged(auth, user => {
  if (user) {
    console.log("Detective Meme: authenticated");
    console.log("Firebase connection initialized.");
  } else {
    console.log("Detective Meme: sign-in required.");
  }
});

export { app, auth, db, ref, onValue };
