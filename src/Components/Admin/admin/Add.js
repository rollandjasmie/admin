import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';

import { NavLink } from 'react-router-dom';
import history from '../../../history';
import { connect } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import Axios from 'axios';



function Home(props) {
    const [users, setUsers] = useState(false)
    const [cherche, setCherche] = useState(false)

    const { isAuthenticated } = props;
    const { user } = props;
    return (
        <>
            <div className="flex">
          <ToastContainer />

                <div className="w-3/12 h-screen bg-gray-700">
                    <h1 className="bg-gray-800 text-white text-5xl font-bold h-32 flex items-center justify-center"> Runbnb.com </h1>
                    <div className="text-white text-base font-bold h-20 flex items-center justify-center bg-indigo-500 bg-opacity-25 border-r-4 border-red-500" >
                        Utilisateurs

                    </div>
                    <div className="text-white text-base  h-20 flex items-center justify-center">
                        <NavLink to={'/logements/all'}>
                            Logements
                        </NavLink>
                    </div>
                    {
                        user.niveau === "2" ? (
                            <>
                                <div className="text-white text-base  h-20 flex items-center justify-center">
                                    <NavLink to={'/admin'}>
                                        Admin
                                    </NavLink>
                                </div>
                                <div className="text-white text-base  h-20 flex items-center justify-center">
                                    <NavLink to={'/comptabilite'}>
                                        Comptabilité
                                    </NavLink>
                                </div>
                                <div className="text-white text-base  h-20 flex items-center justify-center">
                                    <NavLink to={'/historique'}>
                                        Historique
                                    </NavLink>
                                </div>
                            </>
                        ) : null
                    }
                </div>
                <div className="w-2/3 mx-5 my-5">
                    <Formik
                      initialValues={{
                        pseudo:'',
                        first:'',
                        name:'', 
                        email:'',
                        mobile:'',
                        adresse:'',
                        niveau:'',
                        statu:'',
                        password:'',
                      }}
                        onSubmit={values => {
                          console.log(values)
                          async function add() {
                            Axios.post('/create/admin', values).then(response=>{
                              if (response.data.statu === "Email déjà existé") {
                                toast.error("Email déjà existé")
                              }
                              if (response.data.statu === "succes"){
                                history.push('/admin')
                              }
                            })
                          }
                          add()
                        }}
                    >
                        {({ values, errors, handleSubmit, touched, setfieldValue }) => (
                            <Form className="cont" onSubmit={handleSubmit}>
                            <div>
                                <div className="text-gray-600"> Pseudo :</div>
                                <Field required name="pseudo" placeholder="Pseudo" minlength="6" type="text" className="border rounded py-2 px-4"></Field><br />
                            </div>  
                            <div className="flex mt-3">
                                  <div>
                                    <div className="text-gray-600">Nom :</div>
                                    <Field required name="name" placeholder="Nom" type="text"className="border rounded py-2 px-4" ></Field><br />
                                  </div>
                                  <div className="mx-3"> 
                                    <div className="text-gray-600">Prénom :</div>
                                  <Field required name="first" placeholder="Prénom" type="text" className="border rounded py-2 px-4"></Field><br />
                                  </div>
                             </div>
                             <div className="mt-3">
                                <div className="text-gray-600"> Email :</div>
                            <Field required name="email" placeholder="Email" type="email"className="border rounded py-2 px-4"></Field><br />
                            </div>
                            <div  className="mt-3">
                                <div className="text-gray-600"> Telephone :</div>
                            <Field required name="mobile" placeholder="Numéro de tél portable" type=""className="border rounded py-2 px-4"></Field><br />
                          </div>
                          <div className="mt-3">
                                <div className="text-gray-600"> Adresse :</div>
                            <Field required name="adresse" placeholder="Adresse complète (numéro + rue, code postal, ville, Région/département)"className="border rounded py-2 px-4" type="text"></Field><br />
                          </div>
                            <div className="mt-3 text-gray-600">
                              Niveau d’accréditation:<br />
                              <div className="flex my-3"> 
                                <label className="flex">
                                  <Field required name="niveau"  type="radio" value="1" className="my-1 mr-3"></Field>
                                  1
                                </label> 
                                <label className="ml-5 mr-5">  ou</label>
                              

                                <label className="flex">
                                 
                                  <Field required name="niveau"  type="radio" value="2" className="my-1 mr-3"></Field>
                                  2
                                </label>
                            </div>
                            </div>
                            <div className="mt-3 text-gray-600">
                            Statut :<br />
                              <div className="flex my-3"> 
                                <label className="flex">
                                  <Field required name="statu" placeholder="" value="actif" type="radio" className="my-1 mr-3"></Field>
                                  actif
                                </label> 
                                <label className="ml-5 mr-5">  ou</label>
                              

                                <label className="flex">
                                 
                                  <Field required name="statu" placeholder="" value="en pause" type="radio" className="my-1 mr-3"></Field>
                                  en pause 
                                </label>
                            </div>
                            </div>
                            {/* <label className="mt-3">
                              Statut:<br />
                              <label>actif<br />
                                <Field required name="statu" placeholder="" value="actif" type="radio"></Field>
                              </label>ou 
                              <label>en pause 
                                <br />
                              <Field required name="statu" placeholder="" value="en pause" type="radio"></Field>
                              </label>
                            </label><br />
                          <Field required name="password" placeholder="password" type="password"></Field><br /> */}
                            <div className="mt-3">
                              <div className="text-gray-600"> Mot de passe :</div>
                              <Field required name="password" placeholder="Mot de passe"className="border rounded py-2 px-4" type="password"></Field><br />
                            </div>
                            <div className="flex items-end justify-end my-5">
                              <button class=" text-white font-bold py-2 px-4 rounded mr-1" onClick={()=>{history.push('/admin')}} >annuler</button>
                              <button class=" text-white pl-6 pr-6 font-bold py-2 px-4 rounded" type="submit">ajouter</button>
                            </div>
                        </Form>
                        )}
                    </Formik>
                    
                </div>
            </div>
        </>
    );
}
const mapStateToprops = (state) => {
    return {
        ...state.auth
    }
}
export default connect(mapStateToprops)(Home);