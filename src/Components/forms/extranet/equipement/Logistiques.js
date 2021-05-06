import React from 'react';
import { Formik, Field, Form } from 'formik';
import axios from 'axios'
import history from '../../../../history'



class Logistiques extends React.Component{

    render(){
        let logistique = {
            title: this.props.logistique,
        }
        return( 
            <Formik
                initialValues={logistique}
                onSubmit={value => {
                    axios.put(`/logements/${this.props.logement_id}/equi_logistiques`, value)
                    console.log(value)
                    // history.push(`/modifierequip/${this.props.logement_id}`)
                    this.props.ok(false)           


                }
                }
            >
                {({ values, errors, handleSubmit, touched, setFieldValue }) => (

                    <Form onSubmit={handleSubmit}>
            {

                this.props.showlog ?
                <div>
                    <div className="flex w-full">
                        <div className="w-2/4">
                            <div className="w-full flex px-5 ">
                                <label className="w-full flex pt-4 mt-2">
                                <Field type="checkbox" name="title" value="Dépôt de bagages autorisé pour le confort des voyageurs:en cas d'arrivée anticipée ou de départ tardif" className=" mr-3"></Field>
                                    Dépôt de bagages autorisé pour le confort des voyageurs <br></br>
                                    en cas d'arrivée anticipée ou de départ tardif
                                </label>
                            </div>
                            <div className="w-full flex px-5 my-4">
                                <label className="w-full flex">
                                    <Field type="checkbox" name="title" value="Le ménage doit être fait avant le départ" className=" mr-3"></Field>
                                Le ménage doit être fait avant le départ
                                </label>
                            </div>
                        </div>
                        <div>
                            <div >
                                <label className="w-full flex pt-4 mt-2">
                                    <Field type="checkbox" name="title" value=" Séjours longue durée autorisés" className=" mr-3"></Field>
                                    Séjours longue durée autorisés
                                </label>
                            </div>
                        </div>
                    </div>
                        <button type="submit" class="mx-5 bg-orange-500 text-white font-bold py-2 px-4 rounded mt-3">
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
export default Logistiques;