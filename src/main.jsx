import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./router";
import Wrapper from "./components/wrapper";
import "./styles/reset.css";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Wrapper>
      <Router />
    </Wrapper>
  </React.StrictMode>
);
