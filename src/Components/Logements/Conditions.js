import React from 'react';
import ReactDOM from 'react-dom';
import { Formik, Field, Form } from 'formik';
import '../../App.css';
import './condition.css';





export default class Conditions extends React.Component {
  


  state = {
      
    isActive: 0
  };
  con1(e) {
    this.setState(activate => {
     return { isActive: 1};
    });
  }
  con2(e) {
    this.setState(activate => {
      return {  isActive: 2};
    });
  }
  con3(e) {
    this.setState(activate => {
     return { isActive: 3};
    });
  }
  con4(e) {
    this.setState(activate => {
      return {  isActive: 4};
    });
  }
  



  render() {    
    return (
      <div className="bgcon">
        <Formik
        initialValues={{
          conditions: '',
        }}
        onSubmit={values => {
          let { formValue, setFormValue } = this.props;

          formValue = {...formValue, conditions: values};

          setFormValue(formValue);

          console.log(values);

          this.props.nextStep();
       }}
        >
            {({ values, errors, handleSubmit, touched, setfieldValue }) => (
              <Form className="cont" onSubmit={handleSubmit}>
              
            
            <h1 className="w-11/12 text-xl font-bold mt-10 pl-5 my-5 pt-5"> À quel moment avant leur arrivée les voyageurs peuvent-ils annuler leur réservations ?</h1>
          < div className="regle1 lg:w-2/4 md:w-3/4 sm:w-3/4 on inline-block element pl-10 ml-10 h-full  bg-white shadow-md rounded px-8 ">
            <div className="w-full flex py-5"    >

            <Field className="opacity-0" id="jr1" type="radio" name="conditions" value="1 jours" />
              <label className={`jour w-1/2  py-2 border border-orange-500  text-center 
              hover:text-white hover:font-bold ${this.state.isActive === 1 ? "activé" : ""} `} for="jr1"onClick={() => this.con1(this)}>
                1 jour
              </label>

              <Field className="hidden" type="radio" name="conditions" value="7 jours" id="jr7" />
              <label className={`jour w-1/2  py-2 border border-orange-500  text-center 
              hover:text-white hover:font-bold ${this.state.isActive === 2 ? "activé" : ""} `} for="jr7"onClick={() => this.con2(this)} >
                7 jours
              </label>

              <Field className="hidden" type="radio" name="conditions" value="14 jours" id="jr14" />
              <label className={`jour w-1/2  py-2 border border-orange-500  text-center 
              hover:text-white hover:font-bold ${this.state.isActive === 3 ? "activé" : ""} `} for="jr14"onClick={() => this.con3(this)}>
                14 jours
                </label>

                <Field className="hidden" type="radio" name="conditions" value="30 jours" id="jr30"/>
              <label className={`jour w-1/2  py-2 border border-orange-500  text-center 
              hover:text-white hover:font-bold ${this.state.isActive === 4 ? "activé" : ""} `} for="jr30" onClick={() => this.con4(this)}>    
                30 jours
              </label>

            </div>
            <div className="flex items-end justify-end my-5">
              <button class=" text-white font-bold py-2 px-4 rounded mr-1" onClick={this.props.previousStep}>Précédent</button>
              <button  class=" text-white pl-6 pr-6 font-bold py-2 px-4 rounded" type="submit">Suivant</button>
            </div>
            </div>
          </Form>
            )}
        </Formik>

       </div> 
       
    )
 
      }
  }

