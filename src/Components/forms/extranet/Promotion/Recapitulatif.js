import React, { Component} from 'react'
import Navbarextra from '../../Navbar/Navbarextra'
import { NavLink } from 'react-router-dom';
import axios from 'axios'
import moment from 'moment'
import 'moment/locale/fr-ca';
import history from '../../../../history'

import Navbarextra2 from '../../Navbar/Navbarextra2'


class Affichage extends Component {
  constructor(props){
      super(props)
      this.state={
          re: props.formValue.recapu
      }
  }
  componentDidMount(){ 
      console.log(this.state)}
 save=()=>{
     const asy = async () => {
 const data={
         datedebut: moment(this.state.re.debut1).format("L"),
         datefin: moment(this.state.re.fin1).format("L"),
         datevuedebut: moment(this.state.re.debut2).format("L"),
         datevuefin: moment(this.state.re.fin2).format("L"),
         name_promotion: this.state.re.name_promotion,
         reduction: this.state.re.reduction,
         temps: this.state.re.temps,
         types: this.state.re.types,
     }
     console.log(data);
     await axios.post(`/logements/${this.props.logement_id}/promotions`,data)
     history.push(`/logements/${this.props.logement_id}/promotion`)
     }
     asy();
 }
    render (){

        return(
            <div className="">
                <div className="">
                    <div className="">
                        <Navbarextra logement_id={this.props.logement_id} />
                    </div>
                    <div className="h-24 ">
                    <Navbarextra2 logement_id={this.props.logement_id} />
                    </div>
                </div>


                <h1 className="mx-5 text-sm font-bold text-gray-600">Récapitulatif de la promotion</h1>

                <div className="w-7/12 bg-gray-200 mx-5 my-4 ">
                    <div className="flex mx-5 py-4">
                    <h1 className="w-1/2 font-medium text-base text-gray-700">Nom</h1>
                    <p className="text-base text-gray-700">{this.state.re.name_promotion}</p>
                    </div>
                    <hr></hr>
                    <div className="flex mx-5 py-4">
                    <h1 className="w-1/2 font-medium text-base text-gray-700">Réduction </h1>
                        <p className="text-base text-gray-700">{this.state.re.reduction}% de réduction</p>
                    </div>
                    <hr></hr>
                    <div className="flex mx-5 py-4 ">
                        <h1 className="w-1/2 font-medium text-base text-gray-700">Détails</h1>
                        <label className=" block">
                            <p className="text-sm font-bold text-gray-700">{this.state.re.types}</p>
                            <p className="text-sm text-gray-700">Réservable du {this.state.re.datevuedebut}  au  {this.state.re.datevuefin}</p>
                            <p className="text-sm text-gray-700">Séjour minimum : {this.state.re.temps} jours</p>
                            <p className="text-sm text-gray-700">Correspond au tarif sélectionné</p>
                        </label>
                    </div>
                    <hr></hr>
                    <div className="flex mx-5 py-4">
                    <h1 className="w-1/2 font-medium text-base text-gray-700">Dates de séjour</h1>
                        <p className="text-sm text-gray-700">{this.state.re.datedebut} -  {this.state.re.datefin}</p>
                    </div>
                    <hr></hr>
                </div>


                <div className="flex">
                    <label className="w-32 h-10 mx-5 my-5 border-2 rounded px-3 py-2 sansbg  text-theme hover:text-white
                                        hover:font-bold justify-center flex items-center" onClick={this.props.previousStep}>Modifier</label>
                    <label className="w-56 h-10  my-5 border-2 rounded px-3 py-2 sansbg  text-theme hover:text-white
                                        hover:font-bold justify-center flex items-center" onClick={this.save}>Ouvrir la promotion</label>
                 </div>
            </div>
        )
    }
}
export default Affichage; 