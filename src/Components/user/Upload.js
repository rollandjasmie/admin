
import axios from 'axios';
import React, { Component } from 'react';
import history from '../../history'

import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Loading from './Chargement'


 class Upload extends Component {
  state = {
    avatar:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    loading:false
  };
  componentDidMount() {
    const fetchData = async () => {
      this.setState({
        loading: !this.state.loading
      })
      const op = await axios.get('/users/show')
      if (op.data.photo === true) {
        this.setState({
          // avatar: `http://localhost:4000${op.data.avatar}`
          avatar: `http://f07f4cb.online-server.cloud${op.data.avatar}`

        })
      } 
      this.setState({
        loading: !this.state.loading
      })
    }
    fetchData()
  }
  imageHandler = e => {
   
    let formData = new FormData(); 
    formData.append('featured_image', e.target.files[0]);
    const fetchData = async () => {
      this.setState({
        loading: !this.state.loading
      })
      await axios.put("/avatar", formData)
     
      history.push('/EditProfil')
      
    }
    fetchData()
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        this.setState({ avatar: reader.result });
      }
      
    };
    
    reader.readAsDataURL(e.target.files[0]);
    
    
    
  };

  render() {
    return (
      <>
      {
          this.state.loading ? (<><Loading /></>
    ):(
        <div className="page">
            <div className="container">
              <div className="img-holder rounded-full shadow">
                <img src={this.state.avatar} alt="" id="img" className="img rounded-full " />
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
            </div >
          </div >
  
)
      }
      
      </>
      );
    }
}

export default Upload;
