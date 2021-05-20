import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import '../../../App.css'

class Navbarextra2 extends Component {
   
    render() {
  const id = this.props.logement_id
      return (
          <>
          <header className="text-gray-700 bg-white">
          <div className="flex w-full h-16 bg-blue-500" >
                <NavLink to={`/logements/${id}/Home`} activeClassName="active" className="navex h-full w-2/12  hover:font-bold flex justify-center cursor-pointer ">
                    <div>
                        <h1 className="text-sm text-white pt-4 ">Accueil</h1>
                    </div>
                </NavLink>
               
                {/* </NavLink> */}
                <NavLink to={`/logements/${id}/calendrier`} activeClassName="active" className="navex h-full w-2/12  hover:font-bold flex justify-center cursor-pointer ">
                    <div className="">
                        <h1 className="text-sm text-white pt-4 ">Tarif et Calendrier</h1>
                    </div>
                </NavLink>
                <NavLink to={`/logements/${id}/promotion`} activeClassName="active" className="navex h-full w-2/12 flex justify-center cursor-pointer ">
                    <div >
                        <h1 className="text-sm text-white pt-4 ">Promotions</h1>
                    </div>
                </NavLink>
                {/* <NavLink> */}
                <NavLink to={`/logements/${id}/reservation_extra`} activeClassName="active" className="navex h-full w-2/12  hover:font-bold flex justify-center cursor-pointer ">
                    <div>
                        <h1 className="text-sm text-white pt-4 ">Réservation</h1>
                    </div>
                </NavLink>
                {/* <NavLink> */}
                <NavLink to={`/extraheb/${id}`} activeClassName="active" className="navex hover:font-bold h-full w-2/12 flex justify-center cursor-pointer ">
                    <div >
                        <h1 className="text-sm text-white pt-4 ">Hébergement</h1>
                    </div>
                  </NavLink>  
                {/* </NavLink> */}
                    <NavLink to={`/logements/${id}/message`} activeClassName="active"  className="navex h-full w-2/12  hover:font-bold flex justify-center cursor-pointer ">
                    <div >
                        <h1 className="text-sm text-white pt-4 ">Boite de réception</h1>
                    </div>
                    </NavLink >
                      <NavLink to={`/compta/${id}`}   className="navex h-full w-2/12  hover:font-bold flex justify-center cursor-pointer ">
                    <div>
                        <h1 className="text-sm text-white pt-4 ">Comptabilité</h1>
                    </div>
                    </NavLink>
                    <NavLink to={`/logements/${id}/commentaire`}  className="navex h-full w-2/12  hover:font-bold flex justify-center cursor-pointer ">
                        <div>
                            <h1 className="text-sm text-white text-center pt-4 ">Commentaire  clients</h1>
                        </div>
                    </NavLink>
                   
                 </div>  
          </header>
           

          </>
        )
    }
}


export default Navbarextra2;