import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import context provider to wrap around app component
import { ActivitiesContextProvider } from "./context/ActivityContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ActivitiesContextProvider>
      <App />
    </ActivitiesContextProvider>
  </React.StrictMode>
);
