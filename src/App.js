import React, { Component } from 'react';

import Home from './component/home/home';
import Register from './component/register/register';
import Encounter from './component/encounter/encounter';
import Report from './component/report/report';


import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'


const HomePage = () => (
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/register" component={Register} />
      <Route path="/encounter" component={Encounter} />
      <Route path="/report" component={Report} /> 
    </div>
  </Router>
)
export default HomePage;