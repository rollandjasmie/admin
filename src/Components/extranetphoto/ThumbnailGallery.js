import React, { Component} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import Navbarextra2 from '../forms/Navbar/Navbarextra2';
import Navbarextra  from '../forms/Navbar/Navbarextra';
import { GoArrowSmallLeft } from "react-icons/go";
import { NavLink } from 'react-router-dom';
import {DropzoneDialog} from 'material-ui-dropzone'
import { FcAddImage} from "react-icons/fc";
import history from '../../history';
class ThumbnailGallery extends Component {

  
  
  state={
    photos:null,
    name: null,
    open: false,
    
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    console.log(params)
    axios.get(`/logements/${params.logement_id}/photos`).then(response => {
        this.setState({
          photos: response.data.photo,
        })
        console.log(this.state)
    }
    )
    axios.get(`/logements/${params.logement_id}`).then((response) => {
      this.setState({
        name: response.data.logement.name,
      })
    }
    )
  }
 
  
  render() {
    const { photos } = this.state
    const { match: { params } } = this.props;
    let formData = new FormData();
    return (


    <>
     <div className="">
                <Navbarextra logement_id={params.logement_id}/>
            </div> 
            <div className="h-24">
                <Navbarextra2/>
            </div> 
        {
          this.state.name ? (
            <NavLink to={`/extraheb/${params.logement_id}`}>
              <label className=" px-4 py-5 text-gray-600 text-sm text-blue-500 hover:text-blue-700 hover:font-bold flex " >
                <GoArrowSmallLeft className="w-10 h-10" /><span className="py-2 px-3 text-base"  > Retour à la modification de la {this.state.name} </span>
              </label>
            </NavLink>
          ) : null
        }

  <div class=" mx-10 grid grid-cols-3 gap-4 ">

     {photos && photos.map(photo => (
            <div className="py-5" key={photo.id}>
              <img className="w-full h-64 isum" src={`http://f07f4cb.online-server.cloud${photo.photo.url}`}></img>
              {
                photo.legend?(
                  <>
                  <p className="my-3 text-left font-medium text-blue-500 ">
                    {photo.legend}
                  </p>
             <Link to={`/logement/${params.logement_id}/photo/${photo.id}`} >
                  <p className="my-3  text-left text-sm leading-5 font-medium rounded-md text-blue-500  hover:text-indigo-500 focus:outline-none  active:text-blue-600 transition duration-150 ease-in-out horizon">
                    Modifier légende
                  </p>
                </Link>
                  
                  </>
                ):(
                  <Link to={`/logement/${params.logement_id}/photo/${photo.id}`} >
                 <p className="my-3  text-left text-sm leading-5 font-medium rounded-md text-blue-500  hover:text-indigo-500 focus:outline-none  active:text-blue-600 transition duration-150 ease-in-out horizon">
                      Ajouter une légende
                    </p>
                  </Link>
                )
              }

              
            </div>
            ))
          }
          <div className="w-full h-50 flex items-center truncate" >
          <FcAddImage style={{fontSize:'100px'}} className="w-full mt-4 isum" onClick={() => this.setState({open: true})}/>
         
      
        <DropzoneDialog
          acceptedFiles={['image/*']}
          cancelButtonText={"Annuler"}
          submitButtonText={"Ajouter"}
          maxFileSize={5000000}
          open={this.state.open}
          onClose={() => {
            this.setState({open: false})
      
          
          }}
          onSave={(files) => {

          let image = { photo: files};
           console.log(image)
          image.photo.map((photo)=>{
           formData.append('photo[]', photo)   
             })
           axios.post(`/logements/${params.logement_id}/photos`, formData)   
           history.push(`/logements/${params.logement_id}/photos`) 
          }}
          showPreviews={true}
          showFileNamesInPreview={true}
        />
          </div>
  </div>


    </>

    )
  }

}

export default ThumbnailGallery  
 