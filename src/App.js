import React, { useState, useEffect } from 'react';
import logo from './img/mark-lockup.png';
import './App.css';
import Header from './Header'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { SortArray } from './helpers/Helpers';
import dateFormat from 'dateformat';

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
    return 'Invalid key'
  }

  if (status === 'pending') {
    return 'Loading...'
  }

  if (status === 'resolved') {
    return (
      <div>
        <br/>
        <ListDocs userInfo={userinfo} />
        <hr />
        <pre>{JSON.stringify(userinfo, null, 2)}</pre>
      </div>
    )
  }
}

function ListDocs({userInfo}) {
  const [sortType, setSortType] = useState('updatedAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [docSizeFlag, setDocSizeFlag] = useState(0);
  // const [sortedUserInfo, setSortedUserInfo] = useState(userInfo);
  // console.log(userInfo)
  // console.log(sortOrder)

  const toggleSort = (buttonSort) => {
    switch(buttonSort) {
      case "name":
        setSortType('name');
        break;
      case "rows":
        setSortType('docSize');
        setDocSizeFlag('totalRowCount');
        break;
      case "tables":
        setSortType('docSize');
        setDocSizeFlag('tableAndViewCount');
        break;
      case "lastUpdate":
        setSortType('updatedAt');
        break;
      default:
        setSortType('updatedAt');
        setDocSizeFlag(0)
    }
    if (sortOrder === 'asc') {setSortOrder('desc')}
    else {setSortOrder('asc')}
  } 
  
  useEffect(() => {
    userInfo.sort(SortArray(sortType, sortOrder, docSizeFlag))
    
    // const sortedArray = [...userInfo].sort(SortArray('name', sortType))
    // setSortedUserInfo(sortedArray)
  }, [sortType, sortOrder])

  return (
    <Container fluid>
      <Row>
        <Col style={{border: "1px solid black"}}>
          Docs
          <Row>
            <Col style={{border: "1px solid black"}}>
              Name
              <Button variant="outline-warning" onClick={() => toggleSort('name')}>Sort</Button>
            </Col>
            <Col style={{border: "1px solid black"}}>
              Rows
              <Button variant="outline-primary" onClick={() => toggleSort('rows')}>Sort</Button>
            </Col>
            <Col style={{border: "1px solid black"}}>
              Tables
              <Button variant="outline-success" onClick={() => toggleSort('tables')}>Sort</Button>{' '}
            </Col>
            <Col style={{border: "1px solid black"}}>
              Last Updated
              <Button variant="outline-secondary" onClick={() => toggleSort('lastUpdate')}>Sort</Button>{' '}
            </Col>
          </Row>
        </Col>
        <Col style={{border: "1px solid black"}}>Tables</Col>
        <Col style={{border: "1px solid black"}}>Rows</Col>
      </Row>
      
      

      <Row>
        <Col style={{border: "1px solid black"}}>
          <div>
            <ul>{userInfo.map((item, index) => (<li key={index}>{item['name'] + ', ' + item['docSize']['totalRowCount'] + ', ' + item['docSize']['tableAndViewCount']+ ', ' + dateFormat(item['updatedAt'], "mm/dd/yy")}</li>))}</ul>
          </div>
        </Col>
        <Col style={{border: "1px solid black"}}>Tables</Col>
        <Col style={{border: "1px solid black"}}>Rows</Col>
      </Row>

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
