
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

// Detective Meme Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASuwSOx1iNCl9GUZE4GOiDtg_0ugIaYxw",
  authDomain: "detectivememebots.firebaseapp.com",
  databaseURL: "https://detectivememebots-default-rtdb.firebaseio.com",
  projectId: "detectivememebots",
  storageBucket: "detectivememebots.firebasestorage.app",
  messagingSenderId: "38367696556",
  appId: "1:38367696556:web:717a2cfca4f8d417597109"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

// Shared communication channel for both bots
const botMessagesRef = ref(db, "botMessages");

// Sign in using email and password
function signInWebsite(email, password) {
  if (!email || !password) {
    return Promise.reject(
      new Error("Enter your email and password.")
    );
  }

  return signInWithEmailAndPassword(
    auth,
    email.trim(),
    password
  );
}

// Sign out
function signOutWebsite() {
  return signOut(auth);
}

// Send a message to Firebase
function sendBotMessage(sender, message) {
  const text =
    typeof message === "string"
      ? message
      : JSON.stringify(message ?? "");

  if (!text.trim()) {
    return Promise.reject(
      new Error("Cannot send an empty message.")
    );
  }

  return push(botMessagesRef, {
    sender: String(sender || "BOT"),
    message: text,
    timestamp: new Date().toISOString()
  });
}

// Send a connection test from the website
function sendConnectionTest() {
  return sendBotMessage(
    "WEBSITE",
    "CONNECTION_TEST"
  );
}

// Listen for messages from both bots
function listenForBotMessages(callback) {
  return onValue(
    botMessagesRef,
    (snapshot) => {
      const data = snapshot.val() || {};

      const messages = Object.entries(data)
        .map(([id, item]) => {
          if (typeof item === "string") {
            return {
              id,
              sender: "BOT",
              text: item,
              timestamp: ""
            };
          }

          if (!item || typeof item !== "object") {
            return null;
          }

          const text =
            typeof item.message === "string"
              ? item.message
              : typeof item.text === "string"
                ? item.text
                : "";

          return {
            id,
            sender: item.sender || "BOT",
            text,
            timestamp: item.timestamp || ""
          };
        })
        .filter((item) => item && item.text.trim())
        .sort((a, b) =>
          String(a.timestamp).localeCompare(
            String(b.timestamp)
          )
        );

      callback(messages);
    },
    (error) => {
      console.error(
        "Firebase message listener error:",
        error
      );
    }
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
  sendConnectionTest,
  listenForBotMessages,
  signOut,
  signOutWebsite
};
