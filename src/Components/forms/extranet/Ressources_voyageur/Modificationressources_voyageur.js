import React, { Component} from 'react';
import { Formik, Form, Field } from 'formik';
import Navbarextra from '../../Navbar/Navbarextra'
import Navbarextra2 from '../../Navbar/Navbarextra2'
import { GoArrowSmallLeft } from 'react-icons/go';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';
import axios from 'axios'
import history from '../../../../history'
import Loading from '../../../user/Chargement';


class Ressources extends Component{
    state={
        ressources:null,
        name: null,
    }
    componentWillMount() {
        const { match: { params } } = this.props
        axios.get(`/logements/${params.logement_id}/ressouce_voyageurs`).then(response => {
            this.setState({
                ressources:response.data.ressources.title
            })
            console.log(response)
        })
        axios.get(`/logements/${params.logement_id}`).then((response) => {
            this.setState({
                name: response.data.logement.name,
            })
        }
        )
    }
    
    render(){
        const { match: { params } } = this.props

        return (
         <>
            {
                this.state.loading?(<Loading />):(
                        <>
                {
                    this.state.ressources?(
                <Formik
                    initialValues={this.state}
                    onSubmit={value => {
                        const fetchData = async () => {
                            this.setState({
                                loading: !this.state.loading
                            })
                            const { match: { params } } = this.props
                            await
                                axios.put(`/logements/${params.logement_id}/ressouce_voyageurs`, value)
                            history.push(`/logements/${params.logement_id}/ressources`)
                        }

                        fetchData()
                    }
                    }
                >
                    {({ values, errors, handleSubmit, touched, setFieldValue }) => (

                        <Form onSubmit={handleSubmit}>
                            <div className="">
                                <Navbarextra logement_id={params.logement_id} />
                            </div>
                            <div className="h-24">
                                <Navbarextra2 logement_id={params.logement_id} />
                            </div>
                            {
                                this.state.name ? (
                                    <NavLink to={`/extraheb/${params.logement_id}`}>
                                        <label className=" px-4 py-5 text-gray-600 text-sm text-blue-500 hover:text-blue-700 hover:font-bold flex " >
                                            <GoArrowSmallLeft className="w-10 h-10" /><span className="py-2 px-3 text-base"  > Retour à la modification de la {this.state.name} </span>
                                        </label>
                                    </NavLink>
                                ) : null
                            }
                            <div className="mx-5">
                                <h1 className="w-2/3 text-xl font-bold text-gray-700">Réssources  voyageurs</h1>
                                <p className=" text-sm font-bold text-gray-600 py-3" >Information dont auront besoin les clients durant leur séjour</p>
                                <div className="w-2/3 text-lg py-4">

                                    <Field component="textarea" name="ressources" className="appearance-none block text-base bg-gray-200 text-gray-700 border border-gray-200 rounded py-3
                                                px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 w-2/4" placeholder="Logement entièrement dédié aux voyageurs">
                                    </Field>
                                </div>
                                <button className="px-4 py-2 border my-5 text-white rounded hover:font-bold cursor-pointer"> Enregistrer</button>
                            </div>
                        </Form>
                    )}
                </Formik>
                    ):null
                }
            </>
                )
            }
         </>
        )
    }

}

export default Ressources;