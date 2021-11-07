import React from "react";
import ReactDOM from "react-dom";
import "./styles/style.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import Context from "./context/context";

ReactDOM.render(
  <Router>
    <Context>
      <App />
    </Context>
  </Router>,
  document.getElementById("root")
);
