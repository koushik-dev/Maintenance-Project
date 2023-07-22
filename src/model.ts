import { Timestamp } from "firebase/firestore";

export enum Actions {
  MONTHLY_EXPENSES = "monthly_expenses",
  SET_USER = "set_user",
  ADD_USER = "add_user",
  DELETE_USER = "delete_user",
  SIDEBAR = "sidebar",
}
export const defaultState: IState = {
  users: [],
  months: {},
  isSideBarOpen: false,
};
export type IState = {
  users: any[];
  months: Record<string, TMonth>;
  isSideBarOpen: boolean;
};
export type IAction = {
  type: Actions;
  payload?: any;
};
export type IContext = [IState, React.Dispatch<IAction>];
export type TExpense = {
  expense: string;
  reason: string;
  date: Timestamp;
  amount: number;
  id: number;
  transaction: string;
};
export interface IUser {
  name: string;
  has_tenant: boolean;
  last_login: string;
  contact_number: string;
  flat: {
    number: string;
    type: string;
    floor: string;
  };
  vehicles: {
    type: string;
    registration_number: string;
  }[];
  tenant: {
    name: string;
    contact_number: string;
    vehicles: {
      type: string;
      registration_number: string;
    }[];
  };
}
export type TMonth = {
  opening_balance: number;
  expenses: TExpense[];
  closing_balance: number;
};
