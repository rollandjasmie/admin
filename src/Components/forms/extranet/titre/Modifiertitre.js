import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import Navbarextra from "../../Navbar/Navbarextra";
import Navbarextra2 from "../../Navbar/Navbarextra2";
import { GoArrowSmallLeft } from "react-icons/go";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

import { NavLink } from 'react-router-dom';
import history from '../../../../history'
import Loading from "react-loading";


class Modifiertitre extends React.Component {
  state = {
    description: null,
    unique: null,
    name: null,
    loading: false
  };
  componentDidMount() {
    const {
      match: { params },
    } = this.props;
    axios.get(`/logements/${params.logement_id}`).then((response) => {
      this.setState({
        name: response.data.logement.name,
        description: response.data.logement.description,
        unique: response.data.logement.unique,
        })
      }
      )
  }

  render() {
    const { match: { params } } = this.props

    return(
      <>
        {
          this.state.loading ?(<Loading />):(
            <>
        {
          this.state.name?(
        <Formik

          initialValues={this.state}
          onSubmit={value => {
            const fetchData = async () => {
              this.setState({
                loading: !this.state.loading
              })
              const { match: { params } } = this.props
              await
                axios.put(`/logements/${params.logement_id}`, value)
              history.push(`/modifiertitre/${params.logement_id}`)
            }
            fetchData()
          }
          }>
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

              <div className="w-full px-5 ">
                <div className="">
                  <h1 className="w-2/3 text-base font-bold text-gray-700">Titre et description </h1>
                  <p className="pt-3 text-sm text-gray-700">Ajoutez un titre et une description pour aider les voyageurs à se représenter ce que sera leur séjour dans votre hébergement</p>
                  <div className="w-2/3 text-lg pt-5 px-5">
                    <h1 className=" font-bold text-base text-gray-700">Titre  :</h1>
                    <p className="pt-3 text-sm text-gray-700">Le titre de votre annonce doit mettre en valeur ce qui fait la particularité de votre logement</p>
                    {
                      this.state.name ? (
                        <Field name="name" required className="my-4 appearance-none block text-base bg-gray-200 text-gray-700 border border-gray-200 rounded py-3
                              px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 w-2/4" type="text" placeholder="titre"></Field>
                      ) : null
                    }
                  </div>
                  <div className="w-2/3 text-lg pt-3 px-5">
                    <h1 className=" font-bold text-base text-gray-700">Description de l'hébergement :</h1>
                    <p className="pt-3 text-sm text-gray-700">La description de votre hébergement doit permettre aux voyageurs de s'imaginer ce que serait le séjour chez vous</p>
                    {
                      this.state.name ? (
                        <Field name="description" className="my-4 text-base appearance-none block  bg-gray-200 text-gray-700 border border-gray-200 rounded py-3
                        px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 w-3/4 h-auto" component="textarea" placeholder="Superbe T2 avec terrasse  et vue  sur la mer à 180° en
                        entiérement "></Field>
                      ) : null
                    }
                    <hr className="my-5"></hr>
                  </div>

                  <h1 className="px-5  font-bold text-base text-gray-700">L'hébergement :</h1>
                  <p className="pt-3 px-5 text-sm text-gray-700">Expliquez ce qui rend votre hébergement unique</p>
                  {this.state.name ? (
                    <Field name="unique" className="text-base mx-5 my-4 appearance-none block  bg-gray-200 text-gray-700 border border-gray-200 rounded py-3
                        px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 w-1/3 h-auto" component="textarea" placeholder="L'appartement La Villa Nath dispode d'une
                        bue exeptionnelle "></Field>
                  ) : null
                  }
                  <button type="submit" className="px-5 py-3 border my-5 mx-5  text-white rounded hover:font-bold cursor-pointer"> Enregistrer</button>
                </div>
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
export default Modifiertitre;
