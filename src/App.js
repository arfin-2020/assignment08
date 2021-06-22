import { createContext, useState } from "react";
import {
  BrowserRouter as Router, Route, Switch
} from "react-router-dom";
import './App.css';
import Home from './components/Home';
import MealFinder from "./components/MealFinder";
import NabBar from './components/NabBar';
import TeamDetails from "./components/TeamDetails";
import GoogleAuth from "./components2/GoogleAuth";
import Inventory from "./components3/Inventory";
import LoginForm from "./components3/LoginForm";
import PrivateRoute from "./components3/PrivateRoute";
import Review from "./components3/Review";
import Shipment from "./components3/Shipment";


export const UserContext = createContext()

function App() {
  const [loggedInUser, setloggedInUser] = useState({});
  return (
    <UserContext.Provider  value={[loggedInUser, setloggedInUser]}>
    <div className="App">
    <Router>
    <NabBar/>
    <p>user email {loggedInUser.email}</p>
      <Switch>
        <Route path exact = "/">
          <Home/>
        </Route>
        <Route path = "/team/:idTeam">
            <TeamDetails/>
        </Route>
        <Route path = "/meal">
        <MealFinder/>
        </Route>
        <Route path = "/googleAuth">
          <GoogleAuth/>
        </Route>
        <Route path = "/login">
          <LoginForm/>
        </Route>
        <PrivateRoute path = "/shipment">
          <Shipment/>
        </PrivateRoute>
        <Route path = "/review">
          <Review/>
        </Route>
        <PrivateRoute path = "/inventory">
        <Inventory/>
        </PrivateRoute>
      </Switch>
    </Router>
    </div>
    </UserContext.Provider>
  );
}

export default App;
