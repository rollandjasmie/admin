import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import history from '../../../history';
import { connect } from 'react-redux';
import { FaUserPlus } from 'react-icons/fa';

function Home(props) {
    const [users, setUsers] = useState(false)
    const [cherche, setCherche] = useState(false)
    useEffect(() => {
        axios.get('/all/admin').then(response => (
            setUsers(response.data.admins)
        ))

    }, [])

    function recherche(e) {
        setCherche({ name: e.target.value })
    }
    async function send() {
        if (cherche) {
            await axios.post(`/admin/${cherche.name}/recherche`).then(response => {
                setUsers(response.data.admins)
            })
        }
    }

    let data = null
    if (users) {
        data = users
    }
    
    async function supp(id) {
        await axios.delete(`/admin/${id}/delete`)
        history.push('/admin')
    }
    const { isAuthenticated } = props;
    const { user } = props;
    return (
        <>
            <div className="flex">
                <div className="w-3/12 h-screen bg-gray-700">
                    <h1 className="bg-gray-800 text-white text-5xl font-bold h-32 flex items-center justify-center"> Runbnb.com </h1>
                        <NavLink to={'/user/all'}>
                    <div className="text-white text-base  h-20 flex items-center justify-center" >
                            Utilisateurs

                    </div>
                        </NavLink>
                        <NavLink to={'/logements/all'}>
                    <div className="text-white text-base  h-20 flex items-center justify-center">
                            Logements
                    </div>
                        </NavLink>
                    {
                        user.niveau === "2" ? (
                            <>
                                    <NavLink to={'/admin'}>
                                <div className="text-white text-base font-bold h-20 flex items-center justify-center bg-indigo-500 bg-opacity-25 border-r-4 border-red-500">
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
                   <div className="flex">
                            <div className="w-9/12 h-10 mr-5"> 
                                    <input id="recherche" placeholder='nom,prénom,email' className=" border-2 px-3 mr-3 rounded h-10 outline-none focus:border-blue-200 " onChange={(e) => { recherche(e) }} type="text"></input>
                                    <label for="recherche" className="text-gray-500 hover:text-gray-700 cursor-pointer hover:font-bold" onClick={() => { send() }}>Rechercher</label>
                            </div>
                            <NavLink to={'/admin/add'}>
                                <label className="text-gray-500 text-base h-10 mt-2 flex justify-end cursor-pointer ">
                                <FaUserPlus style={{ width: 20, height: 20, }} className="mr-3" />
                                <span className="">
                                Ajouter un admin
                                </span>   
                                </label>
                            </NavLink>
                    </div>
                    {
                        users ? (
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
                                                                    Pseudo
                                                                </th>
                                                                <th className="w-1/3   text-center flex-nowrap py-3  text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                                                                    Prénom - Nom
                                                                </th>
                                                                 <th className="w-1/3 text-center flex-nowrap py-3  text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                                                                    Email
                                                                </th>
                                                               
                                                                <th className="w-1/3   text-center flex-nowrap py-3  text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                                                                    Tel portable
                                                                </th>
                                                                <th className="w-1/3   text-center flex-nowrap py-3  text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                                                                    Niveau accréditation
                                                                </th>
                                                                <th className="w-1/3   text-center flex-nowrap py-3  text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                                                                    Statut
                                                                </th>
                                                                <th className="w-1/3   text-center flex-nowrap py-3  text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                                                                    Modifier / Supprimer
                                                                </th>
                                                             
                                                            </tr>
                                                        </thead>

                                                        <tbody className="bg-white divide-y divide-gray-200 w-full">
                                                            {users && users.map(user =>
                                                                <tr>
                                                                    <td className="w-1/3 text-center  py-3  text-xs leading-4 font-medium text-gray-500  tracking-wider ">
                                                                        <NavLink to={`/user/${user.id}/adminshow`}>
                                                                            {user.pseudo }<br />
                                                                        </NavLink>
                                                                    </td>
                                                                    <td className="w-1/3 text-center  py-3  text-xs leading-4 font-medium text-gray-500 tracking-wider ">
                                                                        <NavLink to={`/user/${user.id}/adminshow`}>
                                                                            {user.first}{" "}{user.name}{" "}{ }<br />
                                                                        </NavLink>
                                                                    </td>
                                                                    <td className="w-1/3 text-center  py-3  text-xs leading-4 font-medium text-gray-500 tracking-wider ">
                                                                        {user.email}
                                                                    </td>
                                                                    <td className="w-1/3 text-center  py-3  text-xs leading-4 font-medium text-gray-500 tracking-wider ">
                                                                        {user.mobile}
                                                                    </td>
                                                                    <td className="w-1/3 text-center  py-3  text-xs leading-4 font-medium text-gray-500 tracking-wider ">
                                                                        {user.niveau}
                                                                    </td>
                                                                    <td className="w-1/3 text-center  py-3  text-xs leading-4 font-medium text-gray-500 tracking-wider ">
                                                                        {user.statu}
                                                                    </td>
                                                               
                                                                    <td className="w-1/3 text-center  py-3  text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider hover:text-red-500 hover:font-bold "
                                                                        >
                                                                        <button onClick={() => {history.push(`/admin/show/${user.id}`)}}>Modifier</button>
                                                                        <button onClick={() => {
                                                                            if (window.confirm('êtes vous sûr de vouloir supprimer définitivement l’Admin')) { supp(user.id) } }}>Supprimer</button>
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