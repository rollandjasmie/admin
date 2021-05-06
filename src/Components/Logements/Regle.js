
 
import React from 'react';
import { Formik, Form, Field } from 'formik';
import TimeField from 'react-simple-timefield';
import * as Yup from 'yup';

// const InformationSchema = Yup.object().shape({
//     arrive1: Yup.string()
//       .required('Champs obligatoire'),
//     arrive2: Yup.string()
//       .required('Champs obligatoire'),
//     depart1: Yup.string().required('Champs obligatoire'),
//     depart2: Yup.string().required('Champs obligatoire'),
// });



class Regle extends React.Component {
 
  render() {
    return (
   <Formik
              initialValues={this.props.formValue.regles}
              // validat  ionSchema={InformationSchema}
              onSubmit={values => {
                 let { formValue, setFormValue } = this.props;
                 formValue = {...formValue, regles: values};
                 setFormValue(formValue);

                 this.props.nextStep();
                 console.log(formValue)
              }}
          >
         {({ values, errors,handleSubmit, touched, setFieldValue }) => (
            <Form className="cont" onSubmit={handleSubmit}>
              <h1 className="w-10/12 text-xl font-bold mt-10 pl-5  pt-5"> Régle de la maison</h1>
              <div className="regle w-auto on inline-block element mt-15 pl-10 my-5 mx-5 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-10" >
              <div class="w-full mb-6 md:mb-0">
                    <label>
                      <Field className=" mr-2 "type="checkbox" name="regle" value="Non fumeur"/>
                      Non fumeur
                    </label><br></br>
                    <label>
                      <Field className="mr-2 " type="checkbox" name="regle" value="Ne convient pas aux animaux"/>
                      Ne convient pas aux animaux
                    </label><br></br>
                    <label>
                      <Field  className="mr-2" type="checkbox" name="regle" value="Convient aux enfants (2-12ans)" />
                      Convient aux enfants (2-12ans)
                    </label><br></br>
                     <label>
                      <Field  className="mr-2" type="checkbox" name="regle" value="onvient aux bébés (moins de 12ans)" />
                      Convient aux bébés (moins de 12ans)
                    </label><br></br>
                    <label>
                      <Field  className="mr-2 " type="checkbox" name="regle" value="Pas de fête ni de soirée" />
                     Pas de fête ni de soirée
                    </label><br></br>
                  </div><br></br>
                  <hr></hr>
                  <div class="w-full mb-6 md:mb-0 my-5">
                      <span class="w-auto mb-6 md:mb-0 my-5"> 
                        <h2 className="text-md font-bold">Arrivée</h2>
                        <h2 className="my-2 text-sm font-medium">De</h2>
                        <label className="flex-grow w-auto">
                          <Field as="select"  className="mt-3 "  name="arrive1"  >
                                      <option value="00h00">00h00</option>
                                      <option value="00h30">00h30</option>
                                      <option value="01h00">01h00</option>
                                      <option value="01h30">01h30</option>
                                      <option value="02h00">02h00</option>
                                      <option value="02h30">02h30</option>
                                      <option value="03h00">03h00</option>
                                      <option value="03h30">03h30</option>
                                      <option value="04h00">04h00</option>
                                      <option value="04h30">04h30</option>
                                      <option value="05h00">05h00</option>
                                      <option value="05h30">05h30</option>
                                      <option value="06h00">06h00</option>
                                      <option value="06h30">06h30</option>
                                      <option value="07h00">07h00</option>
                                      <option value="07h30">07h30</option>
                                      <option value="08h00">08h00</option>
                                      <option value="08h30">08h30</option>
                                      <option value="09h00">09h00</option>
                                      <option value="09h30">09h30</option>
                                      <option value="10h00">10h00</option>
                                      <option value="10h30">10h30</option>
                                      <option value="11h00">11h00</option>
                                      <option value="11h30">11h30</option>
                                      <option value="12h00">12h00</option>
                                      <option value="12h30">12h30</option>
                                      <option value="13h00">13h00</option>
                                      <option value="13h30">13h30</option>
                                      <option value="14h00">14h00</option>
                                      <option value="14h30">14h30</option>
                                      <option value="15h00">15h00</option>
                                      <option value="15h30">15h30</option>
                                      <option value="16h00">16h00</option>
                                      <option value="16h30">16h30</option>
                                      <option value="17h00">17h00</option>
                                      <option value="17h30">17h30</option>
                                      <option value="18h00">18h00</option>
                                      <option value="18h30">18h30</option>
                                      <option value="19h00">19h00</option>
                                      <option value="19h30">19h30</option>
                                      <option value="20h00">20h00</option>
                                      <option value="20h30">20h30</option>
                                      <option value="21h00">21h00</option>
                                      <option value="21h30">21h30</option>
                                      <option value="22h00">22h00</option>
                                      <option value="22h30">22h30</option>
                                      <option value="23h00">23h00</option>
                                      <option value="23h30">23h30</option>   
                            </Field>
                            {/* { errors.arrive1 && touched.arrive1 ? (
                              <div className="text-red-600 text-sm font-bold">{errors.arrive1}</div>
                            ) : null } */}

                              <span className="span mt-4 ml-10 mr-10  text-sm font-medium">à</span>
                      
                                <Field  className="mt-3"  as="select" name="arrive2"  >
                                      <option value="00h00">00h00</option>
                                      <option value="00h30">00h30</option>
                                      <option value="01h00">01h00</option>
                                      <option value="01h30">01h30</option>
                                      <option value="02h00">02h00</option>
                                      <option value="02h30">02h30</option>
                                      <option value="03h00">03h00</option>
                                      <option value="03h30">03h30</option>
                                      <option value="04h00">04h00</option>
                                      <option value="04h30">04h30</option>
                                      <option value="05h00">05h00</option>
                                      <option value="05h30">05h30</option>
                                      <option value="06h00">06h00</option>
                                      <option value="06h30">06h30</option>
                                      <option value="07h00">07h00</option>
                                      <option value="07h30">07h30</option>
                                      <option value="08h00">08h00</option>
                                      <option value="08h30">08h30</option>
                                      <option value="09h00">09h00</option>
                                      <option value="09h30">09h30</option>
                                      <option value="10h00">10h00</option>
                                      <option value="10h30">10h30</option>
                                      <option value="11h00">11h00</option>
                                      <option value="11h30">11h30</option>
                                      <option value="12h00">12h00</option>
                                      <option value="12h30">12h30</option>
                                      <option value="13h00">13h00</option>
                                      <option value="13h30">13h30</option>
                                      <option value="14h00">14h00</option>
                                      <option value="14h30">14h30</option>
                                      <option value="15h00">15h00</option>
                                      <option value="15h30">15h30</option>
                                      <option value="16h00">16h00</option>
                                      <option value="16h30">16h30</option>
                                      <option value="17h00">17h00</option>
                                      <option value="17h30">17h30</option>
                                      <option value="18h00">18h00</option>
                                      <option value="18h30">18h30</option>
                                      <option value="19h00">19h00</option>
                                      <option value="19h30">19h30</option>
                                      <option value="20h00">20h00</option>
                                      <option value="20h30">20h30</option>
                                      <option value="21h00">21h00</option>
                                      <option value="21h30">21h30</option>
                                      <option value="22h00">22h00</option>
                                      <option value="22h30">22h30</option>
                                      <option value="23h00">23h00</option>
                                      <option value="23h30">23h30</option>   
                                      </Field>
                            </label>
                  
                        </span>
                      <span class="w-auto mb-6 md:mb-0 my-5">
                          <h2 className="text-md font-bold pt-4">Départ</h2>
                          <h2 className="my-2 text-sm font-medium">De</h2>
                          <label className="flex-1 w-auto">
                          <Field as="select" className="mt-3"   name="depart1" >
                                      <option value="00h00">00h00</option>
                                      <option value="00h30">00h30</option>
                                      <option value="01h00">01h00</option>
                                      <option value="01h30">01h30</option>
                                      <option value="02h00">02h00</option>
                                      <option value="02h30">02h30</option>
                                      <option value="03h00">03h00</option>
                                      <option value="03h30">03h30</option>
                                      <option value="04h00">04h00</option>
                                      <option value="04h30">04h30</option>
                                      <option value="05h00">05h00</option>
                                      <option value="05h30">05h30</option>
                                      <option value="06h00">06h00</option>
                                      <option value="06h30">06h30</option>
                                      <option value="07h00">07h00</option>
                                      <option value="07h30">07h30</option>
                                      <option value="08h00">08h00</option>
                                      <option value="08h30">08h30</option>
                                      <option value="09h00">09h00</option>
                                      <option value="09h30">09h30</option>
                                      <option value="10h00">10h00</option>
                                      <option value="10h30">10h30</option>
                                      <option value="11h00">11h00</option>
                                      <option value="11h30">11h30</option>
                                      <option value="12h00">12h00</option>
                                      <option value="12h30">12h30</option>
                                      <option value="13h00">13h00</option>
                                      <option value="13h30">13h30</option>
                                      <option value="14h00">14h00</option>
                                      <option value="14h30">14h30</option>
                                      <option value="15h00">15h00</option>
                                      <option value="15h30">15h30</option>
                                      <option value="16h00">16h00</option>
                                      <option value="16h30">16h30</option>
                                      <option value="17h00">17h00</option>
                                      <option value="17h30">17h30</option>
                                      <option value="18h00">18h00</option>
                                      <option value="18h30">18h30</option>
                                      <option value="19h00">19h00</option>
                                      <option value="19h30">19h30</option>
                                      <option value="20h00">20h00</option>
                                      <option value="20h30">20h30</option>
                                      <option value="21h00">21h00</option>
                                      <option value="21h30">21h30</option>
                                      <option value="22h00">22h00</option>
                                      <option value="22h30">22h30</option>
                                      <option value="23h00">23h00</option>
                                      <option value="23h30">23h30</option>   
                            </Field>
                              
                          <span className="span mt-4 ml-10   mr-10  text-sm font-medium">à</span>
                      
                            <Field as="select" className="mt-3"   name="depart2"  >
                                      <option value="00h00">00h00</option>
                                      <option value="00h30">00h30</option>
                                      <option value="01h00">01h00</option>
                                      <option value="01h30">01h30</option>
                                      <option value="02h00">02h00</option>
                                      <option value="02h30">02h30</option>
                                      <option value="03h00">03h00</option>
                                      <option value="03h30">03h30</option>
                                      <option value="04h00">04h00</option>
                                      <option value="04h30">04h30</option>
                                      <option value="05h00">05h00</option>
                                      <option value="05h30">05h30</option>
                                      <option value="06h00">06h00</option>
                                      <option value="06h30">06h30</option>
                                      <option value="07h00">07h00</option>
                                      <option value="07h30">07h30</option>
                                      <option value="08h00">08h00</option>
                                      <option value="08h30">08h30</option>
                                      <option value="09h00">09h00</option>
                                      <option value="09h30">09h30</option>
                                      <option value="10h00">10h00</option>
                                      <option value="10h30">10h30</option>
                                      <option value="11h00">11h00</option>
                                      <option value="11h30">11h30</option>
                                      <option value="12h00">12h00</option>
                                      <option value="12h30">12h30</option>
                                      <option value="13h00">13h00</option>
                                      <option value="13h30">13h30</option>
                                      <option value="14h00">14h00</option>
                                      <option value="14h30">14h30</option>
                                      <option value="15h00">15h00</option>
                                      <option value="15h30">15h30</option>
                                      <option value="16h00">16h00</option>
                                      <option value="16h30">16h30</option>
                                      <option value="17h00">17h00</option>
                                      <option value="17h30">17h30</option>
                                      <option value="18h00">18h00</option>
                                      <option value="18h30">18h30</option>
                                      <option value="19h00">19h00</option>
                                      <option value="19h30">19h30</option>
                                      <option value="20h00">20h00</option>
                                      <option value="20h30">20h30</option>
                                      <option value="21h00">21h00</option>
                                      <option value="21h30">21h30</option>
                                      <option value="22h00">22h00</option>
                                      <option value="22h30">22h30</option>
                                      <option value="23h00">23h00</option>
                                      <option value="23h30">23h30</option>  
                                      </Field> 
                          </label>
                      </span>
                </div>
                <div className="w-full mb-6 md:mb-0 mt-4">
                <button class=" text-white font-bold py-2 px-4 rounded mr-1" onClick={this.props.previousStep}>Précédent</button>
                <button  class=" text-white pl-6 pr-6 font-bold py-2 px-4 my-3 rounded"type="submit">Suivant</button>
              </div>
              </div> 
        

            </Form>
         )}
     </Formik>
    )
  }
}

export default Regle;