import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AppContext } from "./Providers";

const PrivateRoute = () => {
  const [state] = useContext(AppContext);

  return <>{state.user.loggedIn ? <Outlet /> : <Navigate to="/login" />}</>;
};

export default PrivateRoute;
