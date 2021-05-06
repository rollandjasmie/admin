import React  from "react";
import "../../../forms/HomePage.css";
import Navbarextra from "../../Navbar/Navbarextra";
import Navbarextra2 from "../../Navbar/Navbarextra2";
import axios from "axios";
import moment from 'moment';
import { NavLink } from "react-router-dom";
import '../../HomePage.css'
import { GoArrowSmallLeft } from 'react-icons/go';
import { AiOutlineClockCircle } from 'react-icons/ai'
import { VscSignIn } from 'react-icons/vsc';
import { VscSignOut } from 'react-icons/vsc';
import image1 from '../../../../assets/images/icon_accueil.png'
import image2 from '../../../../assets/images/icon_départ.png'
import image3 from '../../../../assets/images/icon_la_carte.png'
import image4 from '../../../../assets/images/icon_linge.png'
import image5 from '../../../../assets/images/icon_Ménage.png'
import image6 from '../../../../assets/images/icon_Photo.png'
import * as Moment from 'moment';
import { extendMoment } from 'moment-range';
import Loading from "react-loading";
import Calendar_modif from './Calendar_modif'

const moment1 = extendMoment(Moment);
class Details_reservation extends React.Component {
    state={
        showfiltre :false,
        loading :false               
    }
   
    componentDidMount(){

      const asy = async ()=>{
        
        const { match: { params } } = this.props;

        this.setState({
          loading:true

        })
        await axios.get(`/logements/${params.logement_id}/reservations/${params.id}`).then(response=>{
          this.setState({
            reservation:response.data.reservation,
            user:response.data.user,
            caution: response.data.caution,
            frais_suple: response.data.frais_suple
          })
        })
        this.setState({
          loading: false
        })
      }
      asy()
    }

  
   envoyer(){
    const { match: { params } } = this.props;
   axios.post(`/reservations/${params.logement_id}/${this.state.user.id}`)
   alert("Demander l’annulation de cette réservation envoyer")
   }

  render() {
    
    const {match: { params }} = this.props;
    let caution = null
    if (this.state.caution) {
      caution = parseInt(this.state.caution.montant)
    }
    let frais = null
    this.state.frais_suple && this.state.frais_suple.map(frai =>{
      return  frais += (parseInt(frai.montant))  
    }
    )
    const tab = [];
    if (this.state.reservation) {
      var start = new Date(this.state.reservation.arrivee)
      var end = new Date(this.state.reservation.depart)


      while (start <= end) {
        tab.push(moment1(start));
        var newDate = start.setDate(start.getDate() + 1);
        start = new Date(newDate);
      }
    }
     
     function printDiv(divName,iframe){
    var content = document.getElementById(divName);
    var pri = document.getElementById(iframe).contentWindow;
    pri.document.open();
    pri.document.write(content.innerHTML);
    pri.document.close();
    pri.focus();
    pri.print();

    }
    return (
      <>
      {
        this.state.loading ?(
            <Loading color="orange"/>
        ):
        (
              <>
      { this.state.reservation?(

        <div className=" ">
          <div className="w-full bg-white">
            <div className="h-24">
              <Navbarextra logement_id={params.logement_id} />
            </div>
            <div>
              <Navbarextra2 logement_id={params.logement_id} />
            </div>
          </div>
          <NavLink to={`/logements/${params.logement_id}/reservation_extra`}>
            <label className=" px-4 py-5 text-gray-600 text-sm text-blue-500 hover:text-blue-700 hover:font-bold flex cursor-pointer" >
              <GoArrowSmallLeft className="w-10 h-10" /><span className="py-2 px-3 text-base"  > Retour à la Synthèse de la réservation </span>
            </label>
          </NavLink>
          <label className=" mx-5  w-11/12">
            <h1 className="text-base text-gray-700 font-medium">Détails de la réservation</h1>
            {/* <hr className=" my-3"></hr> */}
          </label>
          <div className="flex mx-5 my-4 w-full h-auto">
            <div className=" w-7/12 ">

              {/* DETAILS */}
              <iframe id="toprint" style={{height: "0", width: "0", position: "absolute"}}></iframe>
              <div id="print" className=" bg-white  shadow flex w-10/12">
                <div className="mx-5 my-5">
                  <div>
                    <h1 className="text-sm font-semibold text-gray-700">Date d'arrivée</h1>
                    <p className="text-sm text-gray-600">{moment(this.state.reservation.arrivee).format("L")}</p>
                  </div>
                  <div className="my-4">
                    <h1 className="text-sm font-semibold text-gray-700">Date de départ</h1>
                    <p className="text-sm text-gray-600">{moment(this.state.reservation.depart).format("L")}</p>
                  </div>
                  <div className="my-4">
                    <h1 className="text-sm font-semibold text-gray-700">durée du séjour </h1>
                    <p className="text-sm text-gray-600">{this.state.reservation.duree} nuits</p>
                  </div>
                   <div className="my-4">
                    <h1 className="text-sm font-semibold text-gray-700">Accepter</h1>
                    <p className="text-sm text-gray-600">{this.state.reservation.duree} nuits</p>
                  </div>

                </div>
                <div className="mx-4 my-5">
                  <div>
                    <h1 className="text-sm font-semibold text-gray-700">Nom du client</h1>
                    <p className="text-sm text-gray-600">{this.state.user.name} {"  "} {this.state.user.first_name}</p>
                  </div>
                  <div className="my-4">
                    <h1 className="text-sm font-semibold text-gray-700">Langue préférée :</h1>
                    <p className="text-sm text-gray-600">Français</p>
                  </div>
                  <div className="my-4">
                    <h1 className="text-sm font-semibold text-gray-700">Numéro de la réservation</h1>
                    <p className="text-sm text-gray-600">{this.state.reservation.idreservation}</p>
                  </div>
                  <div className="my-4">
                    <h1 className="text-sm font-semibold text-gray-700">Reçu</h1>
                              <p className="text-sm text-gray-600">{moment(this.state.reservation.created_at).format("LL")}</p>
                  </div>
                </div>
                <div className="mx-4 my-5">
                  <div>
                    <h1 className="text-sm font-semibold text-gray-700">Montant soumis à commission</h1>
                    <p className="text-sm text-gray-600">{this.state.reservation.montan_total - this.state.reservation.commition_et_frais} €</p>
                  </div>
                  <div className="my-4">
                    <h1 className="text-sm font-semibold text-gray-700">Commission et frais</h1>
                    <p className="text-sm text-gray-600">{this.state.reservation.commition_et_frais} €</p>
                  </div>
                  <div className="my-4">
                    <h1 className="text-sm font-semibold text-gray-700">Montant total</h1>
                    <p className="text-sm text-gray-600">{this.state.reservation.montan_total} €</p>
                  </div>
                </div>
              </div>

              {/* 
                        INFORMATION DE PAIEMENT */}


              <div className="h-48 bg-white  shadow  w-10/12 my-5">
                <label className="my-4 text-sm font-semibold text-gray-700 mx-5">
                  Informations de paiement
                      </label>
                <hr className="w-10/12 mx-5 "></hr>
                <label className="flex  mx-5 my-3">
                  <AiOutlineClockCircle style={{ width: 20, height: 20, }} />
                  <p className="text-sm text-gray-600 font-bold mx-3 ">Virement bancaire</p>
                </label>
                <p className="text-sm text-gray-600 mx-5 my-3">Non éffectuée</p>

              </div>

              {/* FACTURE */}



              <div className=" bg-white  shadow  w-10/12 my-5">
                <div className="flex ">
                  <label className="my-4 mx-5 w-2/3 text-sm font-semibold text-gray-700 ">
                    Détails de la Tarification
                      </label>
                  <label className=" my-4 mx-5 w-1/3 text-sm font-semibold text-gray-700 flex justify-end ">
                    {(frais + caution) + (this.state.reservation.duree * this.state.reservation.tarif)} €
                      </label>

                </div>
                <div className="flex  " >
                  <label className="flex  mx-5 my-3">
                    <VscSignIn style={{ width: 20, height: 20, }} />
                    <p className="text-sm text-gray-600  mx-3 ">{moment(this.state.reservation.arrivee).locale("fr").format("ll")}</p>
                  </label>
                  <label className="flex  mx-2 my-3">
                    <VscSignOut style={{ width: 20, height: 20, }} />
                    <p className="text-sm text-gray-600  mx-3 ">{moment(this.state.reservation.depart).locale("fr").format("ll")} </p>
                  </label>
                </div>
                <hr className="w-10/12 mx-5 my-4 "></hr>
                <div className=" flex">
                  <label className="flex w-1/3 text-sm text-gray-600 mx-5 my-3 justify-center font-bold ">
                    Date
                          </label>
                  <label className="flex w-1/3 text-sm text-gray-600 mx-5 my-3 justify-center font-bold ">
                    Tarif
                          </label>
                  <label className="flex w-1/3 text-sm text-gray-600 mx-5 my-3 justify-center font-bold ">
                    Tarif par nuits
                          </label>
                </div>
                {/* date de sejour */}
                {
                  tab.map(t => (
                    <>
                      <div className=" flex">
                        <label className="flex w-1/3 text-sm text-gray-600 mx-5 my-3 justify-center  ">
                          {t._d.getDate()}-{t._i.getDate()} {t.format("MMM")}  {t._i.getFullYear()}
                        </label>
                        <label className="flex w-1/3 text-sm text-gray-600 mx-5 my-3 justify-center  ">
                          Standard rate
                        </label>
                        <label className="flex w-1/3 text-sm text-gray-600 mx-5 my-3 justify-center  ">
                          {this.state.reservation.tarif} €
                        </label>
                      </div>
                      <hr className="w-10/12 mx-5 "></hr>
                    </>
                  ))
                }

                {/* SOUS-TOTAL */}

                <div className=" flex">
                  <label className="flex w-1/3 text-sm text-gray-600 mx-5 my-3 justify-center font-bold ">
                    Sous-total
                          </label>
                  <label className="flex w-1/3 text-sm text-gray-600 mx-5 my-3 justify-center font-bold ">

                  </label>
                  <label className="flex w-1/3 text-sm text-gray-600 mx-5 my-3 justify-center font-bold ">
                    {this.state.reservation.tarif * this.state.reservation.duree} €
                          </label>
                </div>

                {/* Commission */}
                {
                  this.state.reservation.commission ? (
                    <>
                      < div className=" flex">

                        <label className="flex w-1/3 text-sm text-gray-600 mx-5 my-3 justify-center  ">
                          commission
                          </label>
                        <label className="flex w-1/3 text-sm text-gray-600 mx-5 my-3 justify-center  ">

                        </label>
                        <label className="flex w-1/3 text-sm text-gray-600 mx-5 my-3 justify-center  ">
                          {this.state.reservation.commission}
                          </label>
                      </div>
                      <hr className="w-10/12 mx-5 "></hr>
                    </>
                  ) : null
                }

                {/* TAXES */}

                {this.state.caution ? (
                  <>
                    < div className=" flex">

                      <label className="flex w-1/3 text-sm text-gray-600 mx-5 my-3 justify-center  ">
                        Caution
                    </label>
                      <label className="flex w-1/3 text-sm text-gray-600 mx-5 my-3 justify-center  ">
                        {this.state.caution.type_de_payment}

                      </label>
                      <label className="flex w-1/3 text-sm text-gray-600 mx-5 my-3 justify-center  ">
                        {this.state.caution.montant} €
                    </label>
                    </div>
                    <hr className="w-10/12 mx-5 "></hr>
                  </>
                ) : null
                }
                {
                  this.state.frais_suple && this.state.frais_suple.map(fra => (
                    <>
                      <div className=" flex">
                        <label className="flex w-1/3 text-sm text-gray-600 mx-5 my-3 justify-center  ">
                          {fra.types}
                        </label>
                        <label className="flex w-1/3 text-sm text-gray-600 mx-5 my-3 justify-center  ">
                          {fra.montant} €  {fra.facturation}
                        </label>
                        <label className="flex w-1/3 text-sm text-gray-600 mx-5 my-3 justify-center  ">
                          {fra.montant} €
                          </label>
                      </div>
                      <hr className="w-10/12 mx-5 "></hr>


                    </>
                  ))
                }
                {/* TOTAL */}

                <div className=" flex">
                  <label className="flex w-2/3  text-sm text-gray-600 mx-5 my-3  font-bold ">
                    Tarif total de l’ hébergement
                          </label>
                  <label className="flex text-sm text-gray-600 mx-5 my-3 mr-5  font-bold ">

                  </label>
                  <label className="flex  w-1/3 text-sm text-gray-600 mx-5 my-3 justify-center font-bold mb-5">
                    {this.state.reservation.montan_total} €
                          </label>
                </div>
              </div>


            </div>
            <div className=" w-4/12 ">
              <div className="border w-full rounded bg-white shadow h-90">
                <h1 className="text-sm font-semibold text-gray-700 text-center my-5 ">Mettre à jour cette réservation</h1>
                 <Calendar_modif logement_id={params.logement_id} id={params.id}/>
                < div className="flex justify-center ">
                  <h1 onClick={()=>{printDiv('print','toprint')}} className="border rounded h-10 w-9/12 flex justify-center items-center text-xs text-gray-700  my-3 cursor-pointer">Imprimer cette page </h1>
                </ div>

                < div className="flex justify-center ">
                  <h1 onClick={()=>{this.envoyer()} } className="border rounded h-10 w-9/12 flex justify-center items-center text-xs text-gray-700  my-3 cursor-pointer mb-5"> Demander l’annulation de cette réservation</h1>
                 
                </ div>
              </div>
            </div>
          </div>



        </div>

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

export default Details_reservation;
