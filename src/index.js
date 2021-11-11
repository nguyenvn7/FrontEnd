import React from "react";
import ReactDOM from "react-dom";
import "./styles/style.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import Context, { AuthContext } from "./context/context";
import Test from "./context/test";

async function RenderApp() {
  ReactDOM.render(
    <Router>
   <Context>
    <AuthContext>
      <App/>
    </AuthContext>
   </Context>
 </Router>,
    document.getElementById("root")
  );
};

(async () => await RenderApp())();
