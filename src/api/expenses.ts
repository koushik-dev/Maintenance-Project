import { readDocument, updateDocument } from "../firebase";
import { Timestamp } from "firebase/firestore";
import { TMonth } from "../model";

const docId = "22-23";

export const getAllExpenses = () => readDocument("maintenance", docId);

export const updateExpenses = (month: string, monthDetails: TMonth) =>
  updateDocument("maintenance", docId, {
    [`months.${month}`]: monthDetails,
  });
export const editExpenses = (monthDetails: TMonth) =>
  updateExpenses(
    (
      (monthDetails.expenses[0].date as unknown as Timestamp)
        .toDate()
        ?.getMonth() + 1
    ).toString(),
    monthDetails
  );

export const addExpense = editExpenses;
