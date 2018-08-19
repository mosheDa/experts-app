 import React, { Component } from 'react';
import { Link } from 'react-router';
import Nav from './Nav';
import { isLoggedIn } from '../utils/AuthService';
import { CloudinaryContext, Transformation, Video } from 'cloudinary-react';
import axios from 'axios';
import Modal from 'react-responsive-modal';

const CLOUDBINARY_API_ENDPOINT = 'https://videos-diagnosis.herokuapp.com/videos/';
const USERS_API_ENDPOINT = 'https://videos-diagnosis.herokuapp.com/users/';
const DIAGNOSIS_API_ENDPOINT = 'https://videos-diagnosis.herokuapp.com/diagnosis/';

class DisplayByName extends Component {

  state = {  open: false, videos: [], result:"" };

  getVideos(username) {
    axios.get(CLOUDBINARY_API_ENDPOINT + username)
          .then(res => {
            this.setState({ videos: res.data.resources.map(resource=>{
              let videoData = resource &&  resource.context && resource.context.custom && 
                resource.context.custom.data;
              
              if(videoData) videoData = JSON.parse(resource.context.custom.data)
              return{
                ...resource, videoData
              }
            })});
    });
  }

  getDiagnosis(username) {
    axios.get(USERS_API_ENDPOINT + username)
          .then(res => {
            this.setState({ dignosis: res.data, result:res.data.result});
    });
  }

  componentWillMount() {
    this.getVideos(this.props.match.params.username);
    this.getDiagnosis(this.props.match.params.username);
    this.setState({...this.state, username: this.props.match.params.username });
  }

  onOpenModal = () => {
    this.setState({...this.state, open: true });
  };

  onCloseModal = () => {
    this.setState({ ...this.state, open: false });
  };

  onUpdateInputValue = (e) => {
    this.setState({ ...this.state, result: e.target.value });
  };

  onSubmit = () => {
    const data = {result:this.state.result}
    const url = DIAGNOSIS_API_ENDPOINT + this.state.dignosis._id;
    axios.put(url, data)
    .then(res => {
      this.setState({ ...this.state, open: false });
    })
    .catch(err => {
      console.err(err)
      alert("fail")
    });
  };

  render() {

    const { videos, open, username }  = this.state;

    return (
      <div dir="ltr">
        <Nav /> 
        <h3 className="text-center"> Videos of {username}</h3>
        <div>
        <button className="btn btn-warning" onClick={this.onOpenModal}>Open diagnosis</button>
        <Modal open={open} onClose={this.onCloseModal} center>
          <h3>Diagnosis</h3>
          <textarea  value={this.state.result} className="form-control"cols="50" rows="20" id="comment" onChange={this.onUpdateInputValue}></textarea>
         <div style={{alignItems:"right"}} >
          <button  style={{margin:"5px"}} className="btn btn-success" onClick={this.onSubmit}><span className="glyphicon glyphicon-ok"></span></button>  
          <button className="btn btn-primary" onClick={this.onCloseModal}><span class="glyphicon glyphicon-share-alt" aria-hidden="true"></span></button>         
        </div>  
        </Modal>
      </div>
        <hr/>

        <div className="col-sm-12">
          <CloudinaryContext cloudName="dtvoiy5lg">
            { videos.map((data, index) => (
                <div className="col-sm-4" key={index}>
                  <div className="embed-responsive embed-responsive-4by3">
                    <Video publicId={data.public_id} width="50"  controls>
                    </Video>
                  </div>
                  <div> Created at: {new Date(data.created_at).toDateString()}</div>                 
                  {data.videoData && data.videoData.videoInfo ?
                    <div> Info: {data.videoData.videoInfo}</div>  
                     : ""}
                  {data.videoData && data.videoData.age ?  <div> Age: {data.videoData.age} month</div>                      
                 : ""}
                </div>
              ))
            }
          </CloudinaryContext>
        </div>
      </div>
    );
  }
}

export default DisplayByName;
