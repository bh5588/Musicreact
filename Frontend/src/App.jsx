import React, { useEffect, useState } from 'react';
import Navbar from './Navbar/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Home from './Components/Home';
import Search from './Components/Search';
import About from './Components/About';
import Model from './Components/Model';

const App = () => {

  return (
    <>
      <Router>
      <Navbar />
        <Switch>
          <Route path="/Model" component={Model} />
          <Route path="/About" component={About} />
          <Route path="/Search" component={Search} />
          <Route path="/Signup" component={Signup} />
          <Route path="/Login" component={Login} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
