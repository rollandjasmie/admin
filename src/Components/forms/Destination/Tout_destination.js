import React, { useState, useEffect } from 'react';
import axios from "axios";
import { NavLink } from 'react-router-dom';
import { GoArrowSmallLeft } from "react-icons/go";
export default () => {
    const chevronWidth = 40;
    const [villes, setVilles] = useState()

    useEffect(() => {
        axios.get('/logement/ville/public').then(response => (
            setVilles(response.data)
        ))
    }, [])
    return (
        <div className="flex-auto mt-5">
        <NavLink to="/">
          <label className=" px-4 mb-4 text-gray-600 text-sm text-blue-500 hover:text-blue-700 hover:font-bold flex " >
          <GoArrowSmallLeft className="w-10 h-10" /><span className="py-2 px-3 text-base"  > Retour à la page d'accueil </span>    
          </label>
        </NavLink>
      <h1 className="text-base font-bold text-gray-700 mx-5 mb-5">Liste de tous les hébergments</h1>
      <div className="flex justify-center flex-wrap" style={{ height: 400, }}>
        {villes ? (
                <>
                    {
                        Object.keys(villes) && Object.keys(villes).map(ville => (
                            villes[ville] && villes[ville].map((vil) => (
                                <div className="log1 flex content-end flex-wrap rounded-xl mr-5 mb-5" style={{ height: 230, width: 325 }}>
                                            <div className="px-5 bg-blue-500 w-full bg-opacity-50 rounded-b-xl">
                                              <NavLink to={`/destination/${vil[0].ville}/destination`}>
                                                <h1 className="tracking-wide text-gray-200  text-xl font-bold">{vil[0].ville}</h1>
                                                <h2 className="tracking-wide text-gray-200  text-lg ">{vil.length}</h2>
                                              </NavLink>
                                            </div>
                                        </div>
                            ))
                        ))
                    }
                </>
            ) : null}
        </div>
        </div>
    );
};