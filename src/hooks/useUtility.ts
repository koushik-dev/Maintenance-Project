import { Timestamp } from "firebase/firestore";
import { Expenses } from "../MetaData";
import numWords from "num-words";

export const useUtility = () => {
  const random4 = () => Math.ceil(Math.random() * (9999 - 1000 + 1) + 1000);
  const map = (arr: any[], condition: (param: any) => any) =>
    arr?.map(condition);
  const filter = (arr: any[], condition: (param: any) => boolean) =>
    arr?.filter(condition);
  const getDateFromTimestamp = (date: Timestamp) => date.toDate();
  const getTimestampFromDate = (date: Date) => Timestamp.fromDate(date);
  const capitalize = (str: string) => str[0].toLocaleUpperCase() + str.slice(1);
  const isPositive = (num: number) => num > 0;
  const getIconFromTypes = (name: string) =>
    filter(Expenses.expense_types, (ex) => ex.name === name)[0].icon;
  const getWordsFromNum = (num: number) =>
    numWords(num)
      .split(" ")
      .map((w) => capitalize(w))
      .join(" ") + " only";
  const getMonthStr = (month: number) =>
    new Date(1, month).toLocaleString("en-US", { month: "long" });
  return {
    random4,
    map,
    filter,
    getDateFromTimestamp,
    getTimestampFromDate,
    capitalize,
    isPositive,
    getIconFromTypes,
    getWordsFromNum,
    getMonthStr,
  };
};
