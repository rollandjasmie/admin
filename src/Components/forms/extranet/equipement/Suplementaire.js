import React from 'react';
import { Formik, Field, Form } from 'formik';
import axios from 'axios'
import history from '../../../../history'



class Suplementaire extends React.Component {

    render() {
        let suplementaires = {
            title: this.props.suplementaires,
        }
        return (
            <Formik
                initialValues={suplementaires}
                onSubmit={value => {
                    axios.put(`/logements/${this.props.logement_id}/equi_suplementaires`, value)
                    // history.push(`/modifierequip/${this.props.logement_id}`)
                    this.props.ok(false)           

                }
                }
            >
                {({ values, errors, handleSubmit, touched, setFieldValue }) => (

                    <Form onSubmit={handleSubmit}>
                {

                    this.props.showsupp ?
                    <div>
                        <div className="flex w-full">
                            <div className="w-2/4">
                                <div className="w-full flex px-5 my-4">
                                    <label className="w-full flex pt-4 mt-2">
                                    <Field type="checkbox" name="title" value="Ustensiles de cuisine de base:Casseroles, huiles ,sel ,.." className=" mr-3"></Field>
                                        Ustensiles de cuisine de base <br></br>
                                              Casseroles, huiles ,sel ,..
                                    </label>
                                </div>
                                <div className="w-full flex px-5 my-4">
                                    <label className="w-full flex">
                                        <Field type="checkbox" name="title" value="Four à micro-ondes" className=" mr-3"></Field>
                                          Four à micro-ondes
                                      </label>
                                </div>
                                <div className="w-full flex px-5 my-4">
                                    <label className="w-full flex">
                                        <Field type="checkbox" name="title" value="Cafetières" className=" mr-3"></Field>
                                          Cafetières
                                      </label>
                                </div>
                                <div className="w-full flex px-5 my-4">
                                    <label className="w-full flex">
                                        <Field type="checkbox" name="title" value="Refrigérateur" className=" mr-3"></Field>
                                          Refrigérateur
                                      </label>
                                </div>
                                <div className="w-full flex px-5 my-4">
                                    <label className="w-full flex">
                                        <Field type="checkbox" name="title" value="Lave-vaisselle" className=" mr-3"></Field>
                                          Lave-vaisselle
                                      </label>
                                </div>
                                <div className="w-full flex px-5 my-4">
                                    <label className="w-full flex">
                                        <Field type="checkbox" name="title" value="Vailsselles et couverts" className=" mr-3"></Field>
                                          Vailsselles et couverts
                                      </label>
                                </div>
                                <div className="w-full flex px-5 my-4">
                                    <label className="w-full flex">
                                        <Field type="checkbox" name="title" value="Four" className=" mr-3"></Field>
                                          Four
                                      </label>
                                </div>
                                <div className="w-full flex px-5 my-4">
                                    <label className="w-full flex">
                                        <Field type="checkbox" name="title" value="Cuisinières" className=" mr-3"></Field>
                                          Cuisinières
                                      </label>
                                </div>
                                <div className="w-full flex px-5 my-4">
                                    <label className="w-full flex">
                                        <Field type="checkbox" name="title" value="Machine à pain" className=" mr-3"></Field>
                                         Machine à pain
                                      </label>
                                </div>
                                <div className="w-full flex px-5 my-4">
                                    <label className="w-full flex">
                                        <Field type="checkbox" name="title" value="Tapis de cuisson" className=" mr-3"></Field>
                                          Tapis de cuisson
                                      </label>
                                </div>
                                <div className="w-full flex px-5 my-4">
                                    <label className="w-full flex">
                                        <Field type="checkbox" name="title" value="Ustensiles de barbecue" className=" mr-3"></Field>
                                          Ustensiles de barbecue
                                      </label>
                                </div>

                                <div className="w-full flex px-5 my-4">
                                    <label className="w-full flex">
                                        <Field type="checkbox" name="title" value="Piano" className=" mr-3"></Field>
                                          Piano
                                      </label>
                                </div>
                                <div className="w-full flex px-5 my-4">
                                    <label className="w-full flex">
                                        <Field type="checkbox" name="title" value="Petit déjeuner inclus" className=" mr-3"></Field>
                                         Petit déjeuner inclus
                                      </label>
                                </div>

                                <div className="w-full flex px-5 my-4">
                                    <label className="w-full flex">
                                        <Field type="checkbox" name="title" value="Outils indispensable pour la plage" className=" mr-3"></Field>
                                          Outils indispensable pour la plage
                                      </label>
                                </div>

                            </div>


                            <div>
                                <div className="w-full flex my-4">
                                    <label className="w-full flex pt-4 mt-2">
                                    <Field type="checkbox" name="title" value="Logement de plain-pied:pas d'escalier dans le logement" className=" mr-3"></Field>
                                        Logement de plain-pied <br></br>
                                            pas d'escalier dans le logement
                                          </label>
                                </div>
                                <div className="w-full flex my-4">
                                    <label className="w-full flex">
                                        <Field type="checkbox" name="title" value="Parking gratuit sur place" className=" mr-3"></Field>
                                          Parking gratuit sur place
                                      </label>
                                </div>
                                <div className="w-full flex  my-4">
                                    <label className="w-full flex">
                                        <Field type="checkbox" name="title" value="Parking payant à l'exterieur" className=" mr-3"></Field>
                                          Parking payant à l'exterieur
                                      </label>
                                </div>
                                <div className="w-full flex  my-4">
                                    <label className="w-full flex">
                                        <Field type="checkbox" name="title" value="Borne de recharge pour voiture électrique" className=" mr-3"></Field>
                                          Borne de recharge pour voiture électrique
                                      </label>
                                </div>
                                <div className="w-full flex  my-4">
                                    <label className="w-full flex ">
                                        <Field type="checkbox" name="title" value="Chargeur EV" className=" mr-3"></Field>
                                              Chargeur EV <br></br>

                                    </label>
                                </div>
                                <div className="w-full flex  my-4">
                                    <label className="w-full flex">
                                        <Field type="checkbox" name="title" value="Salle de sport" className=" mr-3"></Field>
                                          Salle de sport
                                      </label>
                                </div>
                                <div className="w-full flex  my-4">
                                    <label className="w-full flex">
                                        <Field type="checkbox" name="title" value="Piscine privée" className=" mr-3"></Field>
                                          Piscine privée
                                      </label>
                                </div>
                                <div className="w-full flex  my-4">
                                    <label className="w-full flex">
                                        <Field type="checkbox" name="title" value="Piscine partagée" className=" mr-3"></Field>
                                          Piscine partagée
                                      </label>
                                </div>
                                <div className="w-full flex  my-4">
                                    <label className="w-full flex">
                                        <Field type="checkbox" name="title" value="Bain amous /jacuzzi" className=" mr-3"></Field>
                                          Bain amous /jacuzzi
                                      </label>
                                </div>
                                <div className="w-full flex  my-4">
                                    <label className="w-full flex">
                                        <Field type="checkbox" name="title" value="Barbecue" className=" mr-3"></Field>
                                          Barbecue
                                      </label>
                                </div>
                                <div className="w-full flex  my-4">
                                    <label className="w-full flex">
                                        <Field type="checkbox" name="title" value="Patio ou balcon" className=" mr-3"></Field>
                                              Patio ou balcon <br></br>

                                    </label>
                                </div>
                                <div className="w-full flex  my-4">
                                    <label className="w-full flex">
                                        <Field type="checkbox" name="title" value="Jardin ou arrière-cour" className=" mr-3"></Field>
                                          Jardin ou arrière-cour
                                      </label>
                                </div>
                                <div className="w-full flex  my-4">
                                    <label className="w-full flex">
                                        <Field type="checkbox" name="title" value="Terrasse" className=" mr-3"></Field>
                                          Terrasse
                                      </label>
                                </div>
                                <div className="w-full flex  my-4">
                                    <label className="w-full flex">
                                        <Field type="checkbox" name="title" value="Bar" className=" mr-3"></Field>
                                          Bar
                                      </label>
                                </div>
                                <div className="w-full flex  my-4">
                                    <label className="w-full flex">
                                        <Field type="checkbox" name="title" value="plage" className=" mr-3"></Field>
                                          Plage
                                      </label>
                                </div>
                                
                                

                            </div>
                        </div>
                                    <button type="submit" class="mx-5 bg-orange-500 text-white font-bold py-2 px-4 rounded mt-5">
                                        Enregistrer
                            </button>
                        </div>
                        : null

                }
                    </Form>

                )}
            </Formik>
        )
    }

}
export default Suplementaire;