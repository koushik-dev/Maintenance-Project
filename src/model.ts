export enum Actions {
  EXPENSES = "expenses",
  ADD_USER = "add_user",
}

export const defaultState = {
  user: {
    name: "John Doe",
    loggedIn: false,
  },
};

export type IState = {
  user: {
    name: string;
    loggedIn: boolean;
  };
};

export type IAction = {
  type: Actions;
  payload: Partial<IState>;
};

export type IContext = [IState, React.Dispatch<IAction>];
