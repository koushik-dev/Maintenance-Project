import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  ErrorPage,
  Expenses,
  Home,
  Login,
  MonthlyBalanceSheet,
  Receipt,
} from "./pages";
import PrivateRoute from "./PrivateRoute";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/expenses", element: <Expenses /> },
      { path: "/bsmonthly", element: <MonthlyBalanceSheet /> },
      { path: "/receipt", element: <Receipt /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
]);

const Routes = () => {
  return <RouterProvider router={routes} />;
};

export default Routes;
