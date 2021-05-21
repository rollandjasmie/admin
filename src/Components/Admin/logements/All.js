import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import history from '../../../history';
import { CSVLink } from "react-csv";
import { connect } from 'react-redux';


const headers = [
  { label: "ID", key: "idlogement" },
  { label: "NOM", key: "name" },
  { label: "CATEGORY", key: "categorie" },
  { label: "TYPE", key: "types" },
  { label: "TARIF(€)", key: "tarif" },
  { label: "Email du proriétaire", key: "email" },
  { label: "Nom du Proriétaire", key: "namepro" },
  { label: "Prénom du Proriétaire", key: "prenpro" },
  { label: "Mobile du Proriétaire", key: "mobile" },
];
function Home(props) {
  const [logements, setLogements] = useState(false)
  const [cherche, setCherche] = useState(false)

  useEffect(() => {
    axios.get('/admin/logements/all').then(response => (
      setLogements(response.data.logements)
    ))

  }, [])
      function supp(id) {
        const asy = async () => {
            await axios.delete(`/logements/${id}/delete`)
            history.push("/logements/all")
            window.location.reload()
        }
        asy()
    }

  function recherche(e) {
    setCherche({ name: e.target.value })
  }
  async function send() {
    if (cherche) {
      await axios.post('/admin/recherche/logement', cherche).then(response => {
        setLogements(response.data.logements)
      })
    }
  }

  let data = []
  if (logements) {
    logements.map(logement =>
        (
        data.push({
          idlogement: logement.logement.idlogement,
          name: logement.logement.name,
          categorie: logement.logement.categorie,
          types: logement.logement.types,
          tarif: logement.tarif,
          email: logement.proprietaire.email,
          namepro: logement.proprietaire.name,
          prenpro: logement.proprietaire.first_name,
          mobile: logement.proprietaire.mobile,
        }))
    )
  }
  const csvReport = {
    data: data,
    headers: headers,
    filename: 'Clue_Mediator_Report.csv'
  };
  const { isAuthenticated } = props;
  const { user } = props;

    return (
            <>
              <div className="flex">
                <div className="w-3/12 h-screen bg-gray-700">
                  <h1 className="bg-gray-800 text-white text-5xl font-bold h-32 flex items-center justify-center"> Runbnb.com </h1>
                    <NavLink to={'/user/all'}>
                  <div className="text-white text-base  h-20 flex items-center justify-center">
                      Utilisateurs
                  </div>
                    </NavLink>
                  <div className="text-white text-base font-bold h-20 flex items-center justify-center bg-indigo-500 bg-opacity-25 border-r-4 border-red-500" >
                          Logements
                  </div>
                      {
                        user.niveau === "2" ? (
                            <>
                                    <NavLink to={'/admin'}>
                                <div className="text-white text-base  h-20 flex items-center justify-center">
                                        Admin
                                </div>
                                    </NavLink>
                                <NavLink to={'/comptabilite'}>
                              <div className="text-white text-base  h-20 flex items-center justify-center">
                                  Comptabilité
                              </div>
                                </NavLink>
                                    <NavLink to={'/historique'}>
                              <div className="text-white text-base  h-20 flex items-center justify-center">
                                        Historique
                                </div>
                                    </NavLink>
                            </>
                        ) : null
                    }
                        
                </div>
            <div className="w-2/3 mx-5 my-5">
                <input id="recherche" placeholder='nom,prénom,email'className=" border-2 px-3 mr-3 rounded h-10 outline-none focus:border-blue-200 " onChange={(e) => { recherche(e) }} type="text"></input>
                <label for="recherche"className="text-gray-500 hover:text-gray-700 cursor-pointer hover:font-bold" onClick={() => { send() }}>Rechercher</label>
              {
                 logements ? (
                  <>
                <div className="max-w-7xl mx-auto py-6 capture  " >
                    <div className="flex flex-col">
                      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg h-3/4 overflow-auto">
                            <table className="w-full tab divide-y divide-gray-200 my-5 ">
                              <thead>
                                <tr>
                                  <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                                   Logement
                                  </th>
                                  <th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                                    Tarif
                                  </th>
                                  < th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                                    Propriétaire
                                  </th>
                                  < th className=" text-center flex-nowrap w-1/12 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                                    Statut
                                  </th>
                                </tr>
                              </thead>
                                <tbody className="bg-white divide-y divide-gray-200 w-full">
                                {  logements.map(logement =>
                              <>
                                  <tr>
                                    <td className=" flex-nowrap  w-1/12  py-4 ">
                                      <div className="flex items-center justify-start ml-5">
                                   
                                          <img className="h-10 w-10 rounded-full" src={logement.photo} alt=""></img>
                                    
                                   
                                            <span className="ml-4 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                                            {logement.logement.idlogement} &nbsp; {logement.logement.name}
                                            </span>
                                      
                                      </div>
                                    </td>
                                    <td className="text-center flex-nowrap break-all w-1/12  py-4 ">
                                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                                      {logement.tarif} &nbsp; €
                                      </span>
                                    </td>
                                    <td className=" text-center flex-nowrap break-all    ">
                                    <label className=" px-1 inline-flex text-xs leading-5 font-medium rounded-full text-gray-500">
                                    {logement.proprietaire.name} &nbsp; {logement.proprietaire.first_name}
                                      </label> <br/>
                                      <label className="inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500  hover:text-red-500 hover:font-bold"
                                    >
                                        <a href={`/logements/${logement.logement.id}/adminmessage`}>Contacter le Propriétaire</a>
                                      </label>
                                    </td>
                                  
                                    <td className="w-full flex justify-center items-center text-center flex-nowrap break-all  py-5  ">
                                      <NavLink to={`/logements/${logement.logement.id}/Home`}>
                                    <label className="h-10 px-1 inline-flex text-xs leading-5 flex items-center font-medium rounded-full text-gray-500   ">
                                      Modifier /
                                      </label>
                                      </NavLink>
                                      <label className="h-10 inline-flex flex items-center text-xs leading-5 font-medium rounded-full text-gray-500  hover:text-red-500 hover:font-bold"
                                      onClick={() => { if (window.confirm('Vous êtes sûr?'))supp(logement.logement.id) }}>
                                      Supprimer
                                      </label>
                                    </td>
                                  </tr>
                                  </>
                                  )}
                                </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div classname="">
                    <CSVLink {...csvReport} className="">Export to CSV</CSVLink>
                  </div>
                  </>
                 ) : 
                 <div>
                           <h1 className=" text-gray-500 my-5 ">
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