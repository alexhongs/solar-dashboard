import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Components/Home';
import Signup from './Components/SignUp';
import Login from './Components/LogIn';
import Dashboard from './Components/Dashboard';
import Analytics from './Components/Analytics';
import './App.css';

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/home" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/analytics" component={Analytics} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
