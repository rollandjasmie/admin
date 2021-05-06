import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import history from '../../../../history'

import '../../HomePage.css';
import Navbarextra from '../../Navbar/Navbarextra';
import Navbarextra2 from '../../Navbar/Navbarextra2';
import axios from 'axios'
import { GoArrowSmallLeft } from 'react-icons/go';
import { NavLink } from 'react-router-dom';
import Loading from '../../../user/Chargement';



class Reglement_interieur extends React.Component {
    state = {
        title: null,
        autre: null,
        id:null,
        logement_id: null,
        adresse: null,
        loading: false
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        const load = async () => {
            this.setState({
                loading: !this.state.loading
            })
            const res = await
            axios.get(`/logements/${params.logement_id}/parms_reservations`)
            this.setState({
                title: res.data.reservartion.title,
                autre: res.data.reservartion.autre,
                id: res.data.reservartion.id
            })
            console.log(this.state);
            axios.get(`/logements/${params.logement_id}`).then(resp => {
            this.setState({
                logement: resp.data.logement,
                adresse: resp.data.adresse
            })
            this.setState({
                loading: !this.state.loading
            })
        })
        }
        load ()
    }
    render() {
        const { match: { params } } = this.props;

        return (
            <>
                {
                    this.state.loading ?(<Loading />):(
                        <>
            {
                this.state.id?(
                <Formik
                    initialValues={this.state}
                    onSubmit={value => {
                        const load = async () => {
                            this.setState({
                                loading: !this.state.loading
                            })
                            await
                                axios.put(`/logements/${params.logement_id}/parms_reservations`, value)
                            history.push(`/logements/${params.logement_id}/Reglement_interieur`)
                        }
                        load()
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



                                <div className="flex w-full">
                                    <div className="w-2/4">
                                        <NavLink to={`/logements/${params.logement_id}/Reservation`}>
                                            <label className=" px-4 py-5 my-3 text-gray-600 text-sm text-blue-500 hover:text-blue-700 hover:font-bold flex "  >
                                                <GoArrowSmallLeft className="w-10 h-10" /><span className="py-2 px-3 text-base">Retour  aux paramètres de réservation</span>
                                            </label>
                                        </NavLink>
                                        <div className="w-full flex px-5 ">
                                            <label className="w-full flex  mt-2 text-lg font-bold text-gray-600">
                                                Règlement intérieur
                                                    </label>
                                        </div>
                                        <div className="py-3 px-5">
                                            <div className="w-full px-5 ">
                                                <label className="w-full flex text-sm pt-4 mt-2">
                                                    <Field type="checkbox" name="title" value="Convient aux enfants (2-12ans)" className=" mr-3"></Field>
                                                    Convient aux enfants (2-12ans)
                                                    </label>
                                                <hr className="w-3/4 mt-3"></hr>
                                            </div>
                                            <div className="w-full px-5 my-4">
                                                <label className="w-full flex text-sm">
                                                    <Field type="checkbox" name="title" value="Convient aux bébés (moins de 12ans)" className=" mr-3"></Field>
                                                Convient aux bébés (moins de 12ans)
                                                </label>
                                                <hr className="w-3/4 mt-3"></hr>
                                            </div>
                                            <div className="w-full px-5 my-4">
                                                <label className="w-full flex text-sm">
                                                    <Field type="checkbox" name="title" value="Ne convient pas aux animaux" className=" mr-3"></Field>
                                                Ne convient pas aux animaux
                                                 </label>
                                                <hr className="w-3/4 mt-3"></hr>
                                            </div>
                                            <div className="w-full px-5 my-4">
                                                <label className="w-full flex text-sm">
                                                    <Field type="checkbox" name="title" value="Non fumeur" className=" mr-3"></Field>
                                                Non fumeur
                                                </label>
                                                <hr className="w-3/4 mt-3"></hr>
                                            </div>
                                            <div className="w-full px-5 my-4">
                                                <label className="w-full flex text-sm">
                                                    <Field type="checkbox" name="title" value="Pas de fête ni de soirée" className=" mr-3"></Field>
                                                Pas de fête ni de soirée
                                                </label>
                                                <hr className="w-3/4 mt-3"></hr>
                                            </div>
                                            <div className="w-2/3 text-lg py-4">
                                                <label className="text-lg font-bold text-gray-600">
                                                    Règles supplémentaires<br /><br />
                                                    <Field component="textarea" name="autre" className=" mx-5 appearance-none block text-sm  bg-gray-200 text-gray-700 border border-gray-200 rounded py-3
                                                px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 " >
                                                    </Field>
                                                </label>
                                            </div>

                                            <button type="submit" class=" text-white hover:font-bold py-2 px-4 rounded mt-5">
                                                Enregistrer
                                                </button>
                                        </div>
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
            </>
            )
    }
}

export default Reglement_interieur;
