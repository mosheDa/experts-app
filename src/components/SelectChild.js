
import React, { Component } from 'react';
import axios from 'axios';
import Nav from './Nav';
import DisplayByName from './DisplayByName';
import history from './history';
import { CloudinaryContext, Transformation, Video } from 'cloudinary-react';

const CLOUDBINARY_API_ENDPOINT = 'https://videos-diagnosis.herokuapp.com/users'
// const CLOUDBINARY_API_ENDPOINT = 'http://localhost:3001/users'

class SelectChild extends Component {

  state = { users: [], expertName:"" };

  getUsers() {
    axios.get(CLOUDBINARY_API_ENDPOINT)
          .then(res => {
            console.log(res.data)
            this.setState({ ...this.state, users: res.data});
    });
  }

  componentWillMount() {
    // const expertName = localStorage.getItem("username");
    const expertName = ""
    
    this.setState({ ...this.state, expertName});
    
    this.getUsers();
  }

  handleClick(e){
    // history.push(`/name/${e.currentTarget.value}`);
    console.log(e)
    history.push(`/name/${e.userData.userName}`);
    
  }

  render() {

    const { users ,expertName}  = this.state;
    const imgStyle ={
      width:50,
      height:50
    }

    return (
<div className="col-sm-12">
     <Nav /> 
     <h2 className="text-center">{expertName} expert page</h2>
     
     <div className="col-sm-12">
          <CloudinaryContext cloudName="dtvoiy5lg">
            { users.map((userData, index) => (
                <div style={{border:"solid 0.5px",borderRadius:"10px", margin:"3px"}} className="border border-primary col-sm-2" key={index}>
                  <div onClick={()=>{this.handleClick({userData}) } }className="embed-responsive embed-responsive-4by3">
                    <Video publicId={userData.userVideoImage} >
                    </Video>
                  </div>
                  <div className="text-center"> {userData.userName} ({userData.videosCount}) </div>
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
