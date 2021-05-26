import Axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Formik, Form, Field } from 'formik';

export default (props)=> {
    const [coordonne, setcoordonne] = useState(false)
    const [home, sethome] = useState(true)
    useEffect(() => {
        Axios.get(`/compta/${props.logement_id}/cordonne_facture`).then(response=>(
            setcoordonne(response.data)
        ))
    }, [])
    return(
        <>
        {
            home && coordonne?(
                <div className=" mx-5 my-5">
                    <div className="flex  my-5">
                    <div className="block mr-3">
                        <h1 className=" text-base mb-3 text-gray-500 font-bold">
                                 Dénomination / Prénom - Nom :
                           </h1>
        
                           <h2 className=" text-base mb-3 text-gray-500 font-bold">
                               Adresse :
                           </h2>
       
   
                           <h3 className=" text-base mb-3 text-gray-500 font-bold">
                               Code postale :
                           </h3>
       

                           <h4 className=" text-base mb-3 text-gray-500 font-bold">
                              Ville :
                           </h4>
        
                           <h5 className=" text-base mb-3 text-gray-500 font-bold">
                               Région / Département :
                           </h5>
                        
                    </div>
                    <div className="mb-3 ">
                         <h1 className="mb-3 text-gray-500 text-base">
                         {coordonne.name} {coordonne.first_name}
                         </h1>
                        
                         <h2 className="mb-3 text-gray-500 text-base">
                         {coordonne.adresse} 
                         </h2>
                
                         <h3 className="mb-3 text-gray-500 text-base">
                         {coordonne.codepostal}
                        
                         </h3>
                    
                
                         <h4 className="mb-3 text-gray-500 text-base">
                            {coordonne.ville}
                         </h4>
                        
                         <h5 className="mb-3 text-gray-500 text-base">
                         {coordonne.departement}
                         </h5>
                    </div>
                    {/* Dénomination / Prénom -nom : {coordonne.name} {coordonne.first_name}<br />
                    Adresse : {coordonne.adresse} <br />
                    Cose postal : {coordonne.codepostal} <br />
                    Ville : {coordonne.ville} <br />
                    Région Département : {coordonne.departement}<br /> */}
                    </div>
                    <button className="px-4 py-2 text-white rounded hover:font-medium cursor-pointer" onClick={() => { sethome(false)}}>
                        Modifier
                    </button>

                </div>
            ):null
        }
        {
            home === false && coordonne? (
                <div>

                    <Formik
                        initialValues={coordonne}
                        onSubmit={values => {
                            const asy = async ()=>{
                                await Axios.post(`/compta/${props.logement_id}/cordonne_facture_update`, values).then(response =>
                                    {
                                        if (response.data === "error") {
                                            alert("Une problème est survenu, veuillez réessayer plus tart")
                                        }
                                    }
                                    )
                                Axios.get(`/compta/${props.logement_id}/cordonne_facture`).then(response => (
                                    setcoordonne(response.data)
                                ))
                            }
                            asy()
                            sethome(true)
                            
                        }}
                    >
                        {({ values, errors, touched, setFieldValue }) => (
                            <Form className="w-1/3 mx-5 my-5"> 
                                    <div class="w-full mb-6 md:mb-0">
                                        <label class="block uppercase tracking-wide text-gray-700 text-xs  font-bold my-3" for="grid-city">
                                            Nom
                                        </label>
                                        <Field name="name"  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="" />
                                    </div>
                                     <div class="w-full mb-6 md:mb-0">
                                        <label class="block uppercase tracking-wide text-gray-700 text-xs  font-bold my-3" for="grid-city">
                                            Prénom
                                        </label>
                                        <Field name="first_name"  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="" />
                                    </div>
                                     <div class="w-full mb-6 md:mb-0">
                                        <label class="block uppercase tracking-wide text-gray-700 text-xs  font-bold my-3" for="grid-city">
                                            Adresse
                                        </label>
                                        <Field name="adresse"  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="" />
                                    </div>
                                     <div class="w-full mb-6 md:mb-0">
                                        <label class="block uppercase tracking-wide text-gray-700 text-xs  font-bold my-3" for="grid-city">
                                            Code Postal
                                        </label>
                                        <Field name="codepostal"  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="" />
                                    </div>
                                     <div class="w-full mb-6 md:mb-0">
                                        <label class="block uppercase tracking-wide text-gray-700 text-xs  font-bold my-3" for="grid-city">
                                            Ville
                                        </label>
                                        <Field name="ville"  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="" />
                                    </div>
                                     <div class="w-full mb-6 md:mb-0">
                                        <label class="block uppercase tracking-wide text-gray-700 text-xs  font-bold my-3" for="grid-city">
                                            Région Département
                                        </label>
                                    <Field name="departement"  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="" />
                                    </div>
                                    <button class="w-auto text-white font-bold py-2 px-4 rounded my-3" type="submit">Enregistrer</button>
                            </Form>
                        )}
                    </Formik>

                </div>
            ) : null
        }
        </>
    )
}
