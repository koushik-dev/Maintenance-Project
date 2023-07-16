import React from "react";
import { Expenses } from "../MetaData";
import { useStore } from "../Providers";

export const useCalculate = () => {
  const [state] = useStore();
  const calculate = (month: number | string) =>
    state.months[month]?.expenses.reduce(
      (acc, expense) =>
        acc +
        expense.amount * (expense.transaction === Expenses.credit ? 1 : -1),
      0
    ) || 0;
  return {
    calculate,
  };
};
