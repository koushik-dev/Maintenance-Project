import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Providers";

const Login = () => {
  const [state] = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (state.user.loggedIn) {
      return navigate("/");
    }
  }, [state.user.loggedIn]);

  return <div>Login</div>;
};

export default Login;
