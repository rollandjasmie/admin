import React from 'react';
import { Formik, Field, Form } from 'formik';
import axios from 'axios'
import history from '../../../../history'


class Famille extends React.Component {

    render() {
        let famille = {
            title: this.props.famille,

        }
        return (
            <Formik
                initialValues={famille}
                onSubmit={value => {
                    axios.put(`/logements/${this.props.logement_id}/equi_familles`,value)
                    // history.push(`/modifierequip/${this.props.logement_id}`)
                    this.props.ok(false)           

                }
                }
            >
                {({ values, errors, handleSubmit, touched, setFieldValue }) => (

                    <Form onSubmit={handleSubmit}>
            {this.props.showfam ?
                    <div>
                    <div className="flex w-full">
                        <div className="w-2/4">

                            <div className="w-full flex px-5 my-4">
                                <label className="w-full flex">
                                    <Field type="checkbox" name="title" value="Baignoire pour bébé" className=" mr-3"></Field>
                          Baignoire pour bébés
                        </label>
                            </div>
                            <div className="w-full flex px-5 my-4">
                                <label className="w-full flex">
                                    <Field type="checkbox" name="title" value="Baby-phone" className=" mr-3"></Field>
                            Baby-phone
                        </label>
                            </div>
                            <div className="w-full flex px-5 my-4">
                                <label className="w-full flex">
                                    <Field type="checkbox" name="title" value="Baby-sitters" className=" mr-3"></Field>
                           Baby-sitters
                        </label>
                            </div>
                            <div className="w-full flex px-5 my-4">
                                <label className="w-full flex">
                                    <Field type="checkbox" name="title" value="Baignoire" className=" mr-3"></Field>
                            Baignoire
                        </label>
                            </div>
                            <div className="w-full flex px-5 my-4">
                                <label className="w-full flex">
                                    <Field type="checkbox" name="title" value="table à manger" className=" mr-3"></Field>
                            table à manger
                        </label>
                            </div>
                            <div className="w-full flex px-5 my-4">
                                <label className="w-full flex">
                                    <Field type="checkbox" name="title" value="Livres et jouets pour enfant" className=" mr-3"></Field>
                            Livres et jouets pour enfant
                        </label>
                            </div>
                            <div className="w-full flex px-5 my-4">
                                <label className="w-full flex">
                                    <Field type="checkbox" name="title" value="Vaisselle pour enfant" className=" mr-3"></Field>
                            Vaisselle pour enfant
                        </label>
                            </div>
                            <div className="w-full flex px-5 my-4">
                                <label className="w-full flex">
                                    <Field type="checkbox" name="title" value="Lit pour bébé" className=" mr-3"></Field>
                           Lit pour bébé
                        </label>
                            </div>
                       


                        </div>


                        <div>

                            <div className="w-full flex my-4">
                                <label className="w-full flex">
                                    <Field type="checkbox" name="title" value="Pare-feu pour cheminée" className=" mr-3"></Field>
                            Pare-feu pour cheminée
                        </label>
                            </div>
                            <div className="w-full flex  my-4">
                                <label className="w-full flex">
                                    <Field type="checkbox" name="title" value="Console de jeu" className=" mr-3"></Field>
                            Console de jeu
                        </label>
                            </div>
                            <div className="w-full flex  my-4">
                                <label className="w-full flex ">
                                    <Field type="checkbox" name="title" value="Chaise haute" className=" mr-3"></Field>
                                Chaise haute<br></br>

                                </label>
                            </div>
                            <div className="w-full flex  my-4">
                                <label className="w-full flex">
                                    <Field type="checkbox" name="title" value="Lit parapluie" className=" mr-3"></Field>
                            Lit parapluie
                        </label>
                            </div>
                            <div className="w-full flex  my-4">
                                <label className="w-full flex">
                                    <Field type="checkbox" name="title" value="Store" className=" mr-3"></Field>
                            Store
                        </label>
                            </div>
                            <div className="w-full flex  my-4">
                                <label className="w-full flex">
                                    <Field type="checkbox" name="title" value="Barrière de sécurité pour escalier" className=" mr-3"></Field>
                            Barrière de sécurité pour escalier
                        </label>
                            </div>
                            <div className="w-full flex  my-4">
                                <label className="w-full flex">
                                    <Field type="checkbox" name="title" value="Protection sur les coins de table" className=" mr-3"></Field>
                            Protection sur les coins de table
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
export default Famille;