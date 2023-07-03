import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages";

const routes = createBrowserRouter([{ path: "/", element: <Home /> }]);

const Routes = () => {
  return <RouterProvider router={routes} />;
};

export default Routes;
