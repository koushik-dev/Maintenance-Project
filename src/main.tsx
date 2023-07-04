import React from "react";
import ReactDOM from "react-dom/client";
import Routes from "./Routes";
import "./main.css";
import Providers from "./Providers";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Providers>
      <Routes />
    </Providers>
  </React.StrictMode>
);
