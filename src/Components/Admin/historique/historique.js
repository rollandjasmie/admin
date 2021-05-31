import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';


function Home(props) {
    const [historique, setHistorique] = useState(false)
    const [cherche, setCherche] = useState(false)
    useEffect(() => {
        axios.get('/historique/index').then(response => (
            setHistorique(response.data.history)
        ))

    }, [])
console.log(historique)
    // function recherche(e) {
    //     // setCherche({ name: e.target.value })
    // }
    // async function send() {
    //     // if (cherche) {
    //     //     await axios.get(`/compta/${cherche.name}/recherche`).then(response => {
    //     //         setCompta(response.data.comptas)
    //     //     })
    //     // }
    // }
 

    const { isAuthenticated } = props;
    const { user } = props;
    return (
        <>
            
            <div className="flex">
                <div className="w-3/12 h-screen bg-gray-700">
                    <h1 className="bg-gray-800 text-white text-5xl font-bold h-32 flex items-center justify-center"> Runbnb.com </h1>
                    <div className="text-white text-base  h-20 flex items-center justify-center" >
                        <NavLink to={'/user/all'}>
                            Utilisateurs
                        </NavLink>
                    </div>
                    <div className="text-white text-base  h-20 flex items-center justify-center">
                        <NavLink to={'/logements/all'}>
                            Logements
                        </NavLink>
                    </div>
                    {
                        user.niveau === "2" ? (
                            <>
                                <div className="text-white text-base  h-20 flex items-center justify-center">
                                    <NavLink to={'/admin'}>
                                        Admin
                                    </NavLink>
                                </div>
                                <div className="text-white text-base font-bold h-20 flex items-center justify-center bg-indigo-500 bg-opacity-25 border-r-4 border-red-500">
                                    <NavLink to={'/comptabilite'}>
                                        Comptabilité
                                    </NavLink>
                                </div>
                                <div className="text-white text-base  h-20 flex items-center justify-center">
                                    <NavLink to={'/historique'}>
                                        Historique
                                    </NavLink>
                                </div>
                            </>
                        ) : null
                    }
                </div>
                <div className="w-full my-5">
                    {/* <div>
                        <select className=" w-40 h-10 mx-4 rounded leading-tight text-xs bg-gray-300 border border-gray-200 text-gray-700  focus:outline-none focus:bg-white focus:border-gray-500" onChange={(e)=>{filtre(e)}}  id="grid-state">
                            <option value="all">----Menu déroulant (filtres)----</option>
                            <option value="OK" >Versements terminés</option>
                            <option value="0" >Versement aujourd’hui</option>
                            <option value="1" >Versement à demain</option>
                            <option value="3" >Versement à 3 jours</option>
                            <option value="7" >Versement à 7 jours</option>
                            <option value="14" >Versement à 14 jours</option>
                            <option value="30">Versement à 30 jours</option>
                        </select>
                        <input id="recherche" placeholder='id rés,ID ou nom proprio,statut' className=" border-2 px-3 mr-3 rounded h-10 outline-none focus:border-blue-200 " onChange={(e) => { recherche(e) }} type="text"></input>
                        <label for="recherche" className="text-gray-500 hover:text-gray-700 cursor-pointer hover:font-bold" onClick={() => { send() }}>Rechercher</label>
                    </div> */}
                    {
                        historique ? (
                            <>
                                <div className="flex flex-col my-5">
                                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 capture  h-3/4 overflow-auto" >
                                                    <table className="w-full tab divide-y divide-gray-200  ">
                                                        <thead>
                                                            <tr>
                                                                <th className="w-2/12 text-center flex-nowrap py-3  text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                                                                Pseudo de l’Admin
                                                                </th>
                                                                <th className="w-2/12   text-center flex-nowrap py-3  text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                                                                ID résa/proprio /pseudo admin
                                                                </th>
                                                                <th className="w-2/12 text-center flex-nowrap py-3  text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                                                                Action effectué
                                                                </th>
                                                                <th className="w-2/12 text-center flex-nowrap py-3  text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                                                                   Date et Heure
                                                                </th>
                                                                

                                                           

                                                            </tr>
                                                        </thead>

                                                        <tbody className="bg-white divide-y divide-gray-200 w-full">
                                                            {historique && historique.map(historique =>
                                                                <tr>
                                                                    <td className="w-2/12 text-center  py-3  text-xs leading-4 font-medium text-gray-500  tracking-wider ">
                                                                        {historique.pseudoadmin}<br />
                                                                    </td>
                                                                    <td className="w-2/12 text-center  py-3  text-xs leading-4 font-medium text-gray-500  tracking-wider ">
                                                                        {historique.prorietaire} <br />
                                                                    </td>
                                                                    <td className="w-2/12 text-center  py-3  text-xs leading-4 font-medium text-gray-500  tracking-wider ">
                                                                        {historique.action}<br />
                                                                    </td>
                                                                    <td className="w-2/12 text-center  py-3  text-xs leading-4 font-medium text-gray-500  tracking-wider ">
                                                                        {historique.updated_at}<br />
                                                                    </td>
                                                                    
                                                                  
                                                                </tr>
                                                            )}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </>
                        ) : <div>
                            <h1 className=" text-gray-500 text-base my-5 ">
                                Aucun élément trouvé
                            </h1>
                        </div>
                    }

                </div>
            </div>


        </>
    );
}
const mapStateToprops = (state) => {
    return {
        ...state.auth
    }
}
export default connect(mapStateToprops)(Home);