import React, { useState } from 'react';
import logo from './img/mark-lockup.png';
import './App.css';
import Header from './Header'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function UserInfo({userApiKey}) {
  const [status, setStatus] = React.useState('idle')
  const [userinfo, setUserInfo] = React.useState([])
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    if (!userApiKey) {
      return
    }
    setStatus('pending')
    fetchUserData(userApiKey).then(
      userData => {
        setStatus('resolved')
        setUserInfo(userData)
      },
      errorData => {
        setStatus('rejected')
        setError(errorData)
      },
    )
  }, [userApiKey])

  if (status === 'idle') {
    return 'Enter an API key'
  }

  if (status === 'rejected') {
    return 'Oh no...'
  }

  if (status === 'pending') {
    return 'Loading...'
  }

  if (status === 'resolved') {
    return (
      <div>
        <ListDocs userInfo={userinfo} />
        <hr />
        <pre>{JSON.stringify(userinfo, null, 2)}</pre>
      </div>
    )
  }
}

function ListDocs({userInfo}) {
  return (
    <Container fluid>
    <Row>
      <Col style={{border: "1px solid black"}} md="auto">Variable width contentVariable width contentVariable width contentVariable width content</Col>
      <Col style={{border: "1px solid black"}} md="auto">
        2 of 2
      </Col>
    </Row>
      <div>
        <ul>{userInfo.map((item, index) => (<li key={index}>{item['name']}</li>))}</ul>
      </div>
    </Container>
  )
}

function App() {
  const [key, setKey] = React.useState('')

  function handleSubmit(event) {
    event.preventDefault()
    setKey(event.target.elements.userKey.value)
    event.target.reset()
  }

  return (
    <div className="App">
      <Header />         

      {/* Need to move the below into the UsernameForm component */}
      <div>
        <form onSubmit={handleSubmit}>
          <p>DO NOT SHARE YOUR KEY WITH ANYONE</p>
          <label htmlFor="userKey">Your Coda API Key</label>
          <div>
            <input id="userKey" />
            <button type="submit">Submit</button>
          </div>
        </form>
        <UserInfo userApiKey={key} />
      </div>    

    </div>
  );
}

function fetchUserData(key) {
  return window
    .fetch('https://coda.io/apis/v1/docs', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + key,
      }
    })
    .then(r => r.json())
    .then(response => response.items.slice(0,4))
}

export default App;
