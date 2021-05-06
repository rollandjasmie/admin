import React from 'react'
import { Formik, Field, Form } from 'formik';
import axios from 'axios'
import history from '../../../../history'





class Securite extends React.Component{
   
 render(){
     
     return(
         <Formik
             initialValues={this.props.securite}
             onSubmit={value => {
                 axios.put(`/logements/${this.props.logement_id}/equi_securites`, value)
                //  history.push(`/modifierequip/${this.props.logement_id}`)
                 this.props.ok(false)           

             }
             }
         >{({ values, errors, handleSubmit, touched, setFieldValue }) => (

             <Form onSubmit={handleSubmit}>
             {

                 this.props.showsecurite ?
                    <div>
                        <div className="flex w-full">
                            <div className="w-2/4">

                                 <div className="w-full flex px-5 my-4">
                                     <label className="w-full flex text-gray-600">
                                         <Field type="checkbox" name="title" value="Extincteur" className=" mr-3" />
                                    Extincteur
                                    </label>
                                 </div>
                            </div>

                             <div >
                                 <label className="w-full flex pt-4 mt-2 text-gray-600">
                                     <Field type="checkbox" name="title" value="Kit de premiers secours" className=" mr-3" />
                                Kit de premiers secours
                                </label>
                             </div>
                        </div>


                        <div className="w-full px-5 my-4">
                             <h1 className="w-full flex text-base font-bold text-gray-800">
                                 Fiche de sécurité
                            </h1>
                             <h2 className="w-full flex text-sm font-medium text-gray-600 pt-3">
                                 Où se trouve les dipositifsde sécurité ?
                            </h2>

                             <div className=" text-sm font-medium text-gray-600">
                                 <label className="w-full pt-4 mt-2">
                                     Extincteur
                                </label>
                            <Field component="textarea" name="Extincteur" className="border h-10 w-1/3 rounded-lg mr-3" />
                             </div>
                             <div className=" text-sm font-medium text-gray-600">
                                 <label className="w-full pt-4 mt-2">
                                     Alarme incendie
                                </label>
                                 <Field component="textarea" name="incendie" className="border h-10 w-1/3 rounded-lg mr-3" />
                             </div>
                             <div className=" text-sm font-medium text-gray-600">
                                 <label className="w-full pt-4 mt-2">
                                     Vanne de gaz
                                </label>
                                 <Field component="textarea" name="gaz" className=" border h-10 w-1/3 rounded-lg mr-3" />
                             </div>
                             <div className=" text-sm font-medium text-gray-600">
                                 <label className="w-full pt-4 mt-2">
                                     Urgence médicale
                                </label>
                                 <Field component="textarea" name="medicale" className=" border h-10 w-1/3 rounded-lg mr-3" />
                             </div>              
                             <div className=" text-sm font-medium text-gray-600">
                                 <label className="w-full pt-4 mt-2">
                                     Police
                                </label>
                                 <Field component="textarea" name="Police" className=" border h-10 w-1/3 rounded-lg mr-3" />
                             </div>
                             <button type="submit" class="bg-orange-500 text-white font-bold py-2 px-4 rounded mt-5">
                                 Enregistrer
                            </button>
                        </div>
                    </div>
                     : null

             }
          </Form>

        )
    }
        </Formik>
     )
 }
}
export default  Securite;