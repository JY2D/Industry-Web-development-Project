import "./App.css";
import React from "react";
import TopNavBar from "./Components/TopNavBar";
import Form from "./Components/Form";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { HealthRiskCard } from "./Components/HealthRiskCard";



function App() {
  return (
    <div>
      <Router>
        <TopNavBar />
        <Switch>
          <Route path='/'>
            <Form />
          </Route>
          <Route path='/risks'>
            <HealthRiskCard occupation={"Captain Yeet"} risks={["yeeting, yoting, yating"]} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
