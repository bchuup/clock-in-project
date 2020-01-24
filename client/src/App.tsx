import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './components/Home';
import MainPageLayout from './layouts/MainPageLayout';
import ClockInPage from './components/ClockInPage';
import http from './http';
import { User } from './models';
import styled from 'styled-components';

const AppContainer = styled.div`
  max-width: 1275px;
  margin: auto;
  padding-bottom: 100px;
` 
 
function App() {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    http.get('/api/users').then((res) => {
      const fetched = res.data as User[];
      setUsers(fetched);
    })
  }, [])
  return (
    <AppContainer>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Home users={users} setUsers={setUsers}/>
          </Route>
          <Route path="/clock-in-page/:userId" exact>
            <ClockInPage/>
          </Route>
        </Switch>
      </Router>
    </AppContainer>
  );
}

export default MainPageLayout(App);
