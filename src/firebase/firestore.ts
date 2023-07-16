import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  DocumentData,
} from "firebase/firestore";
import { firebaseApp } from ".";

// Database
const db = getFirestore(firebaseApp);

export const addDocument = async (collectionName: string, document: any) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), document);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document", e);
  }
};
export const addDocumentWithID = async (
  collectionName: string,
  docId: string = Math.ceil(
    Math.random() * (9999 - 1000 + 1) + 1000
  ).toString(),
  document: any
) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await setDoc(docRef, document);
    return true;
  } catch (e) {
    console.error("Error adding document with id", e);
  }
};
export const readAllDocuments = async (collectionName: string) => {
  const querySnapShot = await getDocs(collection(db, collectionName));
  const data: DocumentData[] = [];
  querySnapShot.forEach((d) => data.push({ ...d.data(), docId: d.id }));
  return data;
};
export const readDocument = async (collectionName: string, docId: string) => {
  const docRef = doc(db, collectionName, docId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    throw "No such document";
  }
};
export const updateDocument = async (
  collectionName: string,
  docId: string,
  data: any
) => {
  const docRef = doc(db, collectionName, docId);
  await updateDoc(docRef, data);
};
export const deleteDocument = async (collectionName: string, docId: string) => {
  const docRef = doc(db, collectionName, docId);
  await deleteDoc(docRef);
};
