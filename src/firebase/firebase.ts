import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import toast from "react-hot-toast";
import { updateUser } from "../api";
import { Errors } from "../MetaData";

const firebaseConfig = {
  apiKey: "AIzaSyB9GGwROTtLZSoCawjQa5VAQ2hOm0rClC0",
  authDomain: "maintenance-e4f2c.firebaseapp.com",
  projectId: "maintenance-e4f2c",
  storageBucket: "maintenance-e4f2c.appspot.com",
  messagingSenderId: "8573202674",
  appId: "1:8573202674:web:bf34868a5182cdc21be06b",
};

export const firebaseApp = initializeApp(firebaseConfig);

// Authentication
export const auth = getAuth();

export const signUp = (username: string, password: string) =>
  createUserWithEmailAndPassword(auth, username, password);

export const logIn = (username: string, password: string) =>
  signInWithEmailAndPassword(auth, `${username}@maintenance.com`, password)
    .then((userCredential) => {
      updateUser(userCredential.user.uid, {
        last_login: new Date().toLocaleString(),
      }).then((_) => console.log(`${username} signed in.`));
      return userCredential;
    })
    .catch((error) => {
      if (error.code === "auth/user-not-found")
        toast.error(Errors.USER_NOT_FOUND);

      throw error;
    });

export const logOut = () => signOut(auth).catch((err) => console.error(err));
