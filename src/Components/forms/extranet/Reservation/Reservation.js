import React from "react";
import { Formik, Form, Field } from "formik";
import history from "../../../../history";

import "../../../forms/HomePage.css";
import Navbarextra from "../../Navbar/Navbarextra";
import Navbarextra2 from "../../Navbar/Navbarextra2";
import axios from "axios";
import { NavLink } from "react-router-dom";
import '../../HomePage.css'
import moment from 'moment'
import 'moment/locale/fr-ca';
import Loading from "react-loading";

class Reservation extends React.Component {
    state={
        showfiltre :false,
        filtre:{
          debut: "",
          fin: "",
          type: "arrivee",
          status:"",
          fac:""
        },
      resultat:null,
      tout:true,
      loading:false
    }
    componentDidMount() {
      const { match: { params } } = this.props
      const asy = async ()=>{
        this.setState(
          {
            loading:true
          })
        await axios.get(`/logements/${params.logement_id}/reservations`).then(response => 
          this.setState(
                {
                reservation:response.data.reservation,
                user: response.data.user
                }
             )
            )
        this.setState(
          {
            loading: false
          })
      }
      asy()
    }   
    

    render() {
    const {match: { params }} = this.props;
    const { reservation,user } =this.state
    const { resultat, reponseuser }=this.state

    let  reservations=[]
    let resulatt=[]

      resultat && resultat.map(re => {
        return resulatt.push({ ...re })
      }
      )

      reservation && reservation.map(re =>{
        return reservations.push({...re})
        }
      )

      resulatt && resulatt.map(reserv => {
        return reserv.user_name = reponseuser.find(use => use.id === reserv.user_id).name
      }
      )
      reservations && reservations.map( reserv=>{
         return reserv.user_name=user.find(use => use.id === reserv.user_id).name
        }
      )
    
    return (
      <>
        <div className="w-full bg-white">
        <div>
                <div>
                        <div className="">
                            <Navbarextra logement_id={params.logement_id} />
                        </div>
                        <div className="h-24">
                        <Navbarextra2 logement_id={params.logement_id} />
                        </div>
                </div>

            </div>

        </div>
        <label className=" mx-5 my-5 w-11/12">
          <h1 className="text-base text-gray-600 font-medium cursor-pointer" onClick={() => {history.push(`/logements/${params.logement_id}/reservation_extra`)}}>Réservation</h1>
        <hr className=" my-3"></hr>
        </label>

       <Formik
          initialValues={this.state.filtre}

          onSubmit={value => {
            console.log(value)
            const async= async ()=>{
              this.setState({tout:false,loading:true});
              await axios.post(`/logements/${params.logement_id}/recherche/reservation`, {
                type:value.type,
                arrivee: moment(value.debut).locale("fr-ca").format('L'),
                depart: moment(value.fin).locale("fr-ca").format('L'),
                status:value.status,
                autre:value.fac
              }).then(response =>{
                this.setState({ resultat: response.data.reservation, reponseuser: response.data.reponseuser})
              });
              this.setState({loading: false });
            };
            async();
            // history.push(`/logements/${params.logement_id}/modifier_frais`)

          }}
       >
          {({ values, errors, handleSubmit, touched, setFieldValue }) => (
            <Form onSubmit={handleSubmit}>
              <div className="flex mx-5 w-1/2">
                <div className="h-20 mr-4 ">
                  <h1 className="text-sm text-gray-500 text-center">
                    Date de
                </h1>
                  <br></br>
                  <Field  as="select" name="type" className="h-10 w-48 border bg-gray-200 rounded-xl px-5 text-gray-500 text-center">
                    <option value="arrivee">Arrivée</option>
                    <option value="depart">Départ</option>
                  </Field>
                </div>
                <div className="h-20 mr-4">
                  <h1 className="text-sm text-gray-500 text-center">
                    Du
                </h1>
                  <br></br>
                  <Field required name="debut" type="date" className="h-10 w-48 border  text-gray-500 bg-gray-200 rounded-xl  text-center" ></Field>
                </div>
                <div className="h-20 mr-4">
                  <h1 className="text-sm text-gray-500 text-center">
                    Au
                </h1>
                  <br></br>
                  <Field required name="fin" type="date" className="h-10 w-48 border bg-gray-200 rounded-xl  text-gray-500 text-center" ></Field>
                </div>
                <div className="h-20 mr-4  " onClick={() => { this.setState({ showfiltre: !this.state.showfiltre }) }}>
                <h1 className="text-sm text-white text-center">
                    Au
                </h1>
                  <br></br>
                  <h1 className="rounded-xl border bg-gray-200 h-10 w-48 text-sm text-gray-500 justify-center flex items-center"  >Plus de filtre</h1>

                </div>
                <div className="h-20 mr-4  ">

                <h1 className="text-sm text-white text-center">
                    Au
                </h1>
                  <br></br>
              <button type="submit" className="border rounded-xl  hover:font-bold h-10 w-40 text-sm text-white justify-center flex items-center ">Voir</button>
                </div>
              </div>
              { this.state.showfiltre ? (
                <div className="my-5 mx-5 w-11/12 h-56 bg-gray-200 flex" filtre={this.state.filtre} showfiltre={this.state.showfiltre}>
                  <div className="mx-5 py-4">
                    <h1 className="text-sm text-gray-700  ">Status de la réservations</h1>
                    <div className="flex my-3">
                      <Field name="status" value="accepter" type="radio" className="h-10 flex items-center"></Field>
                      <p className="text-gray-600 text-sm mx-2 h-10 flex items-center ">Ok</p>
                    </div>
                    <div className="flex">
                      <Field name="status" value="annuler" type="radio" className="h-10 flex items-center"></Field>
                      <p className="text-gray-600 text-sm mx-2 h-10 flex items-center ">Annulée</p>
                    </div>

                  </div>
                  <div className="mx-5 py-4">
                    <h1 className="text-sm text-gray-700  ">Communication</h1>
                    <div className="flex my-3">
                      <Field name="status"  value="En attente" type="radio" className="h-10 flex items-center"></Field>
                      <p className="text-gray-600 text-sm mx-2 h-10 flex items-center ">Demande en attente</p>
                    </div>

                  </div>
                 
                </div>
              ) : (null)
            } 
            </Form>
          )}   
      </Formik>       



        <table className="tab divide-y divide-gray-200 my-5 mx-2 w-11/12">
          <thead>
            <tr>
              <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
              Nom du client
              </th>
              <th className=" text-center flex-nowrap w-1/12  py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Arrivée
              </th>
              <th className=" text-center flex-nowrap w-1/12  py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Départ
              </th>
              <th className=" text-center flex-nowrap w-1/12  py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Date de réservation
              </th>
              <th className=" text-center flex-nowrap w-1/12  py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Status 
              </th>
              <th className=" text-center flex-nowrap w-1/12  py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Tarif
              </th>
              <th className=" text-center flex-nowrap w-1/12  py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Commission
              </th>
              <th className=" text-center flex-nowrap w-1/12  py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Numéro de réservation
              </th>
            </tr>
          </thead>
          {
            this.state.loading?(
              <Loading />
            ):(
                  <>
                  {
                    this.state.resultat ? (
                      <>
                        {
                          resulatt && resulatt.map(reservation => (
                            <tbody className="bg-white divide-y divide-gray-200" key={reservation.id}>
                              <tr>
                                <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-800">
                                    <NavLink to={`/logements/${params.logement_id}/details_reservation/${reservation.id}`}>
                                      {reservation.user_name}
                                    </NavLink>
                                  </span><br />
                                  <span className="px-2 inline-flex text-xs leading-5 font-medium rounded-full text-gray-600">
                                    {reservation.nombre_personne} personnes
                        </span>
                                </td>
                                <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-800">
                                    {moment(reservation.arrivee).format("LL")}
                                  </span>
                                </td>
                                <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-800">
                                    {moment(reservation.depart).format("LL")}
                                  </span>
                                </td>
                                <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-800">
                                    {moment(reservation.created_at).format("LL")}
                                  </span>
                                </td>
                                <td className="text-center flex-nowrap break-all w-1/12  py-4  text-sm leading-5 text-gray-500">
                                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-red-600">
                                    {reservation.status}

                                  </span>
                                </td>
                                <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-800">
                                    {reservation.tarif} €
                        </span>
                                </td>
                                <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-800">
                                    {reservation.commission}€
                        </span>
                                </td>
                                <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-blue-700">
                                    {reservation.idreservation}
                                  </span>
                                </td>
                              </tr>
                            </tbody>

                          )
                          )
                        }
                      </>
                    ) : (null
                      )
                  }
                  {
                    this.state.tout ? (

                      <>
                        {
                          this.state.reservation ? (
                            <>
                              {
                                reservations && reservations.map(reservation => (
                                  <tbody className="bg-white divide-y divide-gray-200" key={reservation.id}>
                                    <tr>
                                      <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-800">
                                          <NavLink to={`/logements/${params.logement_id}/details_reservation/${reservation.id}`}>
                                            {reservation.user_name}
                                          </NavLink>
                                        </span><br />
                                        <span className="px-2 inline-flex text-xs leading-5 font-medium rounded-full text-gray-600">
                                          {reservation.nombre_personne} personnes
                                        </span>
                                      </td>
                                      <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-800">
                                          {moment(reservation.arrivee).format("LL")}
                                        </span>
                                      </td>
                                      <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-800">
                                          {moment(reservation.depart).format("LL")}
                                        </span>
                                      </td>
                                      <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-800">
                                          {moment(reservation.created_at).format("LL")}
                                        </span>
                                      </td>
                                      <td className="text-center flex-nowrap break-all w-1/12  py-4  text-sm leading-5 text-gray-500">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-red-600">
                                          {reservation.status}

                                        </span>
                                      </td>
                                      <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-800">
                                          {reservation.tarif} €
                                        </span>
                                      </td>
                                      <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-800">
                                          {reservation.commission}€
                                        </span>
                                      </td>
                                      <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-blue-700">
                                          {reservation.idreservation}
                                        </span>
                                      </td>
                                    </tr>
                                  </tbody>

                                )
                                )
                              }
                            </>

                          ) : null
                        }
                      </>

                    ) : null
                  }
                  </>
            )
          }  
        </table>
      </>
    );
  }
}

export default Reservation;
