import { readDocument, updateDocument } from "../firebase";
import { Timestamp } from "firebase/firestore";
import { TClosingBalance, TMonth } from "../model";

const docId = "2023-2024";

export const getAllExpenses = (year: string = docId) =>
  readDocument("maintenance", year);
export const updateClosingBalances = (
  closing_balances: TClosingBalance["closing_balances"]
) => updateDocument("maintenance", docId, { closing_balances });
export const updateExpenses = (month: string, monthDetails: TMonth) =>
  updateDocument("maintenance", docId, {
    [`months.${month}`]: { expenses: monthDetails.expenses },
  });
export const editExpenses = (monthDetails: TMonth & TClosingBalance) =>
  updateExpenses(
    (
      (monthDetails.expenses[0].date as unknown as Timestamp)
        .toDate()
        ?.getMonth() + 1
    ).toString(),
    monthDetails
  ).then((_) => updateClosingBalances(monthDetails.closing_balances));

export const addExpense = editExpenses;
