import React from 'react';
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link, Switch, withRouter } from 'react-router-dom';
import Profile from './Profile'
import Store from '../store'
import Header from './Header'
import Login from './Login'

class TriviaApp extends React.Component {


  render() {
  return(
    <div>
    <Header/>
    <Switch>
      <Route path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <Route path="/profile" component={withRouter(Profile)} />
      other routes (leaderboard/play)
    </Switch>
    </div>
  )
}

}
