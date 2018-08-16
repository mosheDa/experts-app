import React, { Component } from 'react';
import Nav from './Nav';
import { login, logout, isLoggedIn } from '../utils/AuthService';

class Home extends Component {


  render() {

    return (
      <div>
        <Nav />
        <h2>Home page </h2>
        
           {
             (isLoggedIn()) ? "" : ( <button className="btn btn-info log" onClick={() => login()}>Please Log In</button> )
           }
        
      </div>
    );
  }
}

export default Home;
