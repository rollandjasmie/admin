import React, { Component } from 'react'
import Dropdow from './Dropdow';
import Navboard from '../forms/Navbar/Navboard';
import IconButton from '@material-ui/core/IconButton'
import axios from 'axios';
import Upload from './Upload';
import UserForm from './UserForm';
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom';
import Navboardvo from '../forms/Navbar/Navboardvo';



class EditProfile extends Component {
  state={
    avatar: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
  }
  componentDidMount() {
    axios.get('/users/show',).then(response => {
      if (response.data.photo === true) {

        this.setState({
          avatar: `http://f07f4cb.online-server.cloud/${response.data.avatar}`
        })
      }
    })
   
    setInterval(() => {
      axios.get('/messages/client/non_lu').then(response => (
        this.setState({ number_message: response.data.number_message })
      ))
    }, 1000)
  }
    render() {

      const { isAuthenticated } = this.props;
      const { user } = this.props;
        return (
          <>
            {
              isAuthenticated && user.is_client === true ? (
                < div className="bg-white h-full h">
                  <Navboardvo />
                  <nav className="bg-blue-500">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className=" h-16">
                            <div className="flex items-center h-full ">
                                 
                                
                                    <div className=" flex items-center  w-11/12  h-full">
                                        <NavLink to="/dashboard" className="h-full  flex justify-center items-center w-2/12 rounded-md text-sm font-medium text-gray-300 hover:text-white 
                                            focus:outline-none focus:text-white "> 
                                            Mes réservations
                                        </NavLink>
                                        <NavLink to="/Commentaire" className="h-full  flex justify-center items-center w-2/12 rounded-md text-sm font-medium text-gray-300 hover:text-white  focus:outline-none focus:text-white ">
                                            Mes commentaire
                                        </NavLink>
                                        <NavLink to="/EditProfil" className="border-b-4 border-orange-500 bg-gray-200 bg-opacity-50 h-full text-white flex justify-center items-center w-2/12 text-sm font-medium text-gray-300 hover:text-white  focus:outline-none focus:text-white">Mes Paramètres
                                        </NavLink>
                                        <NavLink to="/proprietaire" className="h-full  flex justify-center items-center w-2/12 rounded-md text-sm font-medium text-gray-300 hover:text-white 
                                            focus:outline-none focus:text-white " >Ajouter un hébergement </NavLink>
                                        <NavLink to="/message"  className="h-full  flex justify-center items-center w-2/12 rounded-md text-sm font-medium text-gray-300 hover:text-white 
                                            focus:outline-none focus:text-white ">
                                            Messages  ({this.state.number_message})
                                        </NavLink>
                                    </div>
                               
                            </div>

                        </div>
                    </div>

                </nav>
                  <div className="p-20 mt-15 flex justify-center ">
                    <span className="sary rounded shadow mx-5">


                      <Upload />

                      <br></br>
                      <br></br>
                      <hr className="w-11/12 ml-3 mr-3"></hr>
                      <br></br>
                      <p className=" ml-3 mr-3 my-5 text-center h-12 text-xs text-gray-500 overflow-hidden ">Obtenez plus de réservation en rassurant les voyageurs avec une identité confirmée. </p>

                    </span>



                    <div className="  ">
                      <span className="field bg-white shadow-md rounded px-8 pt-6 pb-8 mb-1 rounded-2xl mx-5">
                        <p className="w-full h-12 text-lg text-center   font-bold text-gray-600">Infos personnelles</p>

                        <UserForm />
                      </span>

                    </div>

                  </div>

                  <div className="w-4/12 flex justify-center items-center mx-5">

                    <div className="h-auto w-1/2 shadow rounded bg-white  juser mb-20">

                      <p className="w-full h-1/2 mt-5 text-xs font-medium text-center text-gray-800 ">Lesquelles de mes informations sont communiquées à des tiers ?</p>

                      <p className="w-full h-1/2 mt-4 text-xs text-center text-gray-500 mb-10 ">Runbnb ne communique les coordonnées de l’hôte aux voyageurs qu’après la confirmation de la réservation.</p>
                    </div>
                  </div>



                </div>

              ):
                < div className="bg-white h-full h">
                  <Navboard />
                  <nav className="bg-blue-500">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
                      <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">

                          </div>
                          <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4 no-underline">

                              <a href="/Dashboard" className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 hover:no-underline focus:outline-none focus:text-white focus:bg-gray-700">Tous les hébergements</a>

                              <a href="/proprietaire/calendriers" className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 hover:no-underline focus:outline-none focus:text-white focus:bg-gray-700">Calendrier de tous les hébergements</a>

                              <a href="/proprietaire/reservation" className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 hover:no-underline focus:outline-none focus:text-white focus:bg-gray-700">Toutes les réservations</a>

                            </div>

                          </div>
                        </div>
                            <div className="ml-3  relative">
                              <div className="flex  items-center mr-1 w-auto ">
                                <img className=" h-8 w-8 rounded-full" src={this.state.avatar} alt=""></img>
                                <Dropdow />
                              </div>
                            </div>


                      </div>
                    </div>



                  </nav>
                  <div className="p-20 mt-15 flex justify-center ">
                    <span className="sary rounded shadow mx-5">


                      <Upload />

                      <br></br>
                      <br></br>
                      <hr className="w-11/12 ml-3 mr-3"></hr>
                      <br></br>
                      <p className=" ml-3 mr-3 my-5 text-center h-12 text-xs text-gray-500 overflow-hidden ">Obtenez plus de réservation en rassurant les voyageurs avec une identité confirmée. </p>

                    </span>



                    <div className="  ">
                      <span className="field bg-white shadow-md rounded px-8 pt-6 pb-8 mb-1 rounded-2xl mx-5">
                        <p className="w-full h-12 text-lg text-center   font-bold text-gray-600">Infos personnelles</p>

                        <UserForm />
                      </span>

                    </div>

                  </div>

                  <div className="w-4/12 flex justify-center items-center mx-5">

                    <div className="h-auto w-1/2 shadow rounded bg-white  juser mb-20">

                      <p className="w-full h-1/2 mt-5 text-xs font-medium text-center text-gray-800 ">Lesquelles de mes informations sont communiquées à des tiers ?</p>

                      <p className="w-full h-1/2 mt-4 text-xs text-center text-gray-500 mb-10 ">Runbnb ne communique les coordonnées de l’hôte aux voyageurs qu’après la confirmation de la réservation.</p>
                    </div>
                  </div>



                </div>

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


export default connect(mapStateToprops)(EditProfile);


