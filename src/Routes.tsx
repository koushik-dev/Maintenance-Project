import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import { ErrorPage, Home, Login, Register } from "./pages";
import PrivateRoute from "./PrivateRoute";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home />, errorElement: <ErrorPage /> },
      { path: "/home", element: <App /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/unauthorised",
    element: <Register />,
    errorElement: <ErrorPage />,
  },
]);

const Routes = () => {
  return <RouterProvider router={routes} />;
};

export default Routes;
