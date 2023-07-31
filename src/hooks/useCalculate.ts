import { Expenses, FinancialMonths } from "../MetaData";
import { useStore } from "../Providers";
import { useUtility } from "./useUtility";

export const useCalculate = () => {
  const [state] = useStore();
  const { getMonthStr } = useUtility();
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
  const calculateClosingBalance = (
    expense: number = 0,
    monthIndex: number = 0
  ) => {
    const changedMonthIndex = FinancialMonths.indexOf(
      getMonthStr(+monthIndex - 1)
    );
    return FinancialMonths.slice(
      0,
      new Date().getMonth() - 1 || undefined
    ).reduce((cb, month, index) => {
      const currentMonthIndex = FinancialMonths.indexOf(month);
      return {
        ...cb,
        [month]:
          (state.closing_balances[month] ??
            state.closing_balances[FinancialMonths[index - 1]] ??
            0) + (+currentMonthIndex >= changedMonthIndex ? expense : 0),
      };
    }, {});
  };
  return {
    calculateTotal,
    monthlyData,
    calculateClosingBalance,
  };
};
