import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Link to="/signin"><Button type="primary" icon="api" className="login-form__button">Start!</Button></Link>
      </div>
    );
  }
}

export default App;
