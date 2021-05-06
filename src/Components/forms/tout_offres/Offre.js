import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../HomePage.css';
import { GoArrowSmallLeft } from "react-icons/go";
import { BiCalendar } from "react-icons/bi";
import { BiMap } from "react-icons/bi";
import { BsFillHouseDoorFill } from "react-icons/bs";
import { CgCreditCard } from "react-icons/cg";
import axios from 'axios';
import moment from 'moment';
export default () => {
  const [logements, setLogements] = useState()
  useEffect(() => {
    axios.get('/logements/offre/details').then(response => {
      setLogements(
        response.data.logement
      )
    })
  }, []);

  const chevronWidth = 40;
  return (
    <div className="flex-auto mt-5">
        <NavLink to="/">
          <label className=" px-4 mb-4 text-gray-600 text-sm text-blue-500 hover:text-blue-700 hover:font-bold flex " >
          <GoArrowSmallLeft className="w-10 h-10" /><span className="py-2 px-3 text-base"  > Retour à la page d'accueil </span>    
          </label>
        </NavLink>
      <h1 className="text-base font-bold text-gray-700 mx-5 mb-5">Liste de tous les hébergments</h1>
      <div className="flex justify-center flex-wrap" style={{ height: 400, }}>
          {
            logements && logements.map(logement => (
              <NavLink to={`/logement/${logement.logement.id}/detail`}>
                <div className="relative cursor-pointer text-center mr-6" style={{ height: 500, width: 325 }}>
                  <label>
                    <img className="rounded-xl h-56" src={logement.photo}></img>
                    {logement.promotion ? (
                      <div>
                        {moment(logement.promotion.datevuedebut).format("L") <= moment(new Date()).format("L") && moment(new Date()).format("L") <= moment(logement.promotion.datevuefin).format("L") ? (
                          <div>
                            <label className="prom textprom absolute top-0 right-0 mb-5 border-2 rounded-xl  w-20 bg-orange-500 h-12 
                              text-3xl font-bold  flex items-center justify-center ">-{logement.promotion.reduction}%
                            </label>
                          </div>
                        ) : null}
                      </div>
                    ) : null}
                  </label>
                  <div className="py-4">
                    <label className="flex px-3">
                      <BsFillHouseDoorFill style={{ width: 25, height: 25, }} />
                      <h1 className="tracking-wide text-blue-500 py-1 mx-3 text-xl font-bold">{logement.logement.name}</h1>
                    </label>
                    <label className="flex  px-3">
                      <BiMap style={{ width: 25, height: 25, }} />
                      <h2 className="py-1 text-blue-500 mx-3 ">{logement.ville} </h2>
                    </label>
                    <label className="flex  px-3">
                      <BiCalendar style={{ width: 25, height: 25, }} />

                      <h3 className="py-1 text-blue-500 mx-3 ">Du {moment(logement.promotion.datedebut).format('L')} - Du {moment(logement.promotion.datefin).format('L')} </h3>
                    </label>
                    <label className="flex px-3">
                      <CgCreditCard className="my-1" style={{ width: 25, height: 25, }} />
                      <h1 className="tracking-wide text-gray-700 text-blue-500 mx-3  py-1 text-xl font-bold ">{logement.calendrier.tarif} €/nuits </h1>
                    </label>
                  </div>
                </div>
              </NavLink>
            ))
          }
      </div>
    </div>
  );
};