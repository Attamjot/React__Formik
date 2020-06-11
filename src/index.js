import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { BrowserRouter as Router } from "react-router-dom";

const Application = (
  <Router>
    <App />
  </Router>
);
ReactDOM.render(Application, document.getElementById("root"));
