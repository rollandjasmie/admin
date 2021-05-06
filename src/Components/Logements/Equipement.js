import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Formik, Field, Form } from 'formik';

class Equipement extends React.Component {
  render() {
    return (
   <Formik
              initialValues={this.props.formValue.title}
              onSubmit={values => {
                console.log(this.props.formValue.title)
                 let { formValue, setFormValue } = this.props;
                 formValue = {...formValue, title: values};
                 setFormValue(formValue);

                 this.props.nextStep();
                 console.log(formValue)
              }}
          >
         {({ values, errors,handleSubmit, touched, setFieldValue }) => (
            <Form onSubmit={handleSubmit}>
                 <h1 className="w-11/12 text-xl font-bold mt-10 pl-5  pt-5">Quels équipements proposez-vous ?</h1>
                 <div className="w-auto on inline-block element mt-15 pl-10 my-5 mx-5 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-10" >
                <label class="w-full mb-6 md:mb-0">
                  <Field className="mr-2" type="checkbox" name="title" value="Bar"/>
                  Bar
                </label><br></br>


                <label class="w-full mb-6 md:mb-0">
                  <Field className="mr-2" type="checkbox" name="title" value="Sauna"/>
                  Sauna
                </label><br></br>



                <label class="w-full mb-6 md:mb-0">
                  <Field className="mr-2" type="checkbox" name="title" value="Jardin ou arrière-cour" />
                  Jardin ou arrière-cour
                </label><br></br>


                <label class="w-full mb-6 md:mb-0">
                  <Field className="mr-2" type="checkbox" name="title" value="Terrasse" />
                  Terrasse
                </label><br></br>


                <label class="w-full mb-6 md:mb-0">
                  <Field className="mr-2" type="checkbox" name="title"  value="Bain amous /jacuzzi"/>
                  Bain amous /jacuzzi
                </label><br></br>
                
                <label class="w-full mb-6 md:mb-0">
                  <Field className="mr-2" type="checkbox" name="title"  value="Connexion wifi gratuit"/>
                  Connexion wifi gratuit  
                </label><br></br>

                <label class="w-full mb-6 md:mb-0">
                  <Field className="mr-2" type="checkbox" name="title"  value="Climatisation"/>
                  Climatisation
                </label><br></br>

                <label class="w-full mb-6 md:mb-0">
                  <Field className="mr-2" type="checkbox" name="title" value="plage" />
                  Plage
                </label><br></br>

                <label class="w-full mb-6 md:mb-0">
                  <Field className="mr-2" type="checkbox" name="title" value="Borne de recharge pour voiture électrique" />
                  Borne de recharge pour voiture électrique
                </label><br></br>

                <label class="w-full mb-6 md:mb-0">
                <Field className="mr-2" type="checkbox" name="title" value="Piscine privée" />
                  Piscine privée
                </label><br></br>

                <label class="w-full mb-6 md:mb-0">
                <Field className="mr-2" type="checkbox" name="title" value="Piscine partagée" />
                  Piscine partagée
                </label><br></br>
                
                <label class="w-full mb-6 md:mb-0">
                  <Field className="mr-2"  type="checkbox" name="title" value="Parking gratuit sur place" />
                  Parking gratuit sur place
                </label><br></br>


                <div className="w-full mb-6 md:mb-0 mt-4">
                <button class=" text-white font-bold py-2 px-4 rounded mr-1"  onClick={this.props.previousStep}>Précédent</button>
                <button  class=" text-white pl-6 pr-6 font-bold py-2 px-4 my-3 rounded"  type="submit">Suivant</button>
                </div>
              </div> 
           

            </Form>
         )}
     </Formik>
    )
  }
}

export default Equipement;