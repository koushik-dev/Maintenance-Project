import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Typography } from "@mui/material";
import { AppContext } from "../Providers";

const Home = () => {
  const [state] = useContext(AppContext);

  useEffect(() => {
    console.log(state.user.loggedIn);
  }, []);
  return (
    <div>
      <Typography variant="h6" className="underline">
        Home {state.user.name} {"" + state.user.loggedIn}
      </Typography>
      <Outlet />
    </div>
  );
};

export default Home;
