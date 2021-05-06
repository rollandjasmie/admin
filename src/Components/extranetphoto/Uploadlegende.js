
import axios from 'axios';
import React, { Component } from 'react';
import history from '../../history'

import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';


 class Uploadlegende extends Component {
  state = {
    photo:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
  };
  componentDidMount() {
    axios.get(`/logements/${this.props.logement_id}/photos/${this.props.photo_id}`,).then(response => {
      this.setState({
        photo: `http://f07f4cb.online-server.cloud${response.data.photo.photo.url}`
      })
      console.log(response)
    })
  }
  imageHandler = e => {   
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        this.setState({ photo: reader.result });
        // console.log(reader.result)
      }      
    };    
    reader.readAsDataURL(e.target.files[0]);
  
    // console.log(this.state)
    // let formData = new FormData(); 
    // formData.append('featured_image', e.target.files[0]);
    // console.log(formData)
    // axios.put("/avatar", formData).then(response=>{
    //    console.log(response)
    //     }   
    //   )
  };

  render() {
    return (
      <div className="page">
        <div className="containerz">  
          <div className="img-holderz">
              <img src={this.state.photo} alt="" id="img" className="img" />
          </div>
          <input
            type="file"
            accept="image/*"
            name="image-upload"
            id="input"
            onChange={this.imageHandler}
            multiple={true}
          />
          <div className="label">
            <label className="image-upload" htmlFor="input">              
              <IconButton color="primary" aria-label="upload picture" component="span">
              <PhotoCamera />
              </IconButton>
            </label>
          </div>
        </div>
      </div>
      );
    }
}

export default Uploadlegende;