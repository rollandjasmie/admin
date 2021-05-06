import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';



class InfoRunbnb extends React.Component {
  render() {
    return (
      <Formik
       initialValues={{
       
         pays: '',
         ville: '',
         adresse:'',
         code: '',
         adresse2: ''
       }}
     
       onSubmit={values => {
          let { formValue, setFormValue } = this.props;

          formValue = {...formValue, localisation: values};

          setFormValue(formValue);

          console.log(formValue);

          this.props.nextStep();
       }}
     >
       {({ values, errors, touched, setFieldValue }) => (
         <Form className="cont">

        <div className="cal regle1 w-11/12 on inline-block element mt-5 pl-10 ml-10 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-10  ">
        <h1 className="text-2ml font-bold  mb-10 ">Quelques informations importantes avant d’inscrire votre hébergement sur Runbnb.com</h1>
            <div class=" mb-6 md:mb-0">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Les réservations sont-elles confirmées immédiatement ?
              </label>
              <label class="block tracking-wide text-gray-700 text-xs " >
              Oui, dès qu’un client éffectue une réservation, celle ci est confirmée immédiatement
              </label>                       
            </div>

            <div class=" mb-6 md:mb-0 my-4">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Puis-je choisir qui séjourne dans mon hébergement ?
              </label>
              <label class="block tracking-wide text-gray-700 text-xs " >
              Non, tous nos utilisateurs peuvent réserver une date qui est ouverte dans votre calendrier
              </label>                       
            </div>  
             <div class=" mb-6 md:mb-0">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Puis-je choisir les jours pour lesquels je recois des réservations ?
              </label>
              <label class="block tracking-wide text-gray-700 text-xs " >
              Oui, il vous suffit de vous assurer que votre calendrier est à jour. Fermez toutes les dates pour lesquelles vous ne souhaitez pas recevoir de réservation.
               Si vous avez recu des réservations via d’autres sites, veuillez également fermer les dates en question.
              </label>                       
            </div>
        

           
            <div className="flex items-end justify-end py-5">

              <button class=" text-white font-bold py-2 px-4 rounded mr-1" onClick={this.props.previousStep}>Précédent</button>
              <button  class=" text-white pl-6 pr-6 font-bold py-2 px-4 rounded" onClick={this.props.nextStep}>Suivant</button>
            </div>
      
          </div>
        </Form>
       )}
     </Formik>
    )
  }
}

export default InfoRunbnb;