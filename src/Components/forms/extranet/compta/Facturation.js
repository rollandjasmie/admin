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
        <div>
            {
                home && coordonne?(
                    <div>
                        Dénomination / Prénom -nom : {coordonne.name} {coordonne.first_name}<br />
                        Adresse : {coordonne.adresse} <br />
                        Cose postal : {coordonne.codepostal} <br />
                        Ville : {coordonne.ville} <br />
                        Région Département : {coordonne.departement}<br />
                        
                        <button onClick={() => { sethome(false)}}>
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
                                <Form>
                                    <div class="w-full mb-6 md:mb-0">
                                      <label class="block uppercase tracking-wide text-gray-700 text-xs  font-bold my-3" for="grid-city">
                                        Nom
                                      </label>
                                      <Field name="name"  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="Nom de l'hébergement" />
                                    </div>
                                        <div class="w-full mb-6 md:mb-0">
                                        <label class="block uppercase tracking-wide text-gray-700 text-xs  font-bold my-3" for="grid-city">
                                            Prénom
                                        </label>
                                        <Field name="first_name"  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="Nom de l'hébergement" />
                                    </div>
                                        <div class="w-full mb-6 md:mb-0">
                                        <label class="block uppercase tracking-wide text-gray-700 text-xs  font-bold my-3" for="grid-city">
                                            Adresse
                                        </label>
                                        <Field name="adresse"  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="Nom de l'hébergement" />
                                    </div>
                                        <div class="w-full mb-6 md:mb-0">
                                        <label class="block uppercase tracking-wide text-gray-700 text-xs  font-bold my-3" for="grid-city">
                                            Code Postal
                                        </label>
                                        <Field name="codepostal"  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="Nom de l'hébergement" />
                                    </div>
                                        <div class="w-full mb-6 md:mb-0">
                                        <label class="block uppercase tracking-wide text-gray-700 text-xs  font-bold my-3" for="grid-city">
                                            Ville
                                        </label>
                                        <Field name="ville"  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="Nom de l'hébergement" />
                                    </div>
                                        <div class="w-full mb-6 md:mb-0">
                                        <label class="block uppercase tracking-wide text-gray-700 text-xs  font-bold my-3" for="grid-city">
                                            Région Département
                                        </label>
                                    <Field name="departement"  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="Nom de l'hébergement" />
                                    </div>
                                    <button class="w-auto text-white font-bold py-2 px-4 rounded my-3" type="submit">Enregistrer</button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                ) : null
            }
        </div>
    )
}
