import React, { Component } from 'react'

import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import history from '../../history'
import { NavLink } from 'react-router-dom';
import Navbarextra2 from '../forms/Navbar/Navbarextra2';
import Navbarextra  from '../forms/Navbar/Navbarextra';
import { GoArrowSmallLeft } from 'react-icons/go';
 



class PhotoLegende extends Component {
  state = {
    photo:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    legend:null,
    image:"null",
    
  };

  style={
    bg: '#F47E54',
  }
  componentDidMount() {
    const { match: { params } } = this.props;
    axios.get(`/logements/${params.logement_id}/photos/${params.photo_id}`,).then(response => {
      this.setState({
        photo: `  http://f07f4cb.online-server.cloud${response.data.photo.photo.url}`,
        // photo: `  http://127.0.0.1:4000${response.data.photo.photo.url}`,
        legend: response.data.photo.legend,
        tout: response.data.tout,
        rang: response.data.rang
      
      })
      console.log(response)
    })
  }
  savelegend=(value)=>{
    this.setState({
      legend: value.target.value
    })
  }
  savephoto=()=>{
    const { match: { params } } = this.props;  
      let form = new FormData();
      form.append('photo', this.state.image);
      form.append('legend', this.state.legend)
      axios.put(`/logements/${params.logement_id}/photos/${params.photo_id}`, form)
      history.push(`/logement/${params.logement_id}/photo/${params.photo_id}`)

    
  }
  deletephoto=()=>{
    const { match: { params } } = this.props;  
    axios.delete(`/logements/${params.logement_id}/photos/${params.photo_id}`)
    history.push(`/logements/${params.logement_id}/photos/`)
  } 
  
  imageHandler = e => {
    const image = e.target.files[0]
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        this.setState({ photo: reader.result, image: image},()=>{
          console.log(this.state);
        });
        // console.log(reader.result)
      }
    };
    reader.readAsDataURL(e.target.files[0]);
    console.log(this.state)
  };
  render() {
    const { match: { params } } = this.props;  

    return (

<>

    <div className="">
          <Navbarextra logement_id={params.logement_id}/>
            </div> 
            <div className="h-24">
                <Navbarextra2/>
            </div> 
      


  <div className="mt-10 sm:mt-0 ">
    <div className="md:grid md:grid-cols-3 md:gap-6">
      <div className="md:col-span-1">
        <div className="px-4 sm:px-0">
                <NavLink to={`/logements/${params.logement_id}/photos`}>
                  <label className=" px-4 py-5 text-gray-600 text-sm text-blue-500 hover:text-blue-700 hover:font-bold flex " >
                    <GoArrowSmallLeft className="w-10 h-10" /><span className="py-2 px-3 text-base"  >Retour à  toutes les photos</span>
                  </label>
                </NavLink>
             

      <div className ="legende ">
          <div className="page">
            <div className="containerz">
              <div className="img-holderz">
                <img src={this.state.photo} alt="" id="img" className="imgz" />
              </div>
              <input
                type="file"
                accept="image/*"
                name="image-upload"
                id="input"
                onChange={this.imageHandler}
                multiple={false}
              />
            
            </div>
          </div>
        </div>  
      </div>
      </div>
      <div className=" mt-5 md:mt-0 md:col-span-2 " >
          <div className=" shadow overflow-hidden md:rounded-md my-24 ">
            <div className=" px-4 py-5 bg-white sm:p-6 ">
              <div className="grid grid-cols-6 gap-6 ">
              <div className="col-span-6 sm:col-span-4 ">
                <label className="block text-sm font-medium leading-5 text-gray-700">Photo {this.state.rang} sur { this.state.tout} </label>
                <label className="block text-sm font-medium leading-5 text-gray-700">Mise à jour aujourd’hui</label>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label for="country" className="block text-sm font-medium leading-5 text-gray-700">Ajouter des détails à propos de cette photo</label>
                <div className="rounded-md shadow-sm">
                  <textarea id="about" defaultValue={this.state.legend} onChange={this.savelegend} rows="3" className="form-textarea mt-1 block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5" placeholder="Mettre les détails ici"></textarea>
                </div>
                </div>          
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-left sm:px-6">
              <label onClick={this.savephoto}  style={{background: this.style.bg}} className="py-2 px-4  text-sm leading-5 font-medium rounded-md text-white    focus:outline-none focus:shadow-sm  transition duration-150 ease-in-out">
                Enregistrer la photo
              </label>  
              <label onClick={this.deletephoto} className=" ml-4 py-2 px-4  text-sm leading-5 font-medium rounded-md text-blue-500   focus:outline-none  active:text-indigo-600 transition duration-150 ease-in-out">
                    Supprimer cette photo
              </label>
            </div>
          </div>
      </div>
    </div>
  </div>
  <div className="hidden sm:block">
    <div className="py-5">
      <div className="border-t border-gray-200"></div>
    </div>
</div>
</>    

        )
    }
}
export default PhotoLegende;

