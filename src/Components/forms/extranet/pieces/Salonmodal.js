import React,{Component} from 'react';
import Modal from 'react-bootstrap/Modal';
import IncrementeComponent from './IncrementeComponent';
import { Formik, Field, Form } from 'formik';
import axios from 'axios'
import history from '../../../../history'


class Salonmodal extends Component{
    state={
        canapes:[],
          ids:null
    }
   
    componentDidMount() {
        const asy = async () => {
        await axios.get(`/logements/${this.props.logement_id}/chambres`).then(response => {
            if (response.data.canapes != null) {
                this.setState({
                    canapes: response.data.canapes,
                    ids: response.data.canapes[0][0].id,
    
                })
                
            }
        })
      }
      asy()
    }

    handleChange = (row, index, setFieldValue, event) => {
        const isChecked = event.target.checked;
        setFieldValue(`${row}[${index}].checked`, isChecked);
    }

    render(){
        const io = {
            canapes: this.state.canapes[this.props.salonmodalId]
        }
        return (
            <>
                {
                    this.state.ids ? (
                        <Modal
                            onRequestClose={this.props.saloncloseModal}
                            contentLabel="Meal Modal"
                            show={this.props.salonmodalIsOpen}
                            size=".w auto"
                            aria-labelledby="example-modal-sizes-title-lg"
                        >
                            <Formik
                                initialValues={io}

                                onSubmit={values => {
                                    console.log(values)
                                    axios.put(`/logements/${this.props.logement_id}/chambres/${this.props.logement_id}`, values)
                                    this.props.saloncloseModal()
                                    history.push(`/modifierpiece/${this.props.logement_id}/chambre/`)
                                }}
                            >


                                {({ values, checked, handleSubmit, touched, setFieldValue }) => (
                                    <div>

                                        <Form className="m-12">
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
                                            <label onClick={() => { this.props.saloncloseModal() }} class=" mx-1 simul-btn text-white font-bold py-2 px-4 rounded mt-5">
                                                Annuler
                                            </label>
                                            <button type="submit" class=" mx-3 text-white font-bold py-2 px-4 rounded ">
                                                Enregistrer
                                            </button>

                                        </Form>
                                    </div>
                                )}

                            </Formik>
                        </Modal>
                    ) : null
                }
            </>
        )
    }
}
export default Salonmodal;