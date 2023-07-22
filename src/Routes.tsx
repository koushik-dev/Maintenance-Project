import { useEffect } from "react";
import toast from "react-hot-toast";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { onMessageListener } from "./firebase";
import {
  ErrorPage,
  Expenses,
  Home,
  Login,
  MonthlyBalanceSheet,
  Receipt,
  Users,
  YearlyBalanceSheet,
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
      { path: "/bsyearly", element: <YearlyBalanceSheet /> },
      { path: "/receipt", element: <Receipt /> },
      { path: "/users", element: <Users /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
]);

const Routes = () => {
  useEffect(() => {
    onMessageListener()
      .then((payload) => {
        toast.success(payload.notification?.title || "");
        console.log("from listerner", payload);
      })
      .catch((err) => console.log("failed: ", err));
  }, []);

  return <RouterProvider router={routes} />;
};

export default Routes;
