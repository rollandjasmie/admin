import React, { useState, useEffect } from 'react';
import ItemsCarousel from 'react-items-carousel';
import { NavLink } from 'react-router-dom';
import './HomePage.css';
import { IoIosPricetags } from "react-icons/io";
import { BiMap } from "react-icons/bi";
import { BsFillHouseDoorFill } from "react-icons/bs";
import { CgCreditCard } from "react-icons/cg";
import { FaChevronCircleLeft } from "react-icons/fa";
import { FaChevronCircleRight } from "react-icons/fa";
import axios from 'axios';
import moment from 'moment';
export default () => {
  const [logements,setLogements] = useState()
  const [promotions, setPromotion] = useState()
  

  useEffect(() => {
   axios.get('home/index').then(response =>{
    setLogements(
      response.data.logement
    )
   })
   
  }, []);

    const [activeItemIndex, setActiveItemIndex] = useState(0);
    const chevronWidth = 40;
    console.log(logements)
    return (
      <div style={{ padding: `0 ${chevronWidth}px` }}>
        <div className="" style={{ height: 400, }}>
        <ItemsCarousel
          requestToChangeActive={setActiveItemIndex}
          activeItemIndex={activeItemIndex}
          numberOfCards={3}
          gutter={20}
          leftChevron={<button className="normal-theme text-theme font-bold text-3xl"><FaChevronCircleLeft/></button>}
          rightChevron={<button className="normal-theme text-theme font-bold text-3xl"><FaChevronCircleRight/></button>}
          outsideChevron
          chevronWidth={chevronWidth}
        >
          {
            logements && logements.map(logement=>(
                <NavLink to={`/logement/${logement.logement.id}/detail`}>
              <div className="relative cursor-pointer text-center" style={{ width: 325 }}>
                <label>
                  <img className="rounded-xl h-56" src={logement.photo}></img>
                    {logement.promotion?( 
                      <div>
                        {moment(logement.promotion.datevuedebut).format("L") <= moment(new Date()).format("L") && moment(new Date()).format("L") <= moment(logement.promotion.datevuefin).format("L") ? (
                          <div>
                            <label className="prom textprom absolute top-0 right-0 mb-5 border-2 rounded-xl  w-20 bg-orange-500 h-12 
                              text-3xl font-bold  flex items-center justify-center ">-{logement.promotion.reduction}%
                            </label>
                          </div>
                        ) : null}
                      </div>
                    ):null}

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
                    <IoIosPricetags style={{ width: 25, height: 25, }} />

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
          </ItemsCarousel>
        </div>
      </div>
    );
  };