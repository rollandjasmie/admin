import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import history from '../../../../history'

import '../../HomePage.css';
import Navbarextra from '../../Navbar/Navbarextra';
import Navbarextra2 from '../../Navbar/Navbarextra2';
import axios from 'axios'
import { NavLink } from 'react-router-dom';


class Frais_complementaire extends React.Component {
    state = {
        id: null,
        type_de_payment: null,
        montants: null,
        frais_suples: null,
        logement_id: null,
        adresse: null
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        axios.get(`/logements/${params.logement_id}/cautions/`).then(response => {
            this.setState({
                type_de_payment: response.data.type_de_payment,
                montants: response.data.montant,
                id: response.data.id
            })
        })

        axios.get(`/logements/${params.logement_id}/frais_suples/`).then(response => {
            this.setState({
                frais_suples: response.data.frais_suples,
            })
        })
        axios.get(`/logements/${params.logement_id}`).then(res => {
            this.setState({
                logement: res.data.logement,
                adresse: res.data.adresse
            })
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
                                            <Navbarextra2 logement_id={params.logement_id}/>
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
                                                <label className="mx-4  h-10 text-sm text-theme font-bold border-b-4 hr-theme ">
                                                    Frais complémentaire
                                                </label>
                                                <NavLink to={`/logements/${params.logement_id}/Taxe`}>
                                                <label className="mx-4  h-10 text-sm text-gray-500 hover:text-gray-600 cursor-pointer ">
                                                    Taxe de séjour locale
                                                </label>
                                                </NavLink>
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
                                        <div className="flex w-full">
                                            <div className="w-full">
                                            <div className="flex mx-5 my-5 py-5">
                                                    < div>
                                                        <h1 className="w-2/3 text-lg font-bold text-gray-700" style={{"height": "62px" ,"width": "233px"}}>Frais standard et autres frais </h1>
                                                    {
                                                        this.state.frais_suples && this.state.frais_suples.map(frais => (
                                                            <>
                                                                        {frais.types+ " "}
                                                                        {frais.montant+ " " }
                                                                        {frais.facturation}<br />
                                                            </>
                                                        ))
                                                    }
                                                    </div>
                                                 <NavLink to={`/logements/${params.logement_id}/modifier_frais`} style={{"margin-left": "528px"}}>
                                                        <h2 className="text-theme border-2 sansbg rounded px-4 py-2  hover:text-white">Modifier</h2>
                                                </NavLink>
                                    
                                            </div>
                                                <hr className="w-3/4 mt-5"></hr>
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

export default Frais_complementaire;
