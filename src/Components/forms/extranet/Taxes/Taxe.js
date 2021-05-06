import React from "react";
import { NavLink } from "react-router-dom";
import Navbarextra from "../../Navbar/Navbarextra";
import Navbarextra2 from "../../Navbar/Navbarextra2";
import { ImWarning } from "react-icons/im";
import axios from 'axios';
class Cohote extends React.Component {

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
  render() {
    const { match: { params } } = this.props;

    return (
      <div className="w-full bg-white h-full mb-5">
          
        <div className="h-24">
          <Navbarextra logement_id={params.logement_id} />
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
            <NavLink to={`/extraheb/${params.logement_id}`}>
              <label className="mx-4  h-10 text-sm text-gray-500 hover:text-gray-600 cursor-pointer ">
                Détails de l'annonce
              </label>
            </NavLink>
            <NavLink to={`/logements/${params.logement_id}/reservation`}>
              <label className="mx-4  h-10 text-sm text-gray-500 hover:text-gray-600 cursor-pointer ">
                Paramètre de réservation
              </label>
            </NavLink>
            <NavLink to={`/logements/${params.logement_id}/frais_complementaires`}>
            <label className="mx-4  h-10 text-sm text-gray-500 hover:text-gray-600 cursor-pointer  ">
              Frais complémentaire
            </label>
            </NavLink>
            <label className="mx-4  h-10 text-sm text-theme font-bold border-b-4 hr-theme ">
              Taxe de séjour locale
            </label>
            <NavLink to={`/logements/${params.logement_id}/Co-hote`}>
            <label className="mx-3  h-10 text-sm text-gray-500 hover:text-gray-600 cursor-pointer ">
              Co-gestionnaire
            </label>
            </NavLink>
          </div>
          <div className="w-4/6 ">
            <hr className="w-full mx-5"></hr>
          </div>
        </div>

        {/* TAXES */}
        <div className="bg-white">
          <div className="flex mx-5 my-5 ">
            <div className="flex items-center mx-5  w-11/12 h-40 border-l-8 bg-red-300 border-t border-b border-r">
              <ImWarning
                style={{ width: 60, height: 60, color: "red" }}
                className="mx-5"
              />
              <p className="text-sm text-gray-800 w-5/6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
          <h1 className="text-gray-600 text-sm font-bold mx-5">
            Taxe de séjour
          </h1>
          <div className="mx-5 my-5 border w-2/3">
            <h1 className="text-gray-700 text-sm font-bold mx-5 my-5">
              Donnez-nous quelques informations pour que nous puissions calculer
              votre taxe de séjour
            </h1>
                <div>
                  <h2 className="text-gray-600 text-sm font-medium mx-5 mt-5">
                    1. êtes-vous enregistré(e) en tant que professionnel(le) au
                    Registre du Commerce et des Sociétés ?
                  </h2>
                  <label className="flex  my-4">
                    <label className="flex mx-5 text-gray-600 text-sm">
                      <input type="radio" className="mx-3"></input>
                      Oui
                    </label>
                    <label className="flex text-gray-600 text-sm ">
                      <input type="radio" className="mx-3"></input>
                      Non
                    </label>
                  </label>
                </div>

                <div>
              <h2 className="text-gray-600 text-sm font-medium mx-5 mt-5">
              2.  Avez-vous un numéro de TVA enregistré pour cette activité ?
              </h2>
              <label className="flex  my-4">
                <label className="flex mx-5 text-gray-600 text-sm">
                  <input type="radio" className="mx-3"></input>
                  Oui
                </label>
                <label className="flex text-gray-600 text-sm ">
                  <input type="radio" className="mx-3"></input>
                  Non
                </label>
              </label>
            </div>


            <div>
              <h2 className="text-gray-600 text-sm font-medium mx-5 mt-5">
              3.  Déclarez-vous vos revenus en tant que professionnel(le) pour les impôts directs (voir l’article 155 IV du Code Général des Impôts, le CGI) ?
              </h2>
              <label className="flex  my-4">
                <label className="flex mx-5 text-gray-600 text-sm">
                  <input type="radio" className="mx-3"></input>
                  Oui
                </label>
                <label className="flex text-gray-600 text-sm ">
                  <input type="radio" className="mx-3"></input>
                  Non
                </label>
              </label>
            </div>

            <div>
              <h2 className="text-gray-600 text-sm font-medium mx-5 mt-5">
              4.  Veuillez sélectionner la catégorie qui correspond à votre hébergement
              </h2>
              <label className="flex  my-4">
                  <select className="w-1/2 mx-5 text-sm text-gray-600 border h-10 rounded px-3 break-all ">
                    <option className="break-all text-xs">Veuillez sélectionner une catégorie</option>
                    <option className="break-all text-xs">Palaces</option>
                    <option className="break-all text-xs">Hôtels de tourisme 5 étoiles, résidences de tourisme 5 étoiles, meublé de tourisme 5 étoiles</option>
                    <option className="break-all text-xs">Hôtels de tourisme 4 étoiles, résidences de tourisme 4 étoiles, meublé de tourisme 4 étoiles</option>
                    <option className="break-all text-xs">Hôtels de tourisme 3 étoiles, résidences de tourisme 3 étoiles, meublé de tourisme 3 étoiles</option>
                    <option className="break-all text-xs">Hôtels de tourisme 2 étoiles, résidences de tourisme 2 étoiles, meublé de tourisme 2, villages de vacances 4 et 5 étoiles étoiles</option>
                    <option className="break-all text-xs">Hôtels de tourisme 1 étoile, résidences de tourisme 1 étoile, meublé de tourisme 1, village de vacance 1, 2 et et 3 étoiles étoiles, chambres d’hôtes , emplacements dans les aires de camping-cars et des parcs de stationnement                         </option>
                    <option className="break-all text-xs">Terrains de camping et terrains de caravanage classés en 3, 4 et 5 étoiles</option>
                    <option className="break-all text-xs">Terrains de camping et terrains de caravanage classés en 1 et 2 étoiles, ports de plaisance</option>
                  </select>
                
              </label>
            </div>


            <div>
              <h2 className="text-gray-600 text-sm font-medium mx-5 mt-5">
              5.  Quel est le type de votre établissement ? Choisissez une option parmi la liste ci-dessous :
              </h2>
              <label className="flex  my-4">
                  <select className="w-1/2 mx-5 text-sm text-gray-600 border h-10 rounded px-3 break-all ">
                    <option className="break-all text-xs">Veuillez sélectionner une catégorie</option>
                    <option className="break-all text-xs">Palaces</option>
                    <option className="break-all text-xs">tourisme</option>
                    <option className="break-all text-xs">Résidence de tourisme</option>
                    <option className="break-all text-xs">Village de vacances</option>
                    <option className="break-all text-xs">Chambre d’hôtes</option>
                    <option className="break-all text-xs">Emplacement dans les aires de camping-cars et des parcs de stationnement touristiques par tranche de 24 heures</option>
                    <option className="break-all text-xs">Terrains de camping ou terrains de caravanage classés en 3, 4 et 5 étoiles et tout autre terrain d’hébergement de plein air de caractéristiques équivalentes                 </option>
                    <option className="break-all text-xs">Port de plaisance</option>
                  </select>
                
              </label>
            </div>

            
          </div>
        </div>
      </div>
    );
  }
}

export default Cohote;
