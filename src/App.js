import {
  BrowserRouter as Router, Route, Switch
} from "react-router-dom";
import './App.css';
import Home from './components/Home';
import MealFinder from "./components/MealFinder";
import NabBar from './components/NabBar';
import TeamDetails from "./components/TeamDetails";
import GoogleAuth from "./components2/GoogleAuth";




function App() {
  
  return (
    <Router>
    <NabBar/>
      <div className="App">
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
      </Switch>
      </div>
    </Router>
  );
}

export default App;
