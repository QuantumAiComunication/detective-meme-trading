
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";

import {
  getAuth,
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

import {
  getDatabase,
  ref,
  onValue,
  push
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";

// Detective Meme Firebase project
const firebaseConfig = {
  apiKey: "AIzaSyASuwSOx1iNCl9GUZE4GOiDtg_0ugIaYxw",
  authDomain: "detectivememebots.firebaseapp.com",
  databaseURL: "https://detectivememebots-default-rtdb.firebaseio.com",
  projectId: "detectivememebots",
  storageBucket: "detectivememebots.firebasestorage.app",
  messagingSenderId: "38367696556",
  appId: "1:38367696556:web:717a2cfca4f8d417597109"
};

// Initialize Firebase once
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

// Both bots use this shared message path
const botMessagesRef = ref(db, "botMessages");

// Sign in using Firebase Authentication
function signInWebsite(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

// Send a message from either bot
function sendBotMessage(sender, message) {
  return push(botMessagesRef, {
    sender: String(sender),
    message: typeof message === "string"
      ? message
      : JSON.stringify(message),
    timestamp: new Date().toISOString()
  });
}

// Listen for messages from both bots in real time
function listenForBotMessages(callback) {
  return onValue(
    botMessagesRef,
    snapshot => callback(snapshot.val() || {}),
    error => console.error("Firebase message listener error:", error)
  );
}

export {
  app,
  auth,
  db,
  ref,
  onValue,
  signInWebsite,
  sendBotMessage,
  listenForBotMessages,
  signOut
};
