import React from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Navbarextra from "../../Navbar/Navbarextra";
import Navbarextra2 from "../../Navbar/Navbarextra2";


class Home extends React.Component {
  state={
    total_arriver: 0,
    total_depart: 0,
    total_active: 0,
    totaux_day: 0,
    demande_total:0,
    not_read:0
  }
   componentDidMount(){
    const { match: { params } } = this.props
    axios.post(`/logements/${params.logement_id}/recap`,{now:0}).then(reponse=>{
      this.setState({
      total_arriver: reponse.data.total_arriver,
      total_depart: reponse.data.total_depart,
      total_active: reponse.data.total_active,
      totaux_day: reponse.data.totaux_day,
      demande_total: reponse.data.demande_total
      })
      console.log(params)
    })
      
     axios.get(`/messages/${params.logement_id}/msg_n`).then(reponse=>{
      this.setState({
          not_read:reponse.data.not_read
      })
    })
   }
 
   change(e){
    const { match: { params } } = this.props
     axios.post(`/logements/${params.logement_id}/recap`,{now:e.target.value}).then(reponse=>{
      this.setState({
      total_arriver: reponse.data.total_arriver,
      total_depart: reponse.data.total_depart,
      demande_total: reponse.data.demande_total,
      totaux_day: reponse.data.totaux_day
      })
       console.log(params)
    })
      console.log(e.target.value)
      console.log(this.state.total_depart)
   }

   render (){
     const { match: { params } } = this.props;

    return (
      <div className="w-full bg-white h-full mb-5">
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

        <div className="flex justify-center items-center mx-3 mt-5 mx-5">
              <h1 className="text-gray-600 text-sm font-bold w-1/3 flex items-center">Récapitulatif des réservations</h1>
              <label >
                <select className="w-64 flex justify-center items-center mx-5 text-sm text-orange-500 border-2 border-orange-500 bg-white h-12 text-center rounded  break-all" onChange={(e)=>{this.change(e)}}>
                  <option className=" mx-5 text-sm text-gray-600 h-10  px-3 break-all" value = "0" >Aujourd’hui</option>
                  <option className=" mx-5 text-sm text-gray-600 h-10  px-3 break-all" value = "-1">Semaine précédente</option>
                  <option className=" mx-5 text-sm text-gray-600 h-10  px-3 break-all" value = "1">Semaine prochaine</option>
                  <option className=" mx-5 text-sm text-gray-600 h-10  px-3 break-all" value = "2" >Mois prochain</option>
                </select>
              </label>
              <NavLink to= {`/logements/${params.logement_id}/reservation_extra`} className="w-1/3 flex justify-end items-center text-gray-500  text-sm font-medium cursor-pointer">
              <h2 className="flex justify-end items-center text-gray-500  text-sm font-medium">Voir toutes les réservations</h2>
              </NavLink>
        </div>
              <hr className="mt-2 w-11/12 mx-5"></hr>
            <div className="flex justify-center bg-white">
            <div className="  w-2/3 my-5 border mx-5">
             
                  <div className="flex justify-center h-20 border-b my-5">
                    <label className="text-lg  text-center text-gray-600 w-2/12">
                          Arrivée
                          <p className="border-b-2  border-blue-500 h-12 my-1">{this.state.total_arriver}</p>
                    </label>
                    <label className="text-lg text-center text-gray-600 w-2/12">
                         Départ
                          <p className="  h-12 my-1">{this.state.total_depart}</p>
                    </label>

                    <label className="text-lg text-center text-gray-600 w-3/12">
                          Séjour en cours
                           <p className="  h-12 my-1">{this.state.totaux_day}</p>
                    </label>

                    <label className="text-lg text-center text-gray-600 w-3/12">
                          Demande des clients
                          <p className="  h-12 my-1">{this.state.demande_total}</p>
                    </label><br></br>
                    </div>
                    <h2 className=" flex justify-center items-center text-gray-500  text-sm mb-5">Aucune arrivée prévue à la période sélectionnée</h2>
              </div>
              </div>
        <div className="h-56 bg-white">
          <div className="flex justify-center">
              <div className="w-11/12 flex justify-center items-center  mt-5 h-18">
                      <h1 className="text-gray-600 text-sm font-bold w-1/2 flex items-center">Dernières réservations</h1>
                    <NavLink to= {`/logements/${params.logement_id}/reservation_extra`} className="w-1/2 flex justify-end items-center text-gray-500  text-sm font-medium cursor-pointer">
                      <h2 className="w-1/2 flex justify-end items-center text-gray-500  text-sm font-medium">Voir toutes les réservations</h2>
                      </NavLink>
              </div>
           </div>
          <hr className="mt-4 w-11/12 mx-5"></hr>
          <h2 className=" flex justify-center  text-gray-500 my-5 text-sm ">{this.state.total_active} réservation effectuée dans les 15 derniers jours</h2>
        </div>
        <div className="h-64 bg-white">
          <div className="flex justify-center">
              <div className="w-11/12 flex justify-center items-center  mt-5 h-18">
                      <h1 className="text-gray-600 text-sm font-bold w-1/2 flex items-center">Nouveau message non lu</h1>
                    <NavLink to= {`/logements/${params.logement_id}/message`}  className="w-1/2 flex justify-end items-center text-gray-500  text-sm font-medium cursor-pointer">
                      <h2 className="flex justify-end items-center text-gray-500  text-sm font-medium">Voir tous les messages</h2>
                      </NavLink>
              </div>
           </div>
          <hr className="mt-4 w-11/12 mx-5"></hr>
          <h2 className=" flex justify-center  text-gray-500 my-5 text-sm ">{this.state.not_read} nouveau message</h2>
        </div>
      </div>
    );
  }
}

export default Home;
