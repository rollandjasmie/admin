import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import axios from 'axios'
import history from '../../../history';
import DropDown from '../DropDown/DropDown';
import logoo from '../../../assets/images/logo.jpg';
import { connect } from 'react-redux';

class Navbarextra extends Component {
  state = {
    logement_id: null,
    adresse: null
  }

  componentDidMount() {
    axios.get(`/logements/${this.props.logement_id}`).then(res => {
      this.setState({
        logement: res.data.logement,
        adresse: res.data.adresse
      })
      axios.get(`logements/`).then(res => {
        this.setState({
          logements: res.data.logement
        })
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
          { isAuthenticated && user.is_client === false ? (
        
          <header className="text-gray-700 bg-white">
            <div className="container mx-auto flex flex-wrap p-1 flex-col md:flex-row items-center">
              <NavLink to="/" className="flex title-font font-medium items-center text-gray-900 mb-3 md:mb-0">
                  <img className="w-40 mx-2" src={logoo}></img>
              </NavLink>
                  <NavLink to="/Dashboard" className=" hover:font-normal simul-btn bg-orange-500 rounded-lg hover:bg-orange-700 hover:text-white
                    text-white px-3 py-1  mx-5">Accueil du groupe
                  </NavLink>
              <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                <div className="flex">
                    {
                      this.state.logement?(
                      <p className="no-underline text-blue-500  px-4 mx-3 py-1 my-2">{this.state.logement.name}  -  {this.state.adresse}  {this.state.logement.idlogement}</p>
                      ):null
                    }
                 
                      <DropDown title="Changer d'hebergement" className="nav-action my-1">
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
          ) : null}
          {isAuthenticated && user.admin === true ? (
        
        <header className="text-gray-700 bg-white">
          <div className="container mx-auto flex flex-wrap p-1 flex-col md:flex-row items-center">
            <NavLink to="/" className="flex title-font font-medium items-center text-gray-900 mb-3 md:mb-0">
                <img className="w-40" src={logoo}></img>
            </NavLink>
                <NavLink to="/" className=" hover:font-normal simul-btn bg-orange-500 rounded-lg hover:bg-orange-700 hover:text-white
                  text-white px-3 py-1  mx-5">Accueil admin
                </NavLink>
            <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
              <div className="flex">
                  {
                    this.state.logement?(
                    <p className="no-underline text-blue-500  px-4 mx-3 py-1 my-2">{this.state.logement.name}  -  {this.state.adresse}  {this.state.logement.idlogement}</p>
                    ):null
                  }
               
                    <DropDown title="Changer d'hebergement" className="nav-action my-1">
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
        ) : null}
        </>
      )
    }

    
}
const mapStateToProps = (state) => {
  return {
    ...state.auth
  }
}



export default  connect(mapStateToProps)(Navbarextra) ;