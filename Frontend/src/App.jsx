import React, { useEffect, useState } from 'react';
import Navbar from './Navbar/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Signup from './Login&Signup/Signup';
import Login from './Login&Signup/Login';
import Home from './Components/Home';
import Search from './Components/Search';
import About from './Components/About';
import Model from './Components/Model';
import Musicupload from './MusicUpload/Musicupload'
import profile from './Userprofile/profile';
import Uploadfiles from './Uploadfiles/Uploadfiles';

const App = () => {

  return (
    <>
      <Router>
      <Navbar />
        <Switch>
        <Route path="/Uploadfiles/:signupId" exact component={Uploadfiles} />
        <Route path="/Uploadfiles" component={Uploadfiles} />  
        <Route path="/profile" component={profile} />
        <Route path="/Musicupload" component={Musicupload} />
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
