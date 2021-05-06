import React from 'react';
import { Formik, Form, Field } from 'formik';
import ItemsCarousel from 'react-items-carousel';
import CarouselItems from './CarouselItems';
import CarouselItems2 from './CarouselItems2';
import './HomePage.css';
import Navbar from './Navbar/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import image1 from '../../assets/images/icon_accueil.png'
import image2 from '../../assets/images/icon_départ.png'
import image3 from '../../assets/images/icon_la_carte.png'
import image4 from '../../assets/images/icon_linge.png'
import image5 from '../../assets/images/icon_Ménage.png'
import image6 from '../../assets/images/icon_Photo.png'
import { ImCheckmark2 } from "react-icons/im";
import moment from 'moment'
import axios from 'axios';
import 'moment/locale/fr-ca';
import CarouselItemsresultat from './CarouselItemsresultat';
import { NavLink } from 'react-router-dom'
import $ from 'jquery';
import * as yup from 'yup'
import Footer from './Footer'


const formSchema = yup.object({
  destination: yup.string().required("Date cannot be in the past"),
  debut: yup.date().required("Date cannot be in the past"),
  fin: yup.date().required("End date can't be less than start date"),
  nombrevoygeur: yup.string().required("End date can't be less than start date")

})


class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      resultat: false,
      home: 1,
      ville: null,
      debut: null,
      fin: null,
      nombre: null,
      inti: {
        destination: null,
        debut: null,
        fin: null,
        type: 1
      }
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    const async = async () => {
      await axios.post(`recherchehome/index`, {
        destination: this.state.ville,
        debut: moment(this.state.debut).locale("fr-ca").format('L'),
        fin: moment(this.state.fin).locale("fr-ca").format('L'),
        nombre: this.state.nombre,
      }).then(response => {
        if (response.data.logements === false) {
          toast.error("Date invalide!");
        }
        if (response.data.logements != false) {
          this.setState({ resultat: response.data.logements, filter: response.data.filter, home: null })
        }
      });
    };
    async();

  }
  render() {
    let today = null
    const { resultat, home } = this.state
    if (this.state.debut) {
      today = moment(this.state.debut).locale("fr-ca").format("L")
    } else {
      today = moment(new Date()).locale("fr-ca").format("L")
    }
    return (
      <div className="w-full bg-white">
        <Navbar />
        {/* <Formik
                  initialValues={this.state.inti}
                  validationSchema={formSchema}
                  onSubmit={value => {
                    console.log(value);
                    const async = async () => {
                      await axios.post(`recherchehome/index`,{
                        destination: value.destination,
                        debut: moment(value.debut).locale("fr-ca").format('L'),
                        fin: moment(value.fin).locale("fr-ca").format('L'),
                        nombre: value.nombrevoygeur,
                      }).then(response => {
                        if (response.data.logements === false) {
                           toast.error("Date invalide!");
                        } 
                        if (response.data.logements != false) {
                          this.setState({ resultat: response.data.logements,filter: response.data.filter,home:null})
                        }
                      });
                    };
                  async();
              }}> */}
        
        <ToastContainer />
        {
          this.state.resultat ? (
            <>
            <form onSubmit={this.handleSubmit}>

            <div className="with-bg2 container w-full" id="animated-background">
                        <div className=" flex flex-wrap flex-col md:flex-row  py-5 
                        w-full  flex justify-center container">
                            <div className="w-full flex mb-4">
                              <h1 className=" vil text-white text-3xl  font-bold " > Votre recherche :</h1>
                            </div>
                          <div className="container  flex-wrap flex-col md:flex-row flex bg-blue-500 w-1/2 flex rounded-lg justify-center h-20 bg-opacity-50 ">
      <select onChange={(e) => { this.setState({ ville: e.target.value }) }} required name="destination" className="appearance-none block w-42 h-10 bg-gray-100 text-gray-700 border-2 border-gray-200
                          rounded my-4 px-4 leading-tight focus:outline-none focus:bg-white focus:border-orange-500 mx-2 placeholder-blue-500 " placeholder="Destination" >
        <option value="">Destination</option>
        <option value="Basse Vallée">Basse Vallée</option>
        <option value="Bernica">Bernica</option>
        <option value="Bois de Nèfles">Bois de Nèfles</option>
        <option value="Bras Panon">Bras Panon</option>
        <option value="Cambuston">Cambuston</option>
        <option value="Cilaos">Cilaos</option>
        <option value="Entre Deux">Entre Deux</option>
        <option value="Gillot">Gillot</option>
        <option value="Grand Îlet">Grand Îlet</option>
        <option value="Hell Bourg">Hell Bourg</option>
        <option value="L'Étang-Salé">L'Étang-Salé</option>
        <option value="La Bretagne">La Bretagne</option>
        <option value="La Chaloupe">La Chaloupe</option>
        <option value="La Montagne">La Montagne</option>
        <option value="La Nouvelle">La Nouvelle</option>
        <option value="La Plaine des Cafres">La Plaine des Cafres</option>
        <option value="La Plaine des Palmistes">La Plaine des Palmistes</option>
        <option value="La Possession">La Possession</option>
        <option value="La Rivière">La Rivière</option>
        <option value="La Saline">La Saline</option>
        <option value="La Saline les Bains">La Saline les Bains</option>
        <option value="Le Guillaume">Le Guillaume</option>
        <option value="Le Port">Le Port</option>
        <option value="Le Quatorzième">Le Quatorzième</option>
        <option value="Le Tampon">Le Tampon</option>
        <option value="Le Tévelave">Le Tévelave</option>
        <option value="Les Avirons">Les Avirons</option>
        <option value="Les Makes">Les Makes</option>
        <option value="Les Trois Bassins">Les Trois Bassins</option>
        <option value="Les Trois Mares">Les Trois Mares</option>
        <option value="Manapany les Bains">Manapany les Bains</option>
        <option value="Palmiste Rouge">Palmiste Rouge</option>
        <option value="Petite-Île">Petite-Île</option>
        <option value="Rivière des Pluies">Rivière des Pluies</option>
        <option value="Rivière du Mat">Rivière du Mat</option>
        <option value="Saint-André">Saint-André</option>
        <option value="Saint-Benoît">Saint-Benoît</option>
        <option value="Saint-Bernard">Saint-Bernard</option>
        <option value="Saint-Denis">Saint-Denis</option>
        <option value="Saint-Gilles les Bains">Saint-Gilles les Bains</option>
        <option value="Saint-Gilles les Hauts">Saint-Gilles les Hauts</option>
        <option value="Saint-Joseph">Saint-Joseph</option>
        <option value="Saint-Leu">Saint-Leu</option>
        <option value="Saint-Louis">Saint-Louis</option>
        <option value="Saint-Paul">Saint-Paul</option>
        <option value="Saint-Philippe">Saint-Philippe</option>
        <option value="Saint-Pierre">Saint-Pierre</option>
        <option value="Sainte-Anne">Sainte-Anne</option>
        <option value="Sainte-Clotilde">Sainte-Clotilde</option>
        <option value="Sainte-Marie">Sainte-Marie</option>
        <option value="Sainte-Rose">Sainte-Rose</option>
        <option value="Sainte-Suzanne">Sainte-Suzanne</option>
        <option value="Sainte-Thérèse">Sainte-Thérèse</option>
        <option value="Salazie">Salazie</option>
        <option value="Vincendo">Vincendo</option>
      </select>
      <input type="date" required onChange={(e) => { this.setState({ debut: e.target.value }) }} min={moment(new Date()).locale("fr-ca").format("L")} className="appearance-none text-center px-5 w-42 h-10 bg-gray-100 text-gray-700 border-2 border-gray-200
            rounded leading-tight focus:outline-none focus:bg-white focus:border-orange-500 mx-2 my-4 placeholder-blue-500" placeholder="Arrivée"></input>
      <input type="date" required onChange={(e) => { this.setState({ fin: e.target.value }) }} name="fin" min={today} className="appearance-none text-center px-5 w-42 h-10 bg-gray-100 text-gray-700 border-2 border-gray-200
            rounded leading-tight focus:outline-none focus:bg-white focus:border-orange-500 mx-2 my-4 placeholder-blue-500" placeholder="Départ"></input>
      <select required id="number" onChange={(e) => { this.setState({ nombre: e.target.value }) }} name="nombrevoygeur" placeholder="nombre de voygeur" className="appearance-none text-center px-3 h-10 bg-gray-100 text-gray-700 border-2 border-gray-200
            rounded leading-tight focus:outline-none focus:bg-white focus:border-orange-500 mx-2 my-4 placeholder-blue-500 ">
        <option value="" className="flex justify-center">---- nombre de voyageur(s) -----</option>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(val => {
          if (val === 1) {
            return <option value={val} className="flex justify-center">{val}  &nbsp; voyageur</option>
          } else {
            return <option value={val} className="flex justify-center">{val} &nbsp; voyageurs </option>
          }
        })}
      </select>
      <button type="submit" oni className=" h-10 w-10 bg-theme flex items-center justify-center cursor-pointer rounded-full my-4 mx-2" >
        <ImCheckmark2 style={{ width: 30, height: 30, color: "white", }} />
      </button>
    </div>
   
  </div>
</div>
</form>
            <div className="my-5">
              <div className="flex justify-center  py-5">
                <hr className="w-4/12 mt-3 border-blue-500"></hr>
                <h1 className="text-center text-2xl uppercase  mr-5 ml-5 w-4/12 text-blue-500 font-bold">resultat de la recherche</h1>
                <hr className="w-4/12 mt-3 border-blue-500"></hr>
              </div>
              {
                this.state.resultat.length !== 0 ? (
                  <CarouselItemsresultat resultat={this.state.resultat} filter={this.state.filter} />
                ) : null
              }
            </div>
            <Footer/>
           </> 
          ) : null
        }
        {home ? (
          <>
          <form onSubmit={this.handleSubmit}>

<div className="w-full">
  <div className="with-bg container w-full flex flex-wrap flex-col md:flex-row  py-5 
              w-full  flex justify-center container"id="animated-background">
    <div className="container  flex-wrap flex-col md:flex-row flex bg-blue-500 w-1/2 flex rounded-lg justify-center h-20 bg-opacity-50 ">
      <select onChange={(e) => { this.setState({ ville: e.target.value }) }} required name="destination" className="appearance-none block w-42 h-10 bg-gray-100 text-gray-700 border-2 border-gray-200
                          rounded my-4 px-4 leading-tight focus:outline-none focus:bg-white focus:border-orange-500 mx-2 placeholder-blue-500 " placeholder="Destination" >
        <option value="">Destination</option>
        <option value="Basse Vallée">Basse Vallée</option>
        <option value="Bernica">Bernica</option>
        <option value="Bois de Nèfles">Bois de Nèfles</option>
        <option value="Bras Panon">Bras Panon</option>
        <option value="Cambuston">Cambuston</option>
        <option value="Cilaos">Cilaos</option>
        <option value="Entre Deux">Entre Deux</option>
        <option value="Gillot">Gillot</option>
        <option value="Grand Îlet">Grand Îlet</option>
        <option value="Hell Bourg">Hell Bourg</option>
        <option value="L'Étang-Salé">L'Étang-Salé</option>
        <option value="La Bretagne">La Bretagne</option>
        <option value="La Chaloupe">La Chaloupe</option>
        <option value="La Montagne">La Montagne</option>
        <option value="La Nouvelle">La Nouvelle</option>
        <option value="La Plaine des Cafres">La Plaine des Cafres</option>
        <option value="La Plaine des Palmistes">La Plaine des Palmistes</option>
        <option value="La Possession">La Possession</option>
        <option value="La Rivière">La Rivière</option>
        <option value="La Saline">La Saline</option>
        <option value="La Saline les Bains">La Saline les Bains</option>
        <option value="Le Guillaume">Le Guillaume</option>
        <option value="Le Port">Le Port</option>
        <option value="Le Quatorzième">Le Quatorzième</option>
        <option value="Le Tampon">Le Tampon</option>
        <option value="Le Tévelave">Le Tévelave</option>
        <option value="Les Avirons">Les Avirons</option>
        <option value="Les Makes">Les Makes</option>
        <option value="Les Trois Bassins">Les Trois Bassins</option>
        <option value="Les Trois Mares">Les Trois Mares</option>
        <option value="Manapany les Bains">Manapany les Bains</option>
        <option value="Palmiste Rouge">Palmiste Rouge</option>
        <option value="Petite-Île">Petite-Île</option>
        <option value="Rivière des Pluies">Rivière des Pluies</option>
        <option value="Rivière du Mat">Rivière du Mat</option>
        <option value="Saint-André">Saint-André</option>
        <option value="Saint-Benoît">Saint-Benoît</option>
        <option value="Saint-Bernard">Saint-Bernard</option>
        <option value="Saint-Denis">Saint-Denis</option>
        <option value="Saint-Gilles les Bains">Saint-Gilles les Bains</option>
        <option value="Saint-Gilles les Hauts">Saint-Gilles les Hauts</option>
        <option value="Saint-Joseph">Saint-Joseph</option>
        <option value="Saint-Leu">Saint-Leu</option>
        <option value="Saint-Louis">Saint-Louis</option>
        <option value="Saint-Paul">Saint-Paul</option>
        <option value="Saint-Philippe">Saint-Philippe</option>
        <option value="Saint-Pierre">Saint-Pierre</option>
        <option value="Sainte-Anne">Sainte-Anne</option>
        <option value="Sainte-Clotilde">Sainte-Clotilde</option>
        <option value="Sainte-Marie">Sainte-Marie</option>
        <option value="Sainte-Rose">Sainte-Rose</option>
        <option value="Sainte-Suzanne">Sainte-Suzanne</option>
        <option value="Sainte-Thérèse">Sainte-Thérèse</option>
        <option value="Salazie">Salazie</option>
        <option value="Vincendo">Vincendo</option>
      </select>
      <input type="date" required onChange={(e) => { this.setState({ debut: e.target.value }) }} min={moment(new Date()).locale("fr-ca").format("L")} className="appearance-none text-center px-5 w-42 h-10 bg-gray-100 text-gray-700 border-2 border-gray-200
            rounded leading-tight focus:outline-none focus:bg-white focus:border-orange-500 mx-2 my-4 placeholder-blue-500" placeholder="Arrivée"></input>
      <input type="date" required onChange={(e) => { this.setState({ fin: e.target.value }) }} name="fin" min={today} className="appearance-none text-center px-5 w-42 h-10 bg-gray-100 text-gray-700 border-2 border-gray-200
            rounded leading-tight focus:outline-none focus:bg-white focus:border-orange-500 mx-2 my-4 placeholder-blue-500" placeholder="Départ"></input>
      <select required id="number" onChange={(e) => { this.setState({ nombre: e.target.value }) }} name="nombrevoygeur" placeholder="nombre de voygeur" className="appearance-none text-center px-3 h-10 bg-gray-100 text-gray-700 border-2 border-gray-200
            rounded leading-tight focus:outline-none focus:bg-white focus:border-orange-500 mx-2 my-4 placeholder-blue-500 ">
        <option value="" className="flex justify-center">---- nombre de voyageur(s) -----</option>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(val => {
          if (val === 1) {
            return <option value={val} className="flex justify-center">{val}  &nbsp; voyageur</option>
          } else {
            return <option value={val} className="flex justify-center">{val} &nbsp; voyageurs </option>
          }
        })}
      </select>
      <button type="submit" oni className=" h-10 w-10 bg-theme flex items-center justify-center cursor-pointer rounded-full my-4 mx-2" >
        <ImCheckmark2 style={{ width: 30, height: 30, color: "white", }} />
      </button>
    </div>
    <div className="flex justify-center">
      <h1 className=" vil text-white text-3xl text-center font-bold " > Villas, maisons, appartement, bungalows, chalets, vans, ... <br></br>à louer à la Réunion</h1>
    </div>
  </div>
</div>
</form>
            <div className="flex justify-center py-5 my-2">
              <hr className="w-4/12 mt-3 border-blue-500"></hr>
              <h1 className="text-center text-2xl uppercase  mr-5 ml-5 w-3/12 text-blue-500 font-bold">Les offres du moment :<br></br> <span className="text-sm mx-2 flex justify-end font-normal w-11/12 lowercase ">voir toutes les offres</span></h1>
              <hr className="w-4/12 mt-3 border-blue-500"></hr>
            </div>
            <div className=" px-5 py-3" >
              <CarouselItems />
            </div>
            <div>
              <NavLink to="/offres/offres">
                <h1 className="text-center text-xl  mr-5 ml-5 my-4  text-blue-500 font-medium hover:font-bold hover:text-blue-800 cursor-pointer">voir toutes les offres</h1>
              </NavLink>
            </div>
            <div className="flex justify-center  py-5">
              <hr className="w-4/12 mt-3 border-blue-500"></hr>
              <h1 className="text-center text-2xl uppercase  mr-5 ml-5 w-3/12 text-blue-500 font-bold">Les destinations :<br></br> <span className="text-sm  flex justify-end font-normal w-10/12 lowercase ">voir toutes les destinations</span></h1>
              <hr className="w-4/12 mt-3 border-blue-500"></hr>
            </div>
            <div className=" px-5">
              <CarouselItems2 />
            </div>
            <NavLink to="/desination/logements">
              <h1 className="text-center text-xl py-5  mr-5 ml-5  text-blue-500 font-medium hover:font-bold hover:text-blue-700 cursor-pointer">voir toutes les destinations</h1>
            </NavLink>
            <div>
              <div className="flex justify-center  my-3">
                <hr className="w-4/12 mt-3 hr-theme"></hr>
                <h1 className="text-center text-2xl uppercase  mr-5 ml-5 w-5/12 text-theme font-bold">les services aux propriétaires</h1>
                <hr className="w-4/12 mt-3 hr-theme"></hr>
              </div>
              <div className="container mx-auto pt-3 flex-wrap flex-col md:flex-row flex justify-center mb-5">
                <div className="w-5/12 ">
                  <div className=" border-2 hr-theme rounded-xl mr-5 ">
                    <h1 className="text-blue-500 text-xl  font-bold text-center my-3 ">Vous avez besoin d’aide pour vos annonces ?</h1>
                    <h2 className="text-blue-500 text-xl  font-bold text-center my-3 ">Le service premium</h2>
                    <p className="text-blue-500 block mr-5     hover:text-blue-600 cursor-pointer my-4 mx-4 ">On s'occupe de vos annonces sur runbnb.re et sur tous les autres site internet. On gère les plannings, les réservations, accueil, départ, etc ..</p>
                  </div>
                  <div className=" border-2 hr-theme rounded-xl mr-5 my-5">
                    <h1 className="text-blue-500 text-xl  font-bold text-center my-3 ">Vos hébergement sur runbnb.re</h1>
                    <p className="block mr-5 text-blue-500  hover:text-blue-600 cursor-pointer mx-4 ">Gérer ses hébergements (extranet)</p>
                    <p className="block mr-5 text-blue-500     my-2   hover:text-blue-600 cursor-pointer my-4 mx-4 ">Ajouter un hébergement</p>
                  </div>
                </div>
                {/* <div className="flex-wrap flex-col md:flex-row  w-5/12  border-2 hr-theme rounded-xl  "> */}
                <div className="flex-wrap flex-col md:flex-row  w-5/12  border-2 hr-theme rounded-xl ml-5 ">
                  <h1 className="block text-blue-500  text-xl py-4 font-bold text-center ">Vous avez besoin d’aide pour vos réservations ?</h1>
                  <p className="block  text-blue-500  text-xl  font-bold text-center  ">Les services à la cartes :</p>
                  <div className="flex py-4 " >
                    <img className="h-26 w-26 mx-4 overflow-x-hidden" src={image1}></img>
                    <img className="h-26 w-26 mx-4 overflow-x-hidden" src={image2}></img>
                    <img className="h-26 w-26 mx-4 overflow-x-hidden" src={image3}></img>
                  </div>
                  <div className="flex py-4">
                    <img className="h-26 w-26 mx-4 overflow-x-hidden" src={image4}></img>
                    <img className="h-26 w-26 mx-4 overflow-x-hidden" src={image5}></img>
                    <img className="h-26 w-26 mx-4 overflow-x-hidden" src={image6}></img>
                  </div>
                </div>
              </div>
            </div>
            <Footer/>
          </>
        ) : null}
      </div>
    )
  }
}
export default HomePage;
