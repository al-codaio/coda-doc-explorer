import React, { Component } from 'react';
import logo from './img/mark-lockup.png';

export default class Header extends Component {
  render() {
    return(
      <header className="App-header">
        <a href="https://www.coda.io/" target="_blank" rel="noopener noreferrer"><img src={logo} className="App-logo" alt="coda-logo" /></a>
        <h1>
          Coda Doc Explorer
        </h1>
        <a
          className="App-link"
          href="https://www.coda.io/api"
          target="_blank"
          rel="noopener noreferrer"
        >
          Coda API
        </a>
      </header>
    )
  }
}