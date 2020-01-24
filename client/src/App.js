import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './components/Home.js'
import MainPageLayout from './layouts/MainPageLayout';
import ClockInPage from './components/ClockInPage';

const http = axios.create({
  baseURL: process.env.NODE_ENV === 'production' 
    ? 'http://clock-in-ben-chu.herokuapp.com'
    : 'http://localhost:8080'
});

function App() {
  const [greeting, setGreeting] = useState();
  useEffect(() => {
    http.get('/api/users').then((res) => {
      console.log('hello', res);
    })
  }, [])
  return (
    <div>
      <Router>
        <div>
          <Link to="/">Home</Link>
          <Link to="/clock-in-page">users</Link>
          <Switch>
            <Route path="/" exact>
              <Home/>
            </Route>
            <Route path="/clock-in-page" exact>
              <ClockInPage/>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default MainPageLayout(App);
