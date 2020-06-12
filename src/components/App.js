import React, { Component } from "react";
import "./App.css";
import { Route, Switch, NavLink } from "react-router-dom";
import Homepage from "../pages/homepage";
import Formpage from "../pages/formpage";
import MultiStepForm from "../pages/multiStepForm";

const Navbar = () => (
  <nav className="main-header">
    <ul>
      <li>
        <NavLink to="/">Homepage</NavLink>
      </li>
      <li>
        <NavLink to="/form">Form</NavLink>
      </li>
      <li>
        <NavLink to="/multiStepForm">Multi Step Form</NavLink>
      </li>
    </ul>
  </nav>
);
class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Homepage}></Route>
          <Route path="/form" component={Formpage}></Route>
          <Route path="/multiStepForm" component={MultiStepForm}></Route>
        </Switch>
      </div>
    );
  }
}

export default App;
