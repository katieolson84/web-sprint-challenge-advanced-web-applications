import React from "react";
import { Route } from "react-router-dom";
import { BrowserRouter as Router } from 'react-router-dom';
// Components
import Login from "./components/Login";
import BubblePage from './components/BubblePage';
import PrivateRoute from './components/PrivateRoute';

// Styling
import "./styles.scss";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  
  return (
    <Router>
      <div className='App'>
        <PrivateRoute path= '/bubble-page' component={BubblePage} />
        <Route exact path="/" component={Login} />
      </div>
    </Router>
  );
}

export default App;

//Task List:
//1. Render BubblePage as a PrivateRoute