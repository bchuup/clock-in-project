import axios from 'axios';
import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

// if in prod use prod url else use http://localhost:8080
const http = axios.create({
  baseURL: process.env.NODE_ENV === 'production' 
    ? 'http://clock-in-project.herokuapp.com/api'
    : 'http://localhost:8080/api'
});

function App() {
  const [greeting, setGreeting] = useState();
  useEffect(() => {
    console.log('NODE_ENV', process.env.NODE_ENV);
    http.get('/test').then((response) => {
      setGreeting(response.data);
      console.log('test');
    })
  })
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
