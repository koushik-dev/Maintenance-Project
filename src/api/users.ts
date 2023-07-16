import { addDocumentWithID, signUp } from "../firebase";
import { readDocument, updateDocument } from "../firebase";
import { toast } from "react-hot-toast";
import { Errors, UsersCollectionName } from "../MetaData";

export const createUserforSignIn = (username: string, password: string) =>
  signUp(`${username}@maintenance.com`, password)
    .then((userCredential) =>
      addDocumentWithID(UsersCollectionName, userCredential?.user?.uid, {
        contact_number: "",
        flat: {
          floor: "",
          number: "",
          type: "",
        },
        has_tenant: true,
        has_paid_maintenance: true,
        last_login: "",
        name: username,
        vehicles: [{ type: "", registration_number: "" }],
        tenant: {
          name: "",
          contact_number: "",
          vehicles: [{ type: "", registration_number: "" }],
        },
      })
    )
    .catch((err) => {
      if (err.code === "auth/email-already-in-use")
        toast.error(Errors.USER_EXISTS);
      if (err.code === "auth/weak-password")
        toast.error(Errors.PASSWORD_LENGTH);

      throw err;
    });

export const getUser = (docId: string) => {
  return readDocument(UsersCollectionName, docId);
};

export const updateUser = (docId: string, data: any) => {
  return updateDocument(UsersCollectionName, docId, data);
};
