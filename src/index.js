import React from "react";
import ReactDOM from "react-dom";
import "./styles/style.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import Context, { AuthContext } from "./context/context";

async function RenderApp() {
  ReactDOM.render(
    <Router>
      <AuthContext>
        <Context>
          <App />
        </Context>
      </AuthContext>
    </Router>,
    document.getElementById("root")
  );
}

(async () => await RenderApp())();
