import React, { useContext } from "react";
import { AppContext } from "./Providers";

const App = () => {
  const [state] = useContext(AppContext);
  return <div>App {state.user.loggedIn}</div>;
};

export default App;
