import React from 'react';
import { Formik, Field, Form } from 'formik';
import axios from 'axios'
import history from '../../../../history'


class Courant extends React.Component {
   
    
    render() {
     
        let courant = {
            title: this.props.courant,
            
        }
      
        return (
            <Formik
            initialValues={courant}
            onSubmit={value=>{

                axios.put(`/logements/${this.props.logement_id}/equi_courants/`,value)  
                // history.push(`/modifierequip/${this.props.logement_id}`)
                this.props.ok(false)           
            }
        }        
        >
            {({ values, errors, handleSubmit, touched, setFieldValue }) => (
                
            <Form onSubmit={handleSubmit}>
                {this.props.showequipement ?

                 <div>   
                    <div className="flex w-full">
                        <div className="w-2/4">
                                <p className="text-sm font-bold text-gray-700">Equipements de base : </p>
                            <div className="w-full flex px-5 my-4">
                                <label className="w-full flex">
                                <Field type="checkbox" name="title" value="Equipements de base :
                                        Serviettes, draps, savon, papier toilettes et orreillers" className=" mr-3" />
                                    Equipements de base : <br></br>
                                        Serviettes, draps, savon, papier toilettes et orreillers
                                    </label>
                            </div>
                            <div className="w-full flex px-5 my-4">
                                <label className="w-full flex">
                                    <Field type="checkbox" name="title" value="Cuisine" className=" mr-3"></Field>
                                        Cuisine
                                    </label>
                            </div>
                            <div className="w-full flex px-5 my-4">
                                <label className="w-full flex">
                                    <Field type="checkbox" name="title" value="Climatisation" className=" mr-3"></Field>
                                        Climatisation
                                    </label>
                            </div>
                            <div className="w-full flex px-5 my-4">
                                <label className="w-full flex">
                                    <Field type="checkbox" name="title" value="Chauffage central ou radiateur électrique" className=" mr-3"></Field>
                                        Chauffage central ou radiateur électrique
                                    </label>
                            </div>
                            <div className="w-full flex px-5 my-4">
                                <label className="w-full flex">
                                    <Field type="checkbox" name="title" value="Sèche-cheveux" className=" mr-3"></Field>
                                        Sèche-cheveux
                                    </label>
                            </div>
                            <div className="w-full flex px-5 my-4">
                                <label className="w-full flex">
                                    <Field type="checkbox" name="title" value="Cintres" className=" mr-3"></Field>
                                        Cintres
                                </label>
                            </div>
                            <div className="w-full flex px-5 my-4">
                                <label className="w-full flex">
                                    <Field type="checkbox" name="title" value="Lave-linge" className=" mr-3"></Field>
                                        Lave-linge
                                </label>
                            </div>
                            <div className="w-full flex px-5 my-4">
                                <label className="w-full flex">
                                    <Field type="checkbox" name="title" value="Sèche-linge" className=" mr-3"></Field>
                                        Sèche-linge
                                    </label>
                            </div>
                            <div className="w-full flex px-5 my-4">
                                <label className="w-full flex">
                                    <Field type="checkbox" name="title" value="Eau chaude" className=" mr-3"></Field>
                                        Eau chaude
                                    </label>
                            </div>
                            <div className="w-full flex px-5 my-4">
                                <label className="w-full flex">
                                    <Field type="checkbox" name="title" value="Télevision" className=" mr-3"></Field>
                                        Télevision
                                    </label>
                            </div>
                            <div className="w-full flex px-5 my-4">
                                <label className="w-full flex">
                                    <Field type="checkbox" name="title" value="Cheminée" className=" mr-3"></Field>
                                        Cheminée
                                    </label>
                            </div>

                    
                        </div>


                        <div>
                            <div className="w-full flex my-4">
                                <label className="w-full flex pt-4 ">
                                        <Field type="checkbox" name="title" value="Entrée privée:Entrée par une rue différente ou une immeuble séparé" className=" mr-3"></Field>
                                    Entrée privée <br></br>
                                        Entrée par une rue différente ou une immeuble séparé
                                        </label>
                            </div>
                            <div className="w-full flex  my-4">
                                <label className="w-full flex">
                                    <Field type="checkbox" name="title" value="Salon privé" className=" mr-3"></Field>
                                        Salon privé
                                    </label>
                            </div>
                            <div className="w-full flex  my-4">
                                <label className="w-full flex ">
                                    <Field type="checkbox" name="title" value="Porte de chambre avec verrou" className=" mr-3"></Field>
                                            Porte de chambre avec verrou <br></br>

                                </label>
                            </div>
                            <div className="w-full flex  my-4">
                                <label className="w-full flex">
                                    <Field type="checkbox" name="title" value="Shampooing" className=" mr-3"></Field>
                                        Shampooing
                                    </label>
                            </div>
                            <div className="w-full flex  my-4">
                                <label className="w-full flex">
                                    <Field type="checkbox" value="Gel douche" name="title" className=" mr-3"></Field>
                                        Gel douche
                                    </label>
                            </div>
                            <div className="w-full flex  my-4">
                                <label className="w-full flex">
                                    <Field type="checkbox" name="title" value="Draps" className=" mr-3"></Field>
                                        Draps
                                    </label>
                            </div>
                            <div className="w-full flex  my-4">
                                <label className="w-full flex">
                                    <Field type="checkbox" name="title" value="oreillers et couvertures supplémentaires" className=" mr-3"></Field>
                                        oreillers et couvertures supplémentaires
                                    </label>
                            </div>
                            <div className="w-full flex  my-4">
                                <label className="w-full flex">
                                    <Field type="checkbox" name="title" value="Connexion wifi gratuit" className=" mr-3"></Field>
                                            Connexion wifi gratuit <br></br>

                                </label>
                            </div>
                            <div className="w-full flex  my-4">
                                <label className="w-full flex">
                                    <Field type="checkbox" name="title" value="Connexion Ethernet" className=" mr-3"></Field>
                                        Connexion Ethernet
                                    </label>
                            </div>
                            <div className="w-full flex  my-4">
                                <label className="w-full flex">
                                    <Field type="checkbox" name="title" value="Wi-Fi portable" className=" mr-3"></Field>
                                        Wi-Fi portable
                                    </label>
                            </div>

                            <div className="w-full flex ">
                                <label className="w-full flex">
                                    <Field type="checkbox" name="title" value="Espace de travail" className=" mr-3"></Field>
                                        Espace de travail
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
export default Courant;