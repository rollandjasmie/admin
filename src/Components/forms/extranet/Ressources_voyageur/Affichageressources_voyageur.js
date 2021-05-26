import React, { Component} from 'react';
import { NavLink } from 'react-router-dom';



class Affichageressources_voyageur extends Component {
    render(){
        return(
            <>
                <div className="w-full bg-white">
                    <div className="flex">
                        <h1 className="w-2/3 text-xl font-bold text-gray-700">Ressources  voyageurs</h1>
                        <NavLink to={`/logements/${this.props.logement_id}/ressources`} >
                                <h2 className="text-theme border-2 sansbg rounded px-4 py-2  hover:text-white text-base">Modifier</h2>
                        </NavLink>                     
                    </div>

                    <div className="py-4 flex ">
                        <div className="w-1/3 py-1">
                            <h1 className=" text-gray-600 text-sm">visible uniquement par les voyageurs ayant une réservation</h1>
                        </ div>
                    </div>
                </div> 
            </>
        ) 
    }
}
export default  Affichageressources_voyageur;