import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import {
  getMessaging,
  getToken,
  MessagePayload,
  onMessage,
} from "firebase/messaging";

import { updateUser } from "../api";
import { SuperUser } from "../MetaData";

const firebaseConfig = {
  apiKey: "AIzaSyB9GGwROTtLZSoCawjQa5VAQ2hOm0rClC0",
  authDomain: "maintenance-e4f2c.firebaseapp.com",
  projectId: "maintenance-e4f2c",
  storageBucket: "maintenance-e4f2c.appspot.com",
  messagingSenderId: "8573202674",
  appId: "1:8573202674:web:bf34868a5182cdc21be06b",
  measurementId: "G-ZTEC7L9VSM",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const messaging = getMessaging(firebaseApp);
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register(
      import.meta.env.MODE === "production" ? "/sw.js" : "/dev-sw.js?dev-sw",
      { type: import.meta.env.MODE === "production" ? "classic" : "module" }
    )
    .then(() => requestPermission());
}
// Authentication
export const auth = getAuth();

export const signUp = (username: string, password: string) =>
  createUserWithEmailAndPassword(auth, username, password);

export const logIn = (username: string, password: string) =>
  signInWithEmailAndPassword(
    auth,
    `${username}@maintenance.com`,
    password
  ).then((userCredential) => {
    if (username.toLocaleLowerCase() !== SuperUser.toLocaleLowerCase())
      updateUser(userCredential.user.uid, {
        last_login: new Date().toLocaleString(),
      }).then((_) => console.log(`${username} signed in.`));
    return userCredential;
  });

export const logOut = () => signOut(auth).catch((err) => console.error(err));
export const onMessageListener: () => Promise<MessagePayload> = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("payload", payload);
      navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification("Vibration Sample", {
          body: "Buzz! Buzz!",
          icon: "/assets/android-chrome-192x192.png",
          vibrate: [200, 100, 200, 100, 200, 100, 200],
          tag: "vibration-sample",
        });
      });
      resolve(payload);
    });
  });
function requestPermission() {
  console.log("Requesting permission...");

  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification permission granted.");
      getToken(messaging, {
        vapidKey:
          "BPAcKKi4TJlIC82I0cYc3DFwqJMfp_jAODbqLc4tx8Tu7RA0gy2MG_XnpVeS39hGmMK-ksDNzF3vnAGztKKKKng",
      })
        .then((currentToken) => {
          if (currentToken) {
            console.log(currentToken);
            updateUser("0k6hc0HqULatUrnKHt82hcXSW1J2", {
              token: currentToken,
            }).then((_) => console.log(` signed in.`));
            // Send the token to your server and update the UI if necessary
            // ...
          } else {
            // Show permission request UI
            console.log(
              "No registration token available. Request permission to generate one."
            );
            // ...
          }
        })
        .catch((err) => {
          console.log("An error occurred while retrieving token. ", err);
          // ...
        });
    }
  });
}
