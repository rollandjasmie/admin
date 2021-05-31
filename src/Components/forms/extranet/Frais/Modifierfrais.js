import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import history from '../../../../history'

import '../../HomePage.css';
import Navbarextra from '../../Navbar/Navbarextra';
import Navbarextra2 from '../../Navbar/Navbarextra2';
import axios from 'axios'
import { NavLink } from 'react-router-dom';
import { GoArrowSmallLeft } from 'react-icons/go';
import * as Yup from 'yup';
import Loading from '../../../user/Chargement';

const InformationSchema = Yup.object().shape({
    facturation: Yup.string()
        .required('Champs obligatoire'),
    types: Yup.string()
        .required('Champs obligatoire'),
    montant: Yup.string().required('Champs obligatoire'),
});


class Modifierfrais extends React.Component {
    state = {  
        id:null,
        type_de_payment:null,
        montants:null,
        frais_suples:null,
        loading:false,
        id_delet:null
               
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        const load = async ()=>{
            this.setState({
                loading: !this.state.loading
            })
            const response = await  
        axios.get(`/logements/${params.logement_id}/cautions/`)
                this.setState({type_de_payment:response.data.type_de_payment,
                montants:response.data.montant,
                id:response.data.id
        })
            const res = await 
        axios.get(`/logements/${params.logement_id}/frais_suples/`)
            this.setState({
                frais_suples: res.data.frais_suples,
            })
            this.setState({
                loading: !this.state.loading
            })
        }
        load ()
    }
    update = () => {
        const { match: { params } } = this.props;
        const load = async () => {
            this.setState({
                loading: !this.state.loading
            })
            await axios.put(`/logements/${params.logement_id}/cautions`,{
                type_de_payment: this.state.type_de_payment,
                montant :this.state.montants
            })
          history.push(`/logements/${params.logement_id}/modifier_frais`)
           
        }
        load ()
    }
    delete=(a)=>{
        const { match: { params } } = this.props;
        const ids = a
        const load = async () => {
            this.setState({
                loading: !this.state.loading
            })
            console.log(ids)
            await axios.delete(`/frais_suples/${ids}`)
            history.push(`/logements/${params.logement_id}/modifier_frais/`)
         
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
                    validationSchema={InformationSchema}

                    onSubmit={value => {
                        console.log(value)
                        axios.post(`/logements/${params.logement_id}/frais_suples`, value)
                        history.push(`/logements/${params.logement_id}/modifier_frais`)

                    }}


                >
                    {({ values, errors, handleSubmit, touched, setFieldValue }) => (
                        <Form onSubmit={handleSubmit}>
                            <div className="w-full bg-white">
                                <div className="h-24">
                                    <Navbarextra logement_id={params.logement_id} />
                                </div>
                                <div>
                                    <Navbarextra2 logement_id={params.logement_id}/>
                                </div>




                                <div className=" w-full">
                                    <div className="w-2/4">
                                        <NavLink to={`/logements/${params.logement_id}/frais_complementaires`}>
                                            <label className=" px-4 py-5 my-3 text-gray-600 text-sm text-blue-500 hover:text-blue-700 hover:font-bold flex "  >
                                                <GoArrowSmallLeft className="w-10 h-10" /><span className="py-2 px-3 text-base">Retour  aux frais complémentaire </span>
                                            </label>
                                        </NavLink>
                                    </div>
                                    {/* <div className="w-full flex px-5 ">
                                        <label className="w-full flex text-lg font-bold text-gray-600">
                                            Frais standard et autres frais
                                                </label>
                                    </div>
                                    <div className="py-3 px-5 text-gray-700">
                                        <h1 className="text-sm font-bold text-gray-700">Caution</h1>
                                        <div className=" flex w-full  px-5 py-2 ">
                                            <div className="block pt-4">
                                                <p1 className="text-xs text-gray-600">Montant souhaité :</p1>
                                                <input defaultValue={this.state.montants} onChange={(event) => this.setState({ montants: event.target.value })} className="tappearance-none block text-base bg-gray-200 text-gray-700 border border-gray-200 rounded py-2
                                    px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 w-56 mt-3" type="text" placeholder="1000 €"></input>
                                            </div>
                                            <div className="block pt-4 mx-5 px-5">
                                                <p1 className="text-xs text-gray-600">Type de paiement :</p1>
                                                <select defaultValue={this.state.type_de_payment} onChange={(event) => this.setState({ type_de_payment: event.target.value })} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 mt-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                                                    <option >Chèque</option>
                                                    <option >Espèce</option>
                                                    <option >Carte bancaire</option>
                                                    <option >Autres</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div> */}
                                    <div className="py-5 px-5 text-gray-700">
                                        <h1 className="text-sm font-bold text-gray-700">Frais supplémentaires</h1>

                                        <p1 className="text-xs text-gray-600">Ce sont les frais que vous incluez pour chaque réservation. Choisissez le type de frais et comment l’appliquer.</p1>
                                        {
                                            this.state.frais_suples && this.state.frais_suples.map(frais => (
                                                <div className=" flex w-full  px-5 py-4 ">

                                                    <div className="block pt-4">
                                                        <p1 className="text-xs text-gray-600">Type de frais :</p1>
                                                        <p2 className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 mt-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                                                            {frais.types}

                                                        </p2>
                                                    </div>
                                                    <div className="block pt-4 mx-5 px-5">
                                                        <p1 className="text-xs text-gray-600">Montant :</p1>
                                                        <p2 className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 mt-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                                                            {frais.montant}

                                                        </p2>
                                                    </div>
                                                    <div className="block pt-4">
                                                        <p1 className="text-xs text-gray-600">Type de facturation :</p1>
                                                        <p2 className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 mt-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                                                            {frais.facturation}

                                                        </p2>
                                                    </div>
                                                    <h2 onClick={() => { this.delete(frais.id) }} className="text-orange-500 border-2 border-orange-500 rounded px-4 mx-24 hover:bg-orange-500 hover:text-white flex items-center h-10 my-4 "> Supprimer</h2>
                                                </div>
                                            ))
                                        }

                                        <hr className="w-11/12 my-5"></hr>
                                        <div className=" flex w-full  px-5 py-4 ">
                                            <div className="block pt-4">
                                                <p1 className="text-xs text-gray-600">Type de frais :</p1>
                                                <select onChange={(event) => setFieldValue('types', event.target.value)} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 mt-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                                                    <option>----Choisir le type----</option>
                                                    <option >Ménage</option>
                                                    <option >Linge de lit</option>
                                                    <option >Serviette de toilette</option>
                                                    <option >Frais de service</option>
                                                    <option >Consommation électrique</option>
                                                    <option >Consommation eau</option>
                                                    <option >Consommation gaz</option>
                                                    <option >Spa/Jacuzzi</option>
                                                </select>
                                            </div>
                                            {errors.types && touched.types ? (
                                                <div className="text-red-600 text-sm font-bold">{errors.types}</div>
                                            ) : null}
                                            <div className="block pt-4 mx-5 px-5">
                                                <p1 className="text-xs text-gray-600">Montant :</p1>
                                                <Field name="montant" className="appearance-none block text-base bg-gray-200 text-gray-700 border border-gray-200 rounded py-2
                                                        px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 w-56 mt-3" type="text" placeholder="€"></Field>
                                                {errors.montant && touched.montant ? (
                                                    <div className="text-red-600 text-sm font-bold">{errors.montant}</div>
                                                ) : null}
                                            </div>
                                            <div className="block pt-4">
                                                <p1 className="text-xs text-gray-600">Type de facturation :</p1>
                                                <select onChange={(event) => setFieldValue('facturation', event.target.value)} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 mt-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                                                    <option>----Choisir le type----</option>
                                                    <option >/séjour</option>
                                                    <option >/Nuit</option>


                                                </select>
                                            </div>
                                            {errors.facturation && touched.facturation ? (
                                                <div className="text-red-600 text-sm font-bold">{errors.facturation}</div>
                                            ) : null}
                                            <button type="submit" className="text-white border-2 border-orange-500 rounded px-4 mx-24 hover:bg-orange-500 hover:text-white flex items-center h-10 my-4 text-theme "> Ajouter</button>
                                        </div>

                                        <button onClick={this.update} class="text-white  border-orange-500 rounded px-4 hover:bg-orange-500 hover:text-white flex items-center h-10 my-4 text-theme">
                                            Enregistrer
                            </button>
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

export default Modifierfrais;
