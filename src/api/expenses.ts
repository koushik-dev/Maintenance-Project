import { readDocument, updateDocument } from "../firebase";
import { arrayUnion, Timestamp } from "firebase/firestore";
import { TExpense } from "../model";

const docId = "22-23";

export const getAllExpenses = () => readDocument("maintenance", docId);
export const addExpense = (expense: TExpense) =>
  updateDocument("maintenance", docId, {
    [`months.${expense.date.getMonth() + 1}.expenses`]: arrayUnion(expense),
  });
export const updateExpenses = (month: string, expenses: TExpense[] = []) =>
  updateDocument("maintenance", docId, {
    [`months.${month}.expenses`]: expenses,
  });
export const editExpenses = (expenses: TExpense[]) =>
  updateExpenses(
    (
      (expenses[0].date as unknown as Timestamp).toDate()?.getMonth() + 1
    ).toString(),
    expenses
  );
