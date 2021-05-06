import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Formik, Field, Form } from 'formik';
import IncrementeComponent from './IncrementeComponent';
import Nombre from './Incrementationnombre'
import '../../App.css';



  function Chambres(props) {

      const [smShow, setSmShow] = useState(false);
      const [lgShow, setLgShow] = useState(false);
      const  [ lgshowautre, setlgshowautre] = useState(false);

      let [Che, setCH] = useState(
      );

      const io = () =>{
        setSmShow(true)
  
        }
      
        const handleChange = (row, index, setFieldValue, event) => {
          const isChecked = event.target.checked;
          setFieldValue(`${row}[${index}].checked`, isChecked);
        }
      
      
      const next =()=>{
        props.nextStep();
      }
      const lits = props.formValue.Lits.Lits
      const autres = props.formValue.autres.autres
      const canapes = props.formValue.canapes.canapes
      let nombre=(e)=>{
        let { formValue, setFormValue } = props;
        formValue = { ...formValue, personne: e };
        setFormValue(formValue);

      }
    let { formValue } = props;
      return (
        <>

        <h1 className="w-11/12 text-xl font-bold mt-10 pl-5  pt-5">Informations sur l’hébergement :</h1>
          <div className="w-auto on inline-block element mt-15 pl-10 my-5 mx-5 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-10" >
              <div class="w-full mb-6 md:mb-0">
                <label className=""> Nombre de personne(s)</label>
                <Nombre
                className="w-1/3" 
                quant={formValue.personne}
                onChange={(e) => { nombre(e)}}
                />
              </div>
              <div class="w-full mb-6 md:mb-0" id="2">
                <div>
                  <lablel className="w-full my-4 block text-gray-700   hover:text-blue-500 border-none focus:text-blue-500 border-none " onClick={() => setSmShow(true)} >
                    <span className="plus font-bold text-2xl">+</span><span className="mx-3">Chambre 1
                    </span>
                  </lablel>
                  {
                    lits.map(lit => {
                      if (lit.checked == true && lit.quantite !== 0) {
                        return (<>
                          {lit.name}  {lit.quantite}  <br />
                        </>)
                      }
                    }
                    )
                  }
                </div>
              </div>
              <div class="w-full mb-6 md:mb-0">
                <label className="w-full my-4 block text-gray-700   hover:text-blue-500 border-none focus:text-blue-500 border-none " onClick={() => setLgShow(true)} >
                <span className="plus font-bold text-2xl">+</span><span className="mx-3">Salon</span>
                </label>
                  {
                    canapes.map(lit => {
                      if (lit.checked == true && lit.quantite !== 0) {
                        return (<>
                          {lit.name}  {lit.quantite}  <br />
                        </>)
                      }

                    }
                    )
                  }
               </div>
              <div class="w-full mb-6 md:mb-0">
                < label className="w-full my-4 block text-gray-700   hover:text-blue-500 border-none focus:text-blue-500 border-none " onClick={() => setlgshowautre(true)} >
                  <span className="plus font-bold text-2xl">+</span><span className="mx-3">Autres espaces</span>
                </label>
                {
                  autres.map(lit => {
                    if (lit.checked == true && lit.quantite !== 0) {
                      return (<>
                        {lit.name}  {lit.quantite}  <br />
                      </>)
                    }

                  }
                  )
                }
              </div>
              <div>
                Ajouter une  chambre
              </div>
              <div className="w-full mb-6 md:mb-0 mt-4">
                  <button class=" text-white font-bold py-2 px-4 rounded mr-1" onClick={props.previousStep}>Précédent</button>
                  <button  class=" text-white pl-6 pr-6 font-bold py-2 px-4 my-3 rounded" onClick={next}>Suivant</button>
              </div>
          </div>
          <Modal
              size=".w auto"
              show={smShow}
              onHide={() => setSmShow(false)}
              aria-labelledby="example-modal-sizes-title-lg"
            >           
              <Formik
                  initialValues={props.formValue.Lits}    
                    onSubmit={values => {
                      // same shape as initial values
                      let { formValue, setFormValue } =props;
                      console.log(props.formValue.Lits)
                      formValue = {...formValue, Lits: values};
                      setFormValue(formValue);
                      console.log("formValue");
                      console.log(formValue);
                      setSmShow(false)
                      console.log(props)
              }}
              >
                {({ values,checked, handleSubmit, touched, setFieldValue }) => (
              <Modal.Body>
                <div>
                <Form>
              {Object.keys(values) &&
                Object.keys(values).map(value => {
                  return (
                    <>
                      {/* Titre selon la key(s) */}
                      {values[value].map((item, index) => {
                        return (
                          <>
                      <div className="w-full ">
                          <label className="flex">
                              <div className="w-1/2">
                                {/* Titre de l'option .name */}
                                <input className="mr-2"
                                  type="checkbox"
                                  checked={item.checked}
                                  onClick={event => handleChange
                                    (value, index, setFieldValue, event)
                                  }
                               />
                                  {item.name} 
                              </div>
                              <span className="">
                                <IncrementeComponent
                                    qu={lits[index].quantite}
                                  onChange={quantity =>
                                    setFieldValue(
                                      `${value}[${index}].quantite`,
                                      quantity
                                    )
                                  }
                              />
                            </span>
                            </label>
                            </div>
                          </>
                        );
                      })}
                    </>
                  );
                })}
              <button  type="submit" class=" text-white font-bold py-2 px-4 rounded-full mt-5">
              Enregistrer</button>
            </Form>
                </div>
              </Modal.Body>
              ) }
              </Formik>
            </Modal>
            {/* modal salon */ }
            <Modal
              size=".w auto"
              show={lgShow}
              onHide={() => setLgShow(false)}
              aria-labelledby="example-modal-sizes-title-lg"
            >           
              <Formik
                  initialValues={props.formValue.canapes}    
                    onSubmit={values => {
                      // same shape as initial values
                      let { formValue, setFormValue } =props;
                      formValue = {...formValue, canapes: values};
                      setFormValue(formValue);
                      console.log(formValue);
                      setLgShow(false)
              }}
              >
                {({ values,checked, handleSubmit, touched, setFieldValue }) => (
              <Modal.Body>
                <div>
                <Form>
              {Object.keys(values) &&
                Object.keys(values).map(value => {
                  return (
                    <>
                      {/* Titre selon la key(s) */}
                      {values[value].map((item, index) => {
                        return (
                          <>
                          <div className="w-full">                       
                                <label className="flex" >
                                      <div className="w-1/2">
                                        {/* Titre de l'option .name */}
                                        <input className="mr-2"
                                          type="checkbox"
                                          checked={item.checked}
                                          onClick={event =>handleChange
                                            (value, index, setFieldValue, event)
                                          }
                                        />
                                             {item.name} 
                                      </div>
                                      <span>
                                        <IncrementeComponent
                                        qu={canapes[index].quantite}
                                          onChange={quantity =>
                                            setFieldValue(
                                              `${value}[${index}].quantite`,
                                              quantity
                                            )
                                          }
                                        />
                                      </span>
                                  </label>     
                          </div>
                          </>
                        );
                      })}
                    </>
                  );
                })}
              <button  type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-5">
              Enregistrer</button>
            </Form>
                </div>
              </Modal.Body>
              ) }
              </Formik>
            </Modal>
          {/* modal autrelits */ }
          <Modal
              size=".w auto"
              show={lgshowautre}
              onHide={() => setlgshowautre(false)}
              aria-labelledby="example-modal-sizes-title-lg"
            >           
              <Formik
                  initialValues={props.formValue.autres}    
                    onSubmit={values => {
                      // same shape as initial values
                      let { formValue, setFormValue } =props;
                      formValue = {...formValue, autres: values};
                      setFormValue(formValue);
                      console.log(formValue);
                      setlgshowautre(false)
              }}
              >
                {({ values,checked, handleSubmit, touched, setFieldValue }) => (
              <Modal.Body>
                <div>
                <Form>
              {Object.keys(values) &&
                Object.keys(values).map(value => {
                  return (
                    <>
                      {/* Titre selon la key(s) */}
                      {values[value].map((item, index) => {
                        return (
                          <>
                           <div className="w-full">
                             <label className="flex">
                                  <div className="w-1/2">
                                    {/* Titre de l'option .name */}
                                    <input className="mr-2"
                                      type="checkbox"
                                      checked={item.checked}
                                      onClick={event => handleChange
                                        (value, index, setFieldValue, event)
                                      }
                                    />
                                          {item.name} 
                                  </div>
                                  <span>
                                    <IncrementeComponent
                                    qu={autres[index].quantite}
                                      onChange={quantity =>
                                        setFieldValue(
                                          `${value}[${index}].quantite`,
                                          quantity
                                        )
                                      }
                                    />
                                  </span>
                            </label>  
                          </div>   
                          </>
                        );
                      })}
                    </>
                  );
                })}
               <button  type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-5">
               Enregistrer</button>
            </Form>
                </div>
              </Modal.Body>
              ) }
              </Formik>
            </Modal>
         
      </>
    ); 
  }
export default Chambres;




