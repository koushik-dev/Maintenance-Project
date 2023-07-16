import React, { createContext, Reducer, useReducer } from "react";
import { Actions, defaultState, IAction, IContext, IState } from "./model";

const reducer: Reducer<IState, IAction> = (state, action) => {
  switch (action.type) {
    case Actions.ADD_USER:
      return {
        ...state,
        user: { ...state.user, ...(action.payload as IState["user"]) },
      };
    case Actions.DELETE_USER:
      return {
        ...state,
        user: {},
      };
    case Actions.MONTHLY_EXPENSES:
      return { ...state, months: { ...state.months, ...action.payload } };
    case Actions.SIDEBAR:
      return { ...state, isSideBarOpen: !state.isSideBarOpen };
    default:
      return state;
  }
};

const AppContext = createContext([] as unknown as IContext);
export const useStore = () => React.useContext(AppContext);
const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const state = useReducer<Reducer<IState, IAction>>(reducer, defaultState);

  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
};

export default Providers;
