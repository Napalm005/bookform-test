import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import App from './components/App/App';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import './style.css';

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path='/' component={App} />
      <Route path='/signin' component={SignIn} />
      <Route path='/signup' component={SignUp} />
    </Switch>
  </Router>, document.getElementById('root')
);
