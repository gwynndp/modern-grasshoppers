import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import $ from 'jquery';
import CheckLoggedIn from './components/CheckLoggedIn.jsx';
import Layout from './pages/Layout.jsx';
import Account from './components/Account.jsx';
import Signout from './components/UserSignout.jsx';


var app = document.getElementById('app');

var routes = (
    <Route path="/" component={App}>

      <Route path="signin" component={UserSignIn} />
      <Route path="signup" component={UserSignUp} />
      <Route component={CheckLoggedIn}>
        <Route path="tasks" component={Layout} />
        <Route path="account" component={Account} />
        <Route path="signout" component={Signout} />
      </Route>
      <Route path='*' component={NotFound} />
    </Route>
);

const NotFound = () => (
  <h1>404.. This page is not found!</h1>
)

ReactDOM.render(
  <Router history={hashHistory}>{routes}</Router>,
app);

