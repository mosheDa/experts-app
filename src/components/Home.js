import React, { Component } from 'react';
import Nav from './Nav';


class Home extends Component {


  render() {

    return (
      <div>
        <Nav />
        <h2>Home page </h2>
        <a>Please login</a>
        
      </div>
    );
  }
}

export default Home;
