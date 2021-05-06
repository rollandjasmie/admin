import React, { Component } from 'react';
import Dropdow1 from '../../user/Dropdow1';
import axios from 'axios'
import {NavLink, Link } from 'react-router-dom';
import Navboard from '../Navbar/Navboard'
import moment from 'moment';
import 'moment/locale/fr-ca';
import Tout from './Tout';
import Avenir from './Avenir';
import Encour from './Encour';
import Annuler from './Annuler';
import Terminer from './Terminer';
import $ from 'jquery'
import { Nav } from 'react-bootstrap';

class Reservationtout extends Component {
  constructor(){
    super()
     this.state = {
      showTout: true,
      showEncour: false,
      showAvenir: false,
      showAnnuler: false,
      showTerminer : false,
      resultatrecheche:false
      }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
   
    componentDidMount() {
        axios.get('/users/show',).then(response => {
            if (response.data.photo === true) {
              this.setState({
                avatar: `http://f07f4cb.online-server.cloud/${response.data.avatar}`
              })
            }
          })
    }

            hideComponent(name) {
            switch (name) {
              case "showTout":
               return this.setState({  
                    showTout: true,
                    showEncour: false,
                    showAvenir: false,
                    showAnnuler: false,
                    showTerminer : false });
                break;
              case "showEncour":
                return this.setState({  
                    showTout: false,
                    showEncour: true,
                    showAvenir: false,
                    showAnnuler: false,
                    showTerminer : false });
                break;
              case "showAvenir":
                return this.setState({  
                    showTout: false,
                    showEncour: false,
                    showAvenir: true,
                    showAnnuler: false,
                    showTerminer : false });
                break;
              case "showTerminer":
                return this.setState({  
                    showTout: false,
                    showEncour: false,
                    showAvenir: false,
                    showAnnuler: false,
                    showTerminer : true });
                break; 
              case "showAnnuler":
                return this.setState({  
                    showTout: false,
                    showEncour: false,
                    showAvenir: false,
                    showAnnuler: true,
                    showTerminer : false });
                break;
              default:
               return null;
            }
          }
  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    axios.post("/logements/reservation/recherche/dashboard", { recherche: this.state.value}).then(response=>{
        console.log(response.data.recherche)
        this.setState({
          resultatrecheche:true,
          recherche: response.data.recherche
        })
      }
    )
    $("#recherche").trigger("reset")
  }
    
  render() {
    const { showTout, showEncour, showAvenir, showTerminer, showAnnuler } = this.state;
      return (
          <>
          <Navboard />
          <div>
          
            <nav className="bg-blue-500">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex items-center h-16">
                        <div className="flex items-center  w-10/12  h-full">
                          <a href="/Dashboard" className="h-full  flex justify-center items-center w-3/12 rounded-md text-sm font-medium text-gray-300 hover:text-white 
                            focus:outline-none focus:text-white">
                            Tous les hébergements</a>
                          <a href="/proprietaire/calendriers" className="h-full  flex justify-center items-center w-3/12 rounded-md text-sm font-medium text-gray-300 hover:text-white 
                            focus:outline-none focus:text-white ">Calendrier de tous les hébergements</a>
                          <Link to="/proprietaire/reservation" className="border-b-4 border-orange-500 bg-gray-200 bg-opacity-50 h-full text-white flex justify-center items-center w-3/12 text-sm font-medium text-gray-300 hover:text-white  focus:outline-none focus:text-white">Toutes les réservations</Link>
                        </div>
                    <div className="hidden md:block">
                      <div className="ml-4 flex items-center md:ml-6">
                        <div class="ml-3  relative">
                          <div className="flex  items-center mr-1 w-auto ">
                            <img className=" h-8 w-8 rounded-full" src={this.state.avatar} alt=""></img>
                            <Dropdow1 />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </nav>
            <label onClick={()=>{this.setState({resultatrecheche:false})}} className="text-gray-600 mx-4 px-2 my-5 text-xl" >Réservations</label>
            <form onSubmit={this.handleSubmit} id="recherche " className="mx-4">
              <label>
                <input type="text"  className="outline-none px-3 border mx-2 rounded-lg  text-gray p-1"placeholder="Rechercher un nom , id " onChange={this.handleChange} />
              </label>
              
              <input type="submit"  className="button outline-none rounded-lg hover:text-white text-white py-1 px-3  " value="Recherche" />
             
            </form>
              {
                this.state.resultatrecheche === false?(
                  <div>
                    <Nav variant="tabs" defaultActiveKey="#" className="text-gray-500 mt-10 mx-10 ">
                        <Nav.Item onClick={() => this.hideComponent("showEncour")}>
                          <Nav.Link eventKey="link-1" href=""  >En cours</Nav.Link>
                        </Nav.Item>
                        <Nav.Item onClick={() => this.hideComponent("showAvenir")}>
                          <Nav.Link eventKey="link-2" href="" >A venir</Nav.Link>
                        </Nav.Item>
                        <Nav.Item onClick={() => this.hideComponent("showTerminer")}>
                          <Nav.Link eventKey="link-3" href="" >Términer</Nav.Link>
                        </Nav.Item>
                        <Nav.Item onClick={() => this.hideComponent("showAnnuler")}>
                          <Nav.Link eventKey="link-4" href="" >Annuler</Nav.Link>
                        </Nav.Item>
                        <Nav.Item onClick={() => this.hideComponent("showTout")}>
                          <Nav.Link href="#">Tout</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <div>
                      {showAnnuler && <Annuler />}
                      {showTout && <Tout />}
                      {showTerminer && <Terminer />}
                      {showAvenir && <Avenir />}
                      {showEncour && <Encour />}
                    </div>
                  </div>
                ):(
                  <div>
                    <label  className="text-gray-600 mx-4 px-2 my-5 mt-3 text-lg">
                    Résultat de la recherche:<br />
                    </label>
                    <main>
                      {
                        this.state.recherche ? (
                          <>
                            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                              <div className="flex flex-col">
                                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                  <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                      <table className="tab divide-y divide-gray-200 my-5 mx-2">
                                        <thead>
                                          <tr>
                                            <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                                              Identifiant
                                            </th>
                                            <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                                              Voyageur
                                            </th>
                                            <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                                              Date d'arrivée
                                            </th>
                                            <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                                              Date de départ
                                            </th>
                                            <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                                              Date de réservation
                                            </th>
                                            <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                                              Hébergement
                                            </th>
                                            <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                                              Statut
                                            </th>
                                          </tr>
                                        </thead>

                                        {this.state.recherche.map(reser => (
                                          <tbody key={reser.reservation.id} className="bg-white divide-y divide-gray-200">
                                            <tr>
                                              <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-800">
                                                  {reser.reservation.idreservation}
                                                </span>
                                              </td>
                                              <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                                                <NavLink to={`/logements/${reser.logement.id}/details_reservation/${reser.reservation.id}`}>
                                                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-800">
                                                    {reser.user.first_name}
                                                  </span>
                                                </NavLink>
                                              </td>
                                              <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-800">
                                                  {moment(reser.reservation.arrivee).format("LL")}
                                                </span>
                                              </td>
                                              <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-800">
                                                  {moment(reser.reservation.depart).format("LL")}
                                                </span>
                                              </td>
                                              <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-800">
                                                  {moment(reser.reservation.created_at).format("LL")}
                                                </span>
                                              </td>
                                              <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-800">
                                                  {reser.logement.name}
                                                </span>
                                              </td>
                                              <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-800">
                                                  {reser.reservation.status}
                                                </span>
                                              </td>
                                            </tr>
                                          </tbody>
                                        ))}

                                      </table>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        ) : (
                          <div>
                            Rien
                          </div>
                        )
                      }
                    </main>
                  </div>
                )
              }
          </div>
      </>
      );
  }
}

export default Reservationtout;