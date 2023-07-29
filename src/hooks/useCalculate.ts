import { Expenses } from "../MetaData";
import { useStore } from "../Providers";

export const useCalculate = () => {
  const [state] = useStore();
  const defaults = { credit: 0, debit: 0, total: 0 };
  const monthlyData = state.months;
  const calculateTotal = (month: number | string) =>
    monthlyData[month]?.expenses?.reduce(
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
  const calculateClosingBalance = (expense: number = 0, month: number = 0) =>
    // TODO: will throw error if the months indexes are not prepopulated in db
    Object.keys(state.closing_balances).reduce(
      (cb, monthIndex) => ({
        ...cb,
        [monthIndex]:
          state.closing_balances[monthIndex] +
          (+monthIndex >= month ? expense : 0),
      }),
      {}
    );
  return {
    calculateTotal,
    monthlyData,
    calculateClosingBalance,
  };
};
