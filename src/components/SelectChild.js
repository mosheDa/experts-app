
import React, { Component } from 'react';
import axios from 'axios';
import Nav from './Nav';
import DisplayByName from './DisplayByName';
import history from './history';
// import { BrowserRouter, Route, Redirect } from 'react-router-dom'
// import {browserHistory} from 'react-router';

const CLOUDBINARY_API_ENDPOINT = 'https://videos-diagnosis.herokuapp.com/users'

class SelectChild extends Component {

  state = { users: [] };

  getUsers() {
    axios.get(CLOUDBINARY_API_ENDPOINT)
          .then(res => {
            this.setState({ users: res.data});
    });
  }

  componentDidMount() {
    this.getUsers();
  }

  handleClick(e){
    history.push(`/name/${e.currentTarget.value}`);
  }

  render() {

    const { users }  = this.state;

    return (
      <div>
     <Nav /> 
    { users.map((username, index) => (
       
       <button key={index} onClick={this.handleClick} value={username} >{username}</button>       
           ))
         }
      
      </div>
    );
  }
}

export default SelectChild;


