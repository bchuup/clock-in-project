import axios from 'axios';
// @ts-ignore
import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

const http = axios.create({
  baseURL: process.env.NODE_ENV === 'production' 
    ? 'http://clock-in-ben-chu.herokuapp.com'
    : 'http://localhost:8080'
});

function App() {
  const [greeting, setGreeting] = useState();
  useEffect(() => {
    http.get('/api').then((res) => {
      setGreeting(res.data);
    })
  }, []);
  useEffect(() => {
    http.get('/api/users').then((res) => {
      console.log('hello', res);
    })
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <h1>{greeting}</h1>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
