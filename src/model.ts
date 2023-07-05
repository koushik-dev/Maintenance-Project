export enum Actions {
  EXPENSES = "expenses",
  ADD_USER = "add_user",
  DELETE_USER = "delete_user",
}

export const defaultState = {
  user: {},
};

export type IState = {
  user: any;
};

export type IAction = {
  type: Actions;
  payload?: any;
};

export type IContext = [IState, React.Dispatch<IAction>];
