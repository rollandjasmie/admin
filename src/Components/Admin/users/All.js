import React, { useEffect,useState } from 'react'
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { CSVLink } from "react-csv";
import history from '../../../history';
import { connect } from 'react-redux';

const headers = [
  { label: "Nom", key: "name" },
  { label: "Prénom", key: "first_name" },
  { label: "Email", key: "email" },
  { label: "Adresse", key: "adresse" },
  { label: "Date de naissance", key: "date_of _birth" },
  { label: "Mobile", key: "mobile" },
  { label: "Numéro urgence", key: "urgence" },
  { label: "Sexe", key: "sexe" },
];
function Home(props) {
  const [users, setUsers] = useState(false)
  const [cherche, setCherche] = useState(false)
 useEffect(() => {
   axios.get('/user/all').then(response => (
     setUsers(response.data.users)
   ))
  
 }, [])

    function recherche(e){
      setCherche({name:e.target.value})
    }
    async function send(){
      if (cherche){
        await axios.post('/admin/recherche/users', cherche).then(response=>{
          
          setUsers(response.data.users)
        })
      }
    }
  

  let data = null
    if (users) {
        data = users
    }
  const csvReport = {
    data: data,
    headers: headers,
    filename: 'Clue_Mediator_Report.csv'
  };
  async function supp (id){
    await axios.delete(`/user/${id}/delete`)
    history.push('/user/all')
  }
  const { isAuthenticated } = props;
  const { user } = props;
        return (
            <>
          <div className="flex">
                <div className="w-3/12 h-screen bg-gray-700">
                    <h1 className="bg-gray-800 text-white text-5xl font-bold h-32 flex items-center justify-center"> Runbnb.com </h1>
                    <div className="text-white text-base font-bold h-20 flex items-center justify-center bg-indigo-500 bg-opacity-25 border-r-4 border-red-500" >
                          Utilisateurs
                    
                    </div>
                    <div className="text-white text-base  h-20 flex items-center justify-center">
                      <NavLink to={'/logements/all'}>
                        Logements
                      </NavLink>
                    </div>
                     {
                       user.niveau === "2"  ? (
                            <>
                              <div className="text-white text-base  h-20 flex items-center justify-center">
                                <NavLink to={'/admin'}>
                                  Admin
                                </NavLink>
                              </div>
                               <div className="text-white text-base  h-20 flex items-center justify-center">
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
            <div className="w-2/3 mx-5 my-5">
                <input id="recherche" placeholder='nom,prénom,email'className=" border-2 px-3 mr-3 rounded h-10 outline-none focus:border-blue-200 " onChange={(e) => {recherche(e) }} type="text"></input>
                <label for="recherche" className="text-gray-500 hover:text-gray-700 cursor-pointer hover:font-bold" onClick={() => { send() }}>Rechercher</label>
            {
                users?(
                    <>
                    <div className="flex flex-col my-5">
                      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 capture  h-3/4 overflow-auto" >
                        <table className="w-full tab divide-y divide-gray-200  mx-2">
                          <thead>
                            <tr>
                              <th className="w-1/3 text-center flex-nowrap py-3  text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                                Nom et Prénom
                              </th>
                              <th className="w-1/3   text-center flex-nowrap py-3  text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                              E-mail
                              </th>
                              <th className="w-1/3   text-center flex-nowrap py-3  text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                              </th>
                            </tr>
                          </thead>
                  
                          <tbody className="bg-white divide-y divide-gray-200 w-full">
                            {users && users.map(user =>
                              <tr>
                                <td className="w-1/3 text-center  py-3  text-xs leading-4 font-medium text-gray-500  tracking-wider ">
                                  <NavLink to={`/user/${user.id}/adminshow`}>
                                  {user.first_name}{" "}{user.name}{" "}{}<br />
                                  </NavLink>
                                </td>
                                <td className="w-1/3 text-center  py-3  text-xs leading-4 font-medium text-gray-500 tracking-wider ">
                                {user.email}
                                </td>
                                  <td className="w-1/3 text-center  py-3  text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider hover:text-red-500 hover:font-bold "
                                  onClick={() => { if (window.confirm('Vous êtes sûr?')) { supp(user.id) }}}>
                                  Supprimer
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
                        <div classname="w-full">
                          <CSVLink {...csvReport} className="">Export to CSV</CSVLink>
                        </div>
                    </>
              ):<div>
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