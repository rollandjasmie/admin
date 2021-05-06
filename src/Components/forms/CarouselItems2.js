import React, { useState,useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import ItemsCarousel from 'react-items-carousel';
import './CarouselItems2.css';
import { FaChevronCircleLeft } from "react-icons/fa";
import { FaChevronCircleRight } from "react-icons/fa";
import axios from "axios";
import { NavLink } from 'react-router-dom';
import { keys } from '@material-ui/core/styles/createBreakpoints';
export default () => {
    const [activeItemIndex, setActiveItemIndex] = useState(0);
    const chevronWidth = 40;
    const [villes,setVilles]=useState()

    useEffect(() => {
      axios.get('/logement/ville/public').then(response=>(
        setVilles(response.data)
      ))
    }, [])
    return (  
      <div style={{ padding: `0 ${chevronWidth}px` }}>
        
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
          {villes?(
            
                Object.keys(villes) && Object.keys(villes).map(ville=>(
                villes[ville] && villes[ville].map((vil) =>(
                <div className="log1 flex content-end flex-wrap rounded-xl " style={{ height: 230, width:325 }}>
                  <div  className="px-5 bg-blue-500 w-full bg-opacity-50 rounded-b-xl">
                      <NavLink to={`/destination/${vil[0].ville}/destination`}>
                        <h1 className="tracking-wide text-gray-200  text-xl font-bold">{vil[0].ville}</h1>
                        <h2 className="tracking-wide text-gray-200  text-lg ">{vil.length} hébergement(s)</h2>
                      </NavLink>
                  </div>  
                </div>
              ))
            ))
          
         
        ):null}
        
        
{/*          
                    <div className="log1 flex content-end flex-wrap rounded-xl " style={{ height: 230, width:325 }}>
                      <div  className="px-5 bg-blue-500 w-full bg-opacity-50 rounded-b-xl">
                        <h1 className="tracking-wide text-gray-200  text-xl font-bold">dfgfgqfg</h1>
                        <h2 className="tracking-wide text-gray-200  text-lg ">gfdfgfg</h2>
                      </div>  
                    </div>
                 
                
                    <div className="log1 flex content-end flex-wrap rounded-xl " style={{ height: 230, width:325 }}>
                      <div  className="px-5 bg-blue-500 w-full bg-opacity-50 rounded-b-xl">
                        <h1 className="tracking-wide text-gray-200  text-xl font-bold">dfgfgqfg</h1>
                        <h2 className="tracking-wide text-gray-200  text-lg ">gfdfgfg</h2>
                      </div>  
                    </div>
                 
                  
                    <div className="log1 flex content-end flex-wrap rounded-xl " style={{ height: 230, width:325 }}>
                      <div  className="px-5 bg-blue-500 w-full bg-opacity-50 rounded-b-xl">
                        <h1 className="tracking-wide text-gray-200  text-xl font-bold">dfgfgqfg</h1>
                        <h2 className="tracking-wide text-gray-200  text-lg ">gfdfgfg</h2>
                      </div>  
                    </div>
                 
                
                    <div className="log1 flex content-end flex-wrap rounded-xl " style={{ height: 230, width:325 }}>
                      <div  className="px-5 bg-blue-500 w-full bg-opacity-50 rounded-b-xl">
                        <h1 className="tracking-wide text-gray-200  text-xl font-bold">dfgfgqfg</h1>
                        <h2 className="tracking-wide text-gray-200  text-lg ">gfdfgfg</h2>
                      </div>  
                    </div>
                 
                
                    <div className="log1 flex content-end flex-wrap rounded-xl " style={{ height: 230, width:325 }}>
                      <div  className="px-5 bg-blue-500 w-full bg-opacity-50 rounded-b-xl">
                        <h1 className="tracking-wide text-gray-200  text-xl font-bold">dfgfgqfg</h1>
                        <h2 className="tracking-wide text-gray-200  text-lg ">gfdfgfg</h2>
                      </div>  
                    </div>
                  */}

        </ItemsCarousel>
      </div>
  
    
    );
  };