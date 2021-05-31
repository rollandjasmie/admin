import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import history from '../../../history'

import '../HomePage.css';
import Navbarextra from '../Navbar/Navbarextra';
import Navbarextra2 from '../Navbar/Navbarextra2';
import axios from 'axios'
import { NavLink } from 'react-router-dom';


class Reglement extends React.Component {
    state = {
        title: null,
        autre: null,
        id:null,
        logement_id: null,
        adresse: null,
        arrive1: null,
        arrive2: null,
        depart1: null,
        depart2: null,
        conditions: null,
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        axios.get(`/logements/${params.logement_id}/parms_reservations`).then(res => {
            this.setState({
                title: res.data.reservartion.title,
                autre: res.data.reservartion.autre,
                id: res.data.reservartion.id
            })
            console.log(this.state);
        })
        axios.get(`/logements/${params.logement_id}`).then(res => {
            this.setState({
                logement: res.data.logement,
                adresse: res.data.adresse
            })
        })
        axios.get(`/logements/${params.logement_id}/regles`).then(res => {
            this.setState({
                arrive1: res.data.regles.arrive1,
                arrive2: res.data.regles.arrive2,
                depart1: res.data.regles.depart1,
                depart2: res.data.regles.depart2,

            })
        })

        axios.get(`/logements/${params.logement_id}/conditions`).then(res => {
            this.setState({
                id: res.data.condition.id,
                conditions: res.data.condition.conditions
            })
            console.log(res);
        })
    }
    render() {
        const { match: { params } } = this.props;

        return (
            <>
            {
                this.state.id?(
                        <Formik
                            initialValues={this.state}
                            onSubmit={value => {
                                axios.put(`/logements/${params.logement_id}/parms_reservations`, value)
                                history.push(`/logements/${params.logement_id}/reservation`)
                            }}
                        >
                            {({ values, errors, handleSubmit, touched, setfieldValue }) => (
                                <Form onSubmit={handleSubmit}>
                                    <div className="w-full bg-white">
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
                    {/* <NavLink to={`/prevuer/${params.logement_id}/prevue`}>
                      <label className="sansbg rounded px-3 py-2 text-theme hover:text-white
                      hover:font-bold ">
                        Prévisualiser l'annonce
                      </label>
                    </NavLink> */}
                    <NavLink to={`/logements/${params.logement_id}/calendrier`}>
                      <label className="border-2 rounded px-3 py-2 sansbg text-theme hover:text-white
                      hover:font-bold mx-4">
                        Voir le calendrier
                      </label>
                    </NavLink>
                  </div>
             </div>.
                                        <div className=" my-5">
                                            <div className="mx-4 flex w-5/6 h-10   ">
                                                <NavLink to={`/extraheb/${params.logement_id}`} className="hover:font-normal hover:text-gray-600">
                                                    <label className="mx-3  h-10 text-sm text-gray-500  hover:text-gray-600 hover:font-normal cursor-pointer  ">
                                                        Détails de l'annonce
                                                     </label>
                                                </NavLink>
                                                <label className="mx-4  h-10 text-sm text-theme font-bold border-b-4 hr-theme">
                                                    Paramètre de réservation
                                                </label>
                                                <NavLink to={`/logements/${params.logement_id}/frais_complementaires`} className="hover:font-normal hover:text-gray-600">
                                                    <label className="mx-3  h-10 text-sm text-gray-500  hover:text-gray-600 hover:font-normal cursor-pointer  ">
                                                        Frais complémentaire
                                                    </label>
                                                </NavLink>
                                                <NavLink to={`/logements/${params.logement_id}/Taxe`}>
                                                <label className="mx-3  h-10 text-sm text-gray-500  hover:text-gray-600 hover:font-normal cursor-pointer  ">
                                                    Taxe de séjour locale
                                                </label>
                                                </NavLink>
                                                <NavLink to={`/logements/${params.logement_id}/Co-hote`}>
                                                <label className="mx-3  h-10 text-sm text-gray-500  hover:text-gray-600 hover:font-normal cursor-pointer  ">
                                                    Co-gestionnaire
                                                </label>
                                                </NavLink>
                                            </div>
                                            <div className="w-4/6 ">
                                                <hr className="w-full mx-5"></hr>
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <div className="w-full">

                                            <div className="flex mx-5 my-5 py-5">
                                                    <div className="w-2/3"> 
                                                        <h1 className=" text-lg font-bold text-gray-700 my-2">Règlement intérieur </h1><br /><br />
                                            
                                                    {
                                                        this.state.id ? (
                                                                this.state.title && this.state.title.map((title) => {
                                                                return (<>
                                                                    {title} <br />
                                                                    <hr className="w-3/4 mt-3"></hr>
                                                                </>)
                                                            })
                                                            ) : null
                                                        }
                                                    </div>  
                                                 <NavLink to={`/logements/${params.logement_id}/Reglement_interieur`}>
                                                    <h2 className=" text-theme border-2 sansbg rounded px-4 py-2  hover:text-white">Modifier</h2>
                                                </NavLink>
                                    
                                            </div>
                                            <di>
                                            <div className="flex mx-5 ">
                                              <h1 className="w-2/3 text-lg font-bold text-gray-700">Règles </h1>
                                              <NavLink to={`/logements/${params.logement_id}/Regles`}>
                                              <h2 className="text-theme border-2 sansbg rounded px-4 py-2  hover:text-white">Modifier</h2>
                                              </NavLink>
                                    
                                            </div>       
                                                    {
                                                        this.state.id ? (
                                                            <div className="mx-5 my-3">
                                                            Arrivée :&nbsp;
                                                            {this.state.arrive1} à &nbsp;
                                                            {this.state.arrive2}<br /><br />
                                                            Départ :&nbsp;
                                                            {this.state.depart1} à &nbsp; 
                                                            {this.state.depart2}<br /><br />
                                                            condition d'annulation :  <br />
                                                            {this.state.conditions} 
                                                            </div>
                                                        ) : null
                                                    }
                                                    
                                                    </di>
                                            </div>
                                        </div>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                ):null
            }
            </>
             )
    }
}

export default Reglement;
