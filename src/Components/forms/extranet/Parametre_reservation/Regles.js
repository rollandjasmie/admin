import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import history from '../../../../history'

import '../../HomePage.css';
import Navbarextra from '../../Navbar/Navbarextra';
import Navbarextra2 from '../../Navbar/Navbarextra2';
import axios from 'axios'
import { NavLink } from 'react-router-dom';
import { GoArrowSmallLeft } from 'react-icons/go';



class Reglement extends React.Component {
    state = {
        arrive1: null,
        arrive2: null,
        depart1: null,
        depart2: null,
        id:null,
        conditions:null,
        logement_id: null,
        adresse: null
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        const load = async () =>{
            const response = await
        axios.get(`/logements/${params.logement_id}/regles`)
            this.setState({
                arrive1: response.data.regles.arrive1,
                arrive2: response.data.regles.arrive2,
                depart1: response.data.regles.depart1,
                depart2: response.data.regles.depart2,

            })
            await
        axios.get(`/logements/${params.logement_id}/conditions`).then(res => {
            this.setState({
                id: res.data.condition.id,
                conditions: res.data.condition.conditions
            })
            console.log(res);
        })
        await
        axios.get(`/logements/${params.logement_id}`).then(res => {
            this.setState({
                logement: res.data.logement,
                adresse: res.data.adresse
            })
        })
        }
        load ()
    }


  state = {
      
    isActive: 0
  };
  con1(e) {
    this.setState(activate => {
     return { isActive: 1};
    });
  }
  con2(e) {
    this.setState(activate => {
      return {  isActive: 2};
    });
  }
  con3(e) {
    this.setState(activate => {
     return { isActive: 3};
    });
  }
  con4(e) {
    this.setState(activate => {
      return {  isActive: 4};
    });
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
                                console.log(this.state)
                                axios.put(`/logements/${params.logement_id}/regles`, value)
                                history.push(`/logements/${params.logement_id}/Regles`)
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
                                                    <label  className=" px-4 py-5 my-3 text-gray-600 text-sm text-blue-500 hover:text-blue-700 hover:font-bold flex "  >
                                                        <GoArrowSmallLeft className="w-10 h-10" /><span className="py-2 px-3 text-base">Retour  aux paramètres de réservation </span>
                                                    </label>
                                                </NavLink>
                                                <div className="w-full flex px-5 ">
                                                    <label className="w-full flex  mt-2 text-lg font-bold text-gray-600">
                                                            Règles
                                                    </label>
                                                </div>
                                              <div className="py-5 px-5 text-gray-700">
                                                        <div className="w-full  px-5  ">
                                                            <h2 className="text-md font-bold">Arrivé</h2><br></br>
                                                            <h2 className="my-2 text-sm font-medium">De</h2>
                                                            <Field type="time" name="arrive1" min="01:00" max="23:00"  className=" mr-3"></Field>
                                                            <span className="ml-20 mr-20 text-sm font-medium">à</span>
                                                            <Field type="time" min="01:00" max="23:00" name="arrive2"  className=" mr-3"></Field>
                                                        <hr className="w-3/4 mt-5"></hr>
                                                        </div>
                                                        <div className="w-full  px-5">
                                                            <h2 className="text-md font-bold pt-4">Départ</h2><br></br>
                                                            <h2 className=" py-2 text-sm font-medium">De</h2>
                                                                <Field type="time" min="01:00" max="23:00" name="depart1" className=" mr-3"></Field>
                                                                <span className="ml-20 mr-20 text-sm font-medium">à</span>
                                                                <Field type="time" min="01:00" max="23:00" name="depart2" className=" mr-3"></Field>
                                                        </div>
                                                </div>
                                                <div className=" text-lg my-5  mx-5 text-lg font-bold text-gray-600">
                                                        Conditions d’annulation<br /><br />
                                                        <span className="text-sm font-bold text-gray-700 px-5"> 
                                                        Vos conditions actuelles :
                                                        </span> 
                                                    <div className="w-full flex py-5 px-5"    >
                                                            <Field className="opacity-0" id="jr1" type="radio" name="conditions" value="1 jours" />
                                                            <label className={`jour w-1/2  py-2 border border-orange-500  text-center 
                                                            hover:text-white hover:font-bold ${this.state.isActive === 1 ? "activé" : ""} `} for="jr1"onClick={() => this.con1(this)}>
                                                                1 jour
                                                            </label>

                                                            <Field className="hidden" type="radio" name="conditions" value="7 jours" id="jr7" />
                                                            <label className={`jour w-1/2  py-2 border border-orange-500  text-center 
                                                            hover:text-white hover:font-bold ${this.state.isActive === 2 ? "activé" : ""} `} for="jr7"onClick={() => this.con2(this)} >
                                                                7 jours
                                                            </label>

                                                            <Field className="hidden" type="radio" name="conditions" value="14 jours" id="jr14" />
                                                            <label className={`jour w-1/2  py-2 border border-orange-500  text-center 
                                                            hover:text-white hover:font-bold ${this.state.isActive === 3 ? "activé" : ""} `} for="jr14"onClick={() => this.con3(this)}>
                                                                14 jours
                                                                </label>

                                                                <Field className="hidden" type="radio" name="conditions" value="30 jours" id="jr30"/>
                                                            <label className={`jour w-1/2  py-2 border border-orange-500  text-center 
                                                            hover:text-white hover:font-bold ${this.state.isActive === 4 ? "activé" : ""} `} for="jr30" onClick={() => this.con4(this)}>    
                                                                30 jours
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
}

export default Reglement;
