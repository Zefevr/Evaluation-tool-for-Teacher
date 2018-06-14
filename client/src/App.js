import React, { Component } from 'react'
import './App.css'
import TopBar from './components/TopBar/TopBar'
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom"
import LoginForm from './components/log/LoginForm'
import LogoutPage from './components/log/LogoutPage'
import BatchList from './components/batches/BatchesList'
import CreateBatch from './components/batches/CreateBatch'



class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <TopBar/>
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/logout" component={LogoutPage} />
          <Route exact path="/batches" component={BatchList} />
          <Route exact path="/batch/create" component={CreateBatch} />
          <Route exact path="/" render={ () => <Redirect to="/login" /> } />
        </div>
      </Router>
    );
  }
}

export default App;
