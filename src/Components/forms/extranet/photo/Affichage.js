import React from 'react';
import { Formik} from 'formik';
import axios from 'axios'
import { Link } from 'react-router-dom';






class Affichage extends React.Component{
  state = {
    photos : null
  }
  componentDidMount() {
    console.log(this.props.logement_id)
    axios.get(`/logements/${this.props.logement_id}/photos`,).then(response=>{  
      this.setState({
        photos:response.data.photo
        })
      console.log(this.state)
      }
    )
  }
    render(){
      const { photos } = this.state
      return(
        <Formik>
          <div className="w-full bg-white">
            <div className="flex">
              <h1 className="w-2/3 text-xl font-bold text-gray-700">Photos</h1>
              <Link to={`/logements/${this.props.logement_id}/photos`} >

               <h2 className="text-theme text-base border-2 sansbg rounded px-4 py-2 hover:text-white">Modifier</h2>
              </Link>
            </div>
            <div className="w-2/3 text-right mx-20 mt-5 font-bold" > {this.state.photos?(<span className="text-blue-500"> {this.state.photos.length } </span>):null} {this.state.photos && this.state.photos.length==1? (<span  className="text-blue-500">photo</span>) : (<span className="text-blue-500">photos</span>)}</div>

        <div class="  grid grid-cols-4 gap-4 w-2/3">
            {photos && photos.slice(0,4).map(photo=>(
            <div className="py-5" key={photo.id}> 

                {/* <img className="w-auto h-40" src={`http://localhost:4000${photo.photo.url}`}></img> */}
                <img className="w-auto h-40" src={`http://f07f4cb.online-server.cloud${photo.photo.url}`}></img>
            </div>
                  

                ))
              }
              
        </div>  
       
          </div>  
        </Formik>
      )
    }
  }

export default Affichage;
