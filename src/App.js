import React, { useState } from 'react';
import logo from './img/mark-lockup.png';
import './App.css';
import Header from './Header'

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

function UserInfo({userApiKey}) {
  const [status, setStatus] = React.useState('idle')
  const [userinfo, setUserInfo] = React.useState(null)
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
    return <pre>{JSON.stringify(userinfo, null, 2)}</pre>
  }
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

      <UsernameForm />

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
        <hr />
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
    .then(response => response.items[0])
}

export default App;
