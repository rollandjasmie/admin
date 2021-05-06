import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import Navbarextra from '../../Navbar/Navbarextra'
import Navbarextra2 from '../../Navbar/Navbarextra2'
import { GoArrowSmallLeft } from 'react-icons/go';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';
import axios from 'axios'
import history from '../../../../history'
import Loading from '../../../user/Chargement';



class Modifieracces_voyageur extends React.Component{
  state = {
    acces: null,
    aide1: null,
    aide2: null,
    autre: null,
    presentation:null,
    transport:null,
    name: null,
    loading:false
  }
  componentDidMount() {
    const { match: { params } } = this.props
    const fetchData = async () => {
      this.setState({
        loading: !this.state.loading
      })
    const response = await axios.get(`/logements/${params.logement_id}/acces_voyageurs`)
      this.setState({
        acces: response.data.acces.acces,
        aide1: response.data.acces.aide1,
        aide2: response.data.acces.aide2,
        autre: response.data.acces.autre,
        presentation: response.data.acces.presentation,
        transport: response.data.acces.transport
      
    }
    )
    const loge = await
    axios.get(`/logements/${params.logement_id}`)
      this.setState({
        name: loge.data.logement.name,
      })
      this.setState({
        loading: !this.state.loading
      })
    }
     fetchData() 
    
  }
render() { 
  const { match: { params } } = this.props

  return(
  <>
  {
    this.state.loading?(<Loading />):(
          <>
{
  this.state.acces?(
      <Formik
        initialValues={this.state}
        onSubmit={value => {
          const { match: { params } } = this.props
          axios.put(`/logements/${params.logement_id}/acces_voyageurs`, value)
          history.push(`/modifieracces_voyageur/${params.logement_id}`)
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
                <h1 className="w-2/3 text-xl font-bold text-gray-700">Accès aux voyageurs</h1>
                <p className="pt-3 text-base text-gray-700">Indiquez aux voyageurs les parties du logement auxquelles ils auront acccès</p>
                <div className="w-2/3 text-lg py-4">

                  <Field name="acces" className="appearance-none block  bg-gray-200 text-gray-700 border border-gray-200 rounded py-3
                          px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 w-2/4" type="text" placeholder="Logement entièrement dédié aux voyageurs">
                  </Field>
                </div>

                <div className="w-2/3 text-lg pt-3 ">
                  <h1 className=" font-bold text-gray-700">Intéraction avec les voyageurs</h1>
                  <p className="pt-3 text-base text-gray-700">Indiquez aux voyageurs si vous pouvez leur apporter votre aide  tout au long de leur séjour</p>
                  <div className="flex w-full pt-3">
                    <div className="">
                      <div className="w-full flex px-5 my-2">
                        <Field type="radio" name="aide1" value="Je prévois d'échanger avec mes voyageurs" className=" mr-3"></Field>
                        <label className="w-full flex mt-2 text-gray-600 text-sm">
                          Je prévois d'échanger avec mes voyageurs
                            </label>
                      </div>
                      <div className="w-full flex px-5 my-2">
                        <Field type="radio" name="aide1" value="Je suis discret mais je reste disponible pour mes voyageurs en cas de besoin" className=" mr-3"></Field>
                        <label className="w-full flex mt-2 text-gray-600 text-sm">
                          Je suis discret mais je reste disponible pour mes voyageurs en cas de besoin
                            </label>
                      </div>
                      <div className="w-full flex px-5 my-2">
                        <Field type="radio" name="aide1" value="Je ne serais pas présent en personne" className=" mr-3"></Field>
                        <label className="w-full flex mt-2 text-gray-600 text-sm">
                          Je ne serais pas présent en personne
                            </label>
                      </div>
                      <div className="w-full flex px-5 my-4">
                        <Field name="aide2" component="textarea" className="appearance-none block  bg-gray-200 text-gray-700 border border-gray-200 rounded py-3
                              px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 w-full text-sm " placeholder="Services PLUS gratuit : Pour un séjour réussi et des vacances sans souci, nous avons
                              mis en place un partenariat avec Runbnb conciergerie. Ainsi dès que votre réservation
                              est enregistrée, vouz recevrez un mail avec les coordonnées du Runbnb qui pourra si
                              vous le souhaitez vous accompagner pour préparer votre arrivée et votre séjour (tous
                              conseils & réservations loisirs, spectacles, randonnées, visite, etc...)" >
                        </Field>
                      </div>

                    </div>
                  </div>

                </div>
                <div className="pt-3">
                  <h1 className="w-2/3 text-xl font-bold text-gray-700">Autres remarques</h1>
                  <p className="pt-3 text-base text-gray-700">Indiquez aux voyageurs d’autres détails que vous jugez utiles</p>
                  <Field name="autre" component="textarea" className="appearance-none block  bg-gray-200 text-gray-700 border border-gray-200 rounded py-3
                         px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 w-1/3 text-sm mt-5" placeholder="Services PLUS gratuit : Pour un séjour réussi et des vacances sans souci, nous avons
                         mis en place un partenariat avec Runbnb conciergerie. Ainsi dès que votre réservation
                         est enregistrée, vouz recevrez un mail avec les coordonnées du Runbnb qui pourra si
                         vous le souhaitez vous accompagner pour préparer votre arrivée et votre séjour (tous
                         conseils & réservations loisirs, spectacles, randonnées, visite, etc...)" >
                  </Field>
                </div>
                <hr className="my-5 w-1/2"></hr>
                <div className="pt-1">
                  <h1 className="w-2/3 text-xl font-bold text-gray-700">
                    Quartier
                </h1>
                  <p className="pt-3 text-sm text-gray-700">
                    Présentation
                </p>
                  <p className="pt-2 text-sm text-gray-500">
                    Parlez de votre quartier à vos voyageurs en France, et expliquez ce qui le rend unique .
                </p>
                  <Field name="presentation" component="textarea"
                    className="appearance-none block  bg-gray-200 text-gray-700 border border-gray-200 rounded py-3
                         px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 w-1/3 text-sm mt-3"

                  ></Field>

                </div>
                <div className="pt-5">
                  <h1 className="w-2/3 text-xl font-bold text-gray-700">
                    Transport
                </h1>
                  <p className="pt-3 text-sm text-gray-700">
                    Vous pouvez indiquez aux voyageurs si le logement est à proximité des transports pubiques (ou éloigné)
                </p>
                  <p className="text-sm text-gray-700">
                    Vous pouvez aussi également signaler les possibilités de parking près de chez vous
                </p>
                  <Field name="transport" component="textarea"
                    className="appearance-none block  bg-gray-200 text-gray-700 border border-gray-200 rounded py-3
                         px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 w-1/3 text-sm mt-3"
                    placeholder="Arrêt de bus à proximité, accès voiture facile et rapide ! Situation idéale entre le Nord et le Sud de l'île, grâce à un accès direct àla route des Tamarins"
                  ></Field>

                </div>
                <button className="px-5 py-3 border my-5  text-white rounded hover:font-bold cursor-pointer"> Enregistrer</button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    )
      :null
    }
    </>

    )
  }
  </>
  )
  }
}
export default Modifieracces_voyageur;
