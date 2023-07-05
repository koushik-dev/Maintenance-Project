import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import toast from "react-hot-toast";
import { Errors } from "../MetaData";

const firebaseConfig = {
  apiKey: "AIzaSyB9GGwROTtLZSoCawjQa5VAQ2hOm0rClC0",
  authDomain: "maintenance-e4f2c.firebaseapp.com",
  projectId: "maintenance-e4f2c",
  storageBucket: "maintenance-e4f2c.appspot.com",
  messagingSenderId: "8573202674",
  appId: "1:8573202674:web:bf34868a5182cdc21be06b",
};

const firebaseApp = initializeApp(firebaseConfig);

// Authentication
export const auth = getAuth();

export const logIn = (username: string, password: string) =>
  signInWithEmailAndPassword(
    auth,
    `${username}@maintenance.com`,
    password
  ).catch((error) => {
    if (error.code === "auth/user-not-found")
      toast.error(Errors.USER_NOT_FOUND);
  });

export const logOut = () => signOut(auth).catch((err) => console.error(err));
