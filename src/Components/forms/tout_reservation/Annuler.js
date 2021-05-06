import React, { Component } from "react";
import axios from 'axios'
import {NavLink, Link } from 'react-router-dom';
import moment from 'moment';

class Annuler extends Component {
  constructor() {
    super();
    this.state = {
      name: "React"
    };
  }
      componentDidMount() {
        const asy = async () =>{
            axios.get('/proproietaire/reservation/tout').then(response=>{
                this.setState({
                    reservation:response.data.annuler
                })
            })
        }

        asy()
       } 

  render() {
    return(       
           <main>
                
              {
                    this.state.reservation?(
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
                            
                        {this.state.reservation.map(reser =>(    
                              <tbody className="bg-white divide-y divide-gray-200">
                                <tr>
                                  <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                                     {reser.reservation.idreservation}
                                    </span>
                                  </td>
                                  <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                                    
                                      <NavLink to={`/logements/${reser.logement.id}/details_reservation/${reser.reservation.id}`}>
                                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                                           {reser.user.first_name} 
                                          </span>
                                        </NavLink>
                                     
                                  </td>
                                  <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">

                                       {moment(reser.reservation.arrivee).format("LL")}
                                    </span>
                                  </td>
                                  <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                                      {moment(reser.reservation.depart).format("LL")}
                                    </span>
                                  </td>
                                  <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                                      {moment(reser.reservation.created_at).format("LL")}
                                    </span>
                                  </td>
                                  <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                                      {reser.logement.name}
                                    </span>
                                  </td>
                                  <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
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
                     ):null
                 }  
              </main>
  );
}
}

export default Annuler;