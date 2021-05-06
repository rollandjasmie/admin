import React from 'react';
import { Formik } from 'formik';

import '../HomePage.css';
import '../../Logements/condition.css'
import Navbarextra from '../Navbar/Navbarextra';
import Navbarextra2 from '../Navbar/Navbarextra2';
import { NavLink } from 'react-router-dom';
import Affichage from './photo/Affichage';
import AffichagePiece from './pieces/AffichagePiece';
import Affichageequip from './equipement/Affichageequip';
import Affichagetitre from './titre/Affichagetitre';
import Affichageacces_voyageur from './acces_voyageurs/Affichageacces_voyageur';
import Ressources_voyageur from '../extranet/Ressources_voyageur/Affichageressources_voyageur';
import axios from 'axios';

class Extraheb extends React.Component{
  state={
    logement_id:null,
    adresse:null
  }
 
  componentDidMount(){
    const { match: { params } } = this.props;
    axios.get(`/logements/${params.logement_id}`).then(res=>{
        this.setState({
          logement:res.data.logement,
          adresse:res.data.adresse
        })
      })
  }
  render(){
    const { match: { params } } = this.props;
      return(
        <Formik>
            <div className="w-full bg-white">
              <div className="">
                <Navbarextra logement_id={params.logement_id}/>
                </div> 
               <div>
               <Navbarextra2 logement_id={params.logement_id} />
                 </div>     
                  
             <div className="my-5 py-5 px-5 flex">
                  <div className=" py-2">
                      {
                        this.state.logement?(
                    <h1 className="text-xl font-medium   text-gray-700 ">{this.state.logement.name}-  {this.state.adresse}  <span className="font-normal text-base"> {this.state.logement.idlogement} </span></h1>
                        ):null
                      }
                  </div>
                  <div className="mx-5">
                    <NavLink to={`/prevuer/${params.logement_id}/prevue`}>
                      <label className="sansbg rounded px-3 py-2 text-theme hover:text-white
                      hover:font-bold ">
                        Prévisualiser l'annonce
                      </label>
                    </NavLink>
                    <NavLink to={`/logements/${params.logement_id}/calendrier`}>
                      <label className="border-2 rounded px-3 py-2 sansbg text-theme hover:text-white
                      hover:font-bold mx-4">
                        Voir le calendrier
                      </label>
                    </NavLink>
                  </div>
             </div>
            <div className=" my-5">
                <div className="mx-4 flex w-5/6 h-10   ">
                  <label className="mx-4  h-10 text-sm text-theme font-bold border-b-4 hr-theme">
                      Détails de l'annonce
                  </label>
                  <NavLink to={`/logements/${params.logement_id}/reservation`}>
                    <label className="mx-4  h-10 text-sm text-gray-500 cursor-pointer hover:text-gray-600 ">
                        Paramètre de réservation
                    </label>
                  </NavLink>
                  
                  <NavLink to={`/logements/${params.logement_id}/frais_complementaires`}>
                    <label className="mx-4  h-10 text-sm text-gray-500 cursor-pointer hover:text-gray-600 ">
                        Frais complémentaire
                    </label>
                  </NavLink>
                  <NavLink to={`/logements/${params.logement_id}/Taxe`}>
                  <label className="mx-4  h-10 text-sm text-gray-500 cursor-pointer hover:text-gray-600 ">
                      Taxe de séjour locale
                  </label>
                  </NavLink>
                  <NavLink to={`/logements/${params.logement_id}/Co-hote`}>
                  <label className="mx-3  h-10 text-sm text-gray-500 cursor-pointer hover:text-gray-600 ">
                      Co-gestionnaire
                  </label>      
                  </NavLink>                
                </div> 
                <div className="w-4/6 ">
                  <hr className="w-full mx-5"></hr>
                </div>
             </div>


              {/* CONTENUE */}

              <div className="py-5 px-5  ">
              <Affichage logement_id={params.logement_id}/>
              </div>

              <div className="px-5  ">
                <AffichagePiece logement_id={params.logement_id}/>
              </div>
              <div className="px-5 py-5 ">
              <Affichageequip logement_id={params.logement_id}/>
                <hr className="w-3/4 mt-4"></hr>
              </div>
              <div className="px-5 py-3">
                <Affichagetitre logement_id={params.logement_id}/>
                <hr className="w-3/4 mt-5"></hr>
              </div>
              <div className="px-5 py-3">
              <Affichageacces_voyageur logement_id={params.logement_id}/>
                <hr className="w-3/4 mt-4"></hr>
              </div>
          
            <div className="px-5 py-3">
              <Ressources_voyageur logement_id={params.logement_id} />
              <hr className="w-3/4 mt-4"></hr>
            </div>
              
          </div>  
        </Formik>
      )
    }
  }

export default Extraheb;
