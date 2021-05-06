import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import history from '../../../history';
import DropDown from '../DropDown/DropDown';
import axios from 'axios';
import { connect } from 'react-redux';
import logoo from '../../../assets/images/logo.jpg';



 class Navboard extends Component {
  state={

  }
  componentDidMount() {
    axios.get(`logements/`).then(res => {
      this.setState({
        logements: res.data.logement
      })
    })
  }
  show=(id)=>{
    history.push(`/extraheb/${id}`)
  }
    render() {
        const { isAuthenticated } = this.props;
        const { user } = this.props; 
        return (
          <>
          {
            isAuthenticated && user.is_client === true ? (
                null
                ) : 
              <>
                <header className="container text-gray-700 bg-white">
                  <div className="  flex  p-1  items-center">
                    <label onClick={()=>{history.push("/")}} className=" font-medium items-center text-gray-900 mb-3 md:mb-0">
                      <img className="w-40 mx-2" src={logoo}></img>
                 
                    </label>
                      <button className=" w-auto  rounded-lg hover:text-white
                       text-white px-3 py-1  mx-5 text-sm">Accueil du groupe</button>
                    <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                      <div className="droite container flex flex-grow h-8">
                      <a href='/AjoutHebergements' className=" flex items-center w-auto no-underline border-2 border-blue-500  rounded hover:bg-blue-500 hover:text-white
                       text-blue-500 text-sm px-4 mx-3">Ajouter un hébergement</a>
                 
                 <DropDown title="Changer d'hebergement" className="nav-action z-50 h-8 text-sm">
                 {
                    this.state.logements && this.state.logements.map( logement=>(
                      <>
                         <div className="item" key={logement.id}> <h6 className="text-sm break-all"onClick={()=>{this.show(logement.id)}}>{logement.name}</h6></div>
                    
                      
                      </>
                        )
                        )
                        
                      }
                      </DropDown>
                   </div>
                   
                    </nav>
              
                  </div>
                </header>
            </>
            }    
          </>
       )
    }
}
const mapStateToprops = (state) => {
  return {
    ...state.auth
  }
}


export default connect(mapStateToprops )(Navboard);