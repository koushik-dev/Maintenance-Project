importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");
const firebaseConfig = {
  apiKey: "AIzaSyB9GGwROTtLZSoCawjQa5VAQ2hOm0rClC0",
  authDomain: "maintenance-e4f2c.firebaseapp.com",
  projectId: "maintenance-e4f2c",
  storageBucket: "maintenance-e4f2c.appspot.com",
  messagingSenderId: "8573202674",
  appId: "1:8573202674:web:bf34868a5182cdc21be06b",
  measurementId: "G-ZTEC7L9VSM",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
});
