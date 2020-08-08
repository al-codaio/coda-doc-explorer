import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function UsernameForm() {
  const [username, setUsername] = React.useState('')
  const isLowerCase = username === username.toLowerCase()
  const error = isLowerCase ? null : 'Username must be lower case'

  function handleSubmit(event) {
    event.preventDefault()
    alert(`You entered: ${username}`)
  }

  function handleChange(event) {
    setUsername(event.target.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="usernameInput">Username:</label>
        <input id="usernameInput" type="text" onChange={handleChange} />
      </div>
      <div style={{color: 'red'}}>{error}</div>
      <button disabled={Boolean(error)} type="submit">
        Submit
      </button>
    </form>
  )
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
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
      <UsernameForm />
    </div>
  );
}

export default App;
