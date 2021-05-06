import React, { useState, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import './HomePage.css';
import Mapfiltre from "./Mapfiltre";
import axios from 'axios'
import $ from 'jquery';
export default (props)=>{
  const [logements, setLogements] = useState()
  const [resultat, setResultat] = useState([])
  const [type, setType] = useState([])
  const [filter, setFilter] = useState(false)


  useEffect(() => {
    setLogements(props.resultat)
  }, []);

  const chevronWidth = 40;
  function filtre(event) {
    const value = event.target.value
    if (event.target.checked === true) {
      switch (value) {
        case "0":
          setResultat(oldArray => [...oldArray, 0])
          break
        case "100":
          setResultat(oldArray => [...oldArray, 100])

          break
        case "200":
          setResultat(oldArray => [...oldArray, 200])

          break
        case "300":
          setResultat(oldArray => [...oldArray, 300])

          break
        case "400":
          setResultat(oldArray => [...oldArray, 400])

          break

      }
    }
    else if (event.target.checked === false) {
      switch (value) {
        case "0":
          setResultat(resultat.filter(log => log != 0))
          break
        case "100":
          setResultat(resultat.filter(log => log != 100))
          break
        case "200":
          setResultat(resultat.filter(log => log != 200))
          break
        case "300":
          setResultat(resultat.filter(log => log != 300))
          break
        case "400":
          setResultat(resultat.filter(log => log != 400))
          break

      }
    }

  }
  function filtre2(event) {
    const value = event.target.value
    if (event.target.checked === true) {
      setType(oldArray => [...oldArray, value])
    }
    else if (event.target.checked === false) {
      setType(type.filter(log => log != value))
    }

  }
  const send = async () => {
    if (resultat.length != 0 && type.length != 0) {

      axios.post("recherchehome/filter", { nomber: resultat, type: type, filter: props.filter }).then(response => {
        if (response.data.resultat === "Null") {

          setFilter(false)
          setLogements(false)

        } else {

          setFilter(response.data.resultat)
          setLogements(false)
        }
      })
    } else if (resultat.length != 0 && type.length == 0) {

      axios.post("recherchehome/filter", { nomber: resultat, type: type, filter: props.filter }).then(response => {
        if (response.data.resultat === "Null") {
          setFilter(false)
          setLogements(false)

        } else {
          setFilter(response.data.resultat)
          setLogements(false)
        }
      })


    } else if (type.length != 0 && resultat.length == 0) {

      axios.post("recherchehome/filter", { nomber: resultat, type: type, filter: props.filter }).then(response => {
        if (response.data.resultat === "Null") {
          setFilter(false)
          setLogements(false)

        } else {
          setFilter(response.data.resultat)
          setLogements(false)
        }
      })
    }
  }
  useEffect(() => {
    send()
    if (resultat.length === 0 && type.length === 0) {
      setLogements(props.resultat)
      setFilter(false)
    }
  }, [() => { send() }]);
  function head(event){
    if (event === 1) {
      $('#affresult').css({ display: "none" })
      $('#affmap').css({ display: "block" })
    } else if(event === 2) {
      $('#affresult').css({ display: "block" })
      $('#affmap').css({ display: "none" })
    }
  }

console.log(logements)

  return (
    <div style={{ padding: `0 ${chevronWidth}px` }}>
      <div className="flex" style={{ height: 400, }}>
        <div className="w-1/3">
          <div className="w-2/3 px-3 py-3 border rounded ">
            Budget (par nuit)
            {/* ================== ARGENT ============== */}

            <div>
              <input type="checkbox" className="mr-3" id="0" name="0" onChange={(event) => { filtre(event) }} value="0"></input>
              <label for="0" >0€-100€</label>
            </div>
            <div>
              <input type="checkbox" className="mr-3" id="100" name="0" onChange={(event) => { filtre(event) }} value="100"></input>
              <label for="100">100€-200€</label>
            </div>
            <div>
              <input type="checkbox" className="mr-3" id="200 " name="0" onChange={(event) => { filtre(event) }} value="200"></input>
              <label for="200">200€-300€</label>
            </div>
            <div>
              <input type="checkbox" className="mr-3" id="300" name="0" onChange={(event) => { filtre(event) }} value="300"></input>
              <label for="300">300€-400€</label>
            </div>
            <div>
              <input type="checkbox" className="mr-3" id="400" name="0" onChange={(event) => { filtre(event) }} value="400"></input>
              <label for="400">400€ et +</label>
            </div>
          </div>
          {/* =============================== TYPE ================== */}
          <div className="w-2/3 px-3 py-3 my-4 border rounded ">
            <div>
              <input type="checkbox" className="mr-3" id="A" name="A" onChange={(event) => { filtre2(event) }} value="Appartement"></input>
              <label for="A" >Appartements</label>
            </div>
            <div>
              <input type="checkbox" className="mr-3" id="B" name="0" onChange={(event) => { filtre2(event) }} value="Maison / Villa"></input>
              <label for="B">Maisons / Villas</label>
            </div>
            <div>
              <input type="checkbox" className="mr-3" id="C " name="0" onChange={(event) => { filtre2(event) }} value="Gîte"></input>
              <label for="C">Gîtes</label>
            </div>
            <div>
              <input type="checkbox" className="mr-3" id="D" name="0" onChange={(event) => { filtre2(event) }} value="Hôtel"></input>
              <label for="D">Hôtes</label>
            </div>
            <div>
              <input type="checkbox" className="mr-3" id="E" name="0" onChange={(event) => { filtre2(event) }} value="Van / Camping-car"></input>
              <label for="E">Vans / Camping</label>
            </div>
            <div>
              <input type="checkbox" className="mr-3" id="F" name="0" onChange={(event) => { filtre2(event) }} value="Bungalow / Châlet"></input>
              <label for="F">Bungalows / Châlets</label>
            </div>
          </div>
        </div>
        {logements ? (
          <div className="w-2/3">
            {
              logements.length === 1 ? (
                <div className="flex text-blue-500 w-full"> 
                <div className="w-5/12"> 
                    à {logements[0].ville.ville}  <span className="mx-1">  {logements.length} hébergement trouvé </span>
                    </div>
                    <div className="w-7/12 flex justify-end ml-4">
                 <button className="ml-5 hover:font-bold rounded text-white cursor-pointer px-4 py-1 "  onClick={()=>(head(1))}>Voir sur la carte</button> 
                  </div>  
                </div>
              ) : (
                <div className="flex text-blue-500"> 
               à {logements[0].ville.ville}  <span className="mx-1">  {logements.length} hébergement trouvé </span>
                <button className="ml-5 hover:font-bold rounded text-white cursor-pointer px-4 py-1"  onClick={()=>(head(1))}>Voir sur la carte</button> 
                </div>
              )
            }
            <div>
              <div id="affresult" style={{ display: "block" }}>
                {
                  logements && logements.map(logement => (
                    <NavLink to={`/logement/${logement.logement.id}/detail`} className="liend">
                      <div className="border rounded-lg flex relative cursor-pointer text-center mt-3 mb-4 w-full px-2 py-2">
                        <div className="w-1/3">
                          {/* <img className="rounded-xl h-56 w-auto" src={`http://localhost:4000${logement.photo}`}></img> */}
                          <img className="rounded-xl h-56" src={`http://f07f4cb.online-server.cloud${logement.photo}`}></img>

                          {/* <label className="prom absolute top-0 right-0 mb-5 border-2 rounded-xl border-orange-500 w-20 bg-orange-500 h-12 
                            text-3xl font-bold text-white flex items-center justify-center ">-10%
                          </label> */}
                        </div>
                        <div className=" w-2/3 ml-3">
                          <label className="flex ">
                            {/* <BsFillHouseDoorFill style={{ width: 25, height: 25, }} /> */}
                            <h1 className="tracking-wide text-blue-500 py-1 text-xl font-bold">{logement.logement.name}</h1>
                        
                          </label>
                          <label className="flex ">
                            {/* <BsFillHouseDoorFill style={{ width: 25, height: 25, }} /> */}
                     
                            <h1 className="tracking-wide text-blue-500 py-1 font-bold">{logement.logement.types}</h1>
                          </label>
                          <label className="flex  ">
                            {/* <BiMap style={{ width: 25, height: 25, }} /> */}
                            <h2 className="py-1 text-blue-500 ">{logement.ville.adresse} </h2>
                          </label>
                          <label className="flex  ">
                            {/* <BiCalendar style={{ width: 25, height: 25, }} /> */}
                            <h3 className="py-1 text-blue-500 "> {logement.voygeurs} voyageurs,  {logement.chambres} Chambres </h3>
                          </label>
                          <label className="flex justify-start">
                          <h6 className="py-1 text-blue-500   flex justify-start"> {logement.equipement.slice(0,4).map(equ => (
                              <>
                                {equ}, &nbsp;
                              </>
                            ))} </h6>
                            {/* <CgCreditCard className="my-1" style={{ width: 25, height: 25, }} /> */}
                            {/* <h1 className="tracking-wide text-gray-700 text-blue-500 mx-3  py-1 text-xl font-bold ">{logement.tarif} €/nuits </h1> */}
                          </label>
                        </div>
                      </div>
                    </NavLink>
                  ))
                }
              </div>
              <div id="affmap" style={{display:"none"}}>
                <label  onClick={()=>(head(2))}>Revenir sur le(s) résultat(s)</label>
                <Mapfiltre logements={logements}/>
              </div>
            </div>
          </div>
        ) : (null)
        }
        {
          filter ? (
            <div className="w-2/3">
              {
                filter.map(logement => (
                  <NavLink to={`/logement/${logement.logement.id}/detail`} className="liend">
                                      <div className="border rounded-lg flex relative cursor-pointer text-center mt-3 mb-4 w-full px-2 py-2">
                        <div className="w-1/3">
                          {/* <img className="rounded-xl h-56 w-auto" src={`http://localhost:4000${logement.photo}`}></img> */}
                          <img className="rounded-xl h-56" src={`http://f07f4cb.online-server.cloud${logement.photo}`}></img>

                          {/* <label className="prom absolute top-0 right-0 mb-5 border-2 rounded-xl border-orange-500 w-20 bg-orange-500 h-12 
                            text-3xl font-bold text-white flex items-center justify-center ">-10%
                          </label> */}
                        </div>
                        <div className=" w-2/3 ml-3">
                          <label className="flex ">
                            {/* <BsFillHouseDoorFill style={{ width: 25, height: 25, }} /> */}
                            <h1 className="tracking-wide text-blue-500 py-1 text-xl font-bold">{logement.logement.name}</h1>
                        
                          </label>
                          <label className="flex ">
                            {/* <BsFillHouseDoorFill style={{ width: 25, height: 25, }} /> */}
                     
                            <h1 className="tracking-wide text-blue-500 py-1 font-bold">{logement.logement.types}</h1>
                          </label>
                          <label className="flex  ">
                            {/* <BiMap style={{ width: 25, height: 25, }} /> */}
                            <h2 className="py-1 text-blue-500 ">{logement.ville.adresse} </h2>
                          </label>
                          <label className="flex  ">
                            {/* <BiCalendar style={{ width: 25, height: 25, }} /> */}
                            <h3 className="py-1 text-blue-500 "> {logement.voygeurs} voyageurs,  {logement.chambres} Chambres </h3>
                          </label>
                          <label className="flex justify-start">
                          <h6 className="py-1 text-blue-500   flex justify-start"> {logement.equipement.slice(0,4).map(equ => (
                              <>
                                {equ}, &nbsp;
                              </>
                            ))} </h6>
                            {/* <CgCreditCard className="my-1" style={{ width: 25, height: 25, }} /> */}
                            {/* <h1 className="tracking-wide text-gray-700 text-blue-500 mx-3  py-1 text-xl font-bold ">{logement.tarif} €/nuits </h1> */}
                          </label>
                        </div>
                      </div>
                </NavLink>
                ))
              }
            </div>
          ) : null
        }

      </div>
    </div>
  );
};
