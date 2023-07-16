export enum Actions {
  MONTHLY_EXPENSES = "monthly_expenses",
  ADD_USER = "add_user",
  DELETE_USER = "delete_user",
  SIDEBAR = "sidebar",
}
export const defaultState: IState = {
  user: {},
  months: {},
  isSideBarOpen: false,
};
export type IState = {
  user: any;
  months: Record<string, Record<string, TExpense[]>>;
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
  date: Date;
  amount: number;
  id: number;
  transaction: string;
};
