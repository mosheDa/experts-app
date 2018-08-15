
import React, { Component } from 'react';
import axios from 'axios';
import Nav from './Nav';
import DisplayByName from './DisplayByName';
import history from './history';
import { CloudinaryContext, Transformation, Video } from 'cloudinary-react';


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
    // history.push(`/name/${e.currentTarget.value}`);
    console.log(e)
    history.push(`/name/${e.username}`);
    
  }

  render() {

    const { users }  = this.state;
    const imgStyle ={
      width:50,
      height:50
    }

    return (
<div className="col-sm-12">
     <Nav /> 
     
     <div className="col-sm-12">
          <CloudinaryContext cloudName="dtvoiy5lg">
            { users.map((username, index) => (
                <div className="col-sm-2" key={index}>
                  <div onClick={()=>{this.handleClick({username}) } }className="embed-responsive embed-responsive-4by3">
                    <Video publicId="egv6b46uphvswsixyaah"  ></Video>
                  </div>
                  <div> {username} </div>
                </div>
              ))
            }
          </CloudinaryContext>
        </div>
      </div>
      
    );
  }
}

export default SelectChild;
