import React from "react";
import ReactDOM from "react-dom/client";
import Routes from "./Routes";
import "./main.css";
import Providers from "./Providers";
import { Toaster } from "react-hot-toast";
import Themes from "./ThemeProviders";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Providers>
      <Themes>
        <Routes />
        <Toaster />
      </Themes>
    </Providers>
  </React.StrictMode>
);
