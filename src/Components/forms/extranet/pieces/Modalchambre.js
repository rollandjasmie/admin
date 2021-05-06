import React from 'react';
import Modal from 'react-bootstrap/Modal';
import IncrementeComponent from './IncrementeComponent';
import { Formik, Field, Form } from 'formik';
import axios from 'axios'
import history from '../../../../history'






  export default class Modalchambre extends React.Component {
  
    state ={
        lits:[],
        ids:null
    }

    componentDidMount() {
      const asy = async () =>{
        await axios.get(`/logements/${this.props.logement_id}/chambres`).then(response =>  {
          this.setState({chambres:response.data.chambres,logement:response.data.logement,
            lits:response.data.lits,
            ids: response.data.lits[0][0].id,
    
           })
          })
      }
      asy()
    }
    handleChange = (row, index, setFieldValue, event) => {
      const isChecked = event.target.checked;
      setFieldValue(`${row}[${index}].checked`, isChecked);
    }
   
 
    render() {
      const io = {
        lits: this.state.lits[this.props.modalId]
      }
 
    
        return (
          <div className="p-12">
          {
            this.state.ids?(
              <Modal
                onRequestClose={this.props.closeModal}
                contentLabel="Meal Modal"
                show={this.props.modalIsOpen}
                size=".w auto"
                aria-labelledby="example-modal-sizes-title-lg"
              >
              <Formik
              initialValues={io}

              onSubmit={values => {
                console.log(values)
                const asy = async () =>{
                  await axios.put(`/logements/${this.props.logement_id}/chambres/${this.props.logement_id}`,values)
                  this.props.closeModal()
                }
                asy()
                history.push(`/modifierpiece/${this.props.logement_id}/chambre/`)
              }}
            >

                   
                      {({ values, checked, handleSubmit, touched, setFieldValue }) => (
                          <div>

                          <Form className="m-10">
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
                                                  onClick={event => this.handleChange
                                                    (value, index, setFieldValue, event)
                                                  }
                                                />
                                                {item.name}
                                              </div>

                                              <span className="">
                                                <IncrementeComponent
                                                  qu={item.quantite}
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
                          <label onClick={() => { this.props.closeModal()}} class=" simul-btn mx-1 text-white font-bold py-2 px-4 rounded mt-5">
                            Annuler
                            </label>
                            <button type="submit" class="  mx-2 text-white font-bold py-2 px-4 rounded mt-5">
                              Enregistrer
                            </button>
                            
                          </Form>
                          </div>
                      )}
                       
                  </Formik>
                </Modal>
):null
          }
          </div>
        )
      }
  }