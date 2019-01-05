import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
// import logo from './logo.svg';
import LoginForm from './component/LoginForm'
import Chat from './component/Chat'

import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/chat/:loginname" exact component={Chat} />
          <Route path="/" component={LoginForm} />
        </Switch>
      </div>
    )
  }
}

export default App
