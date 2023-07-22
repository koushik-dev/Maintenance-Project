import { Expenses } from "../MetaData";
import { TExpense } from "../model";
import { useStore } from "../Providers";

export const useCalculate = () => {
  const [state] = useStore();
  const defaults = { credit: 0, debit: 0, total: 0 };
  const monthlyData = state.months;
  const calculateTotal = (month: number | string) =>
    monthlyData[month]?.expenses.reduce(
      (acc, expense) => ({
        credit:
          acc.credit +
          (expense.transaction === Expenses.credit ? expense.amount : 0),
        debit:
          acc.debit +
          (expense.transaction === Expenses.debit ? expense.amount : 0),
        total:
          acc.total +
          expense.amount * (expense.transaction === Expenses.credit ? 1 : -1),
      }),
      defaults
    ) || defaults;
  const calculateClosingBalance = (
    arr: TExpense[] = [],
    openingBalance: number = 0
  ) =>
    openingBalance +
    arr.reduce(
      (acc, ex) =>
        acc + ex.amount * (ex.transaction === Expenses.credit ? 1 : -1),
      0
    );
  return {
    calculateTotal,
    monthlyData,
    calculateClosingBalance,
  };
};
