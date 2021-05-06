// import React from 'react'
// import FullCalendar from '@fullcalendar/react'
// import dayGridPlugin from '@fullcalendar/daygrid'

// export default class DemoApp extends React.Component {

//   render() {
//     return (
//       <FullCalendar defaultView="dayGridMonth" plugins={[ dayGridPlugin ]} events={[
//         { title: 'rolland mandona', date: '2020-11-11' },
//         { title: 'event 2', date: '202020-11-11' }
//       ]} />
//     )
//   }

// }
import React, { useState,useEffect } from 'react';
import CalendarView from "../CalendarViewer/CalendarViewer";
import { NavLink } from "react-router-dom";
import Navbarextra from "../../Navbar/Navbarextra";
import { FcSynchronize } from "react-icons/fc";
import { ImCross } from "react-icons/im";
import Navbarextra2 from "../../Navbar/Navbarextra2";
import { BiImport } from "react-icons/bi";
import { BiExport } from "react-icons/bi";
import { Formik, Form, Field } from 'formik';
import Modal from 'react-bootstrap/Modal';  



// export default class Synchro extends React.Component {
//   render() {

function Synchro(){

    const [showimport, setShowimport] = useState(false);
    const [showexport, setShowexport] = useState(false);
    const handleCloseimport = () => setShowimport(false);
    const handleShowimport= () => setShowimport(true);
    const handleCloseexport = () => setShowexport(false);
    const handleShowexport= () => setShowexport(true);
    return (
      <div className="bg-white h-full">
        <div>
          <div>
            <div className="">
              <Navbarextra  />
            </div>
            <div className="h-24">
              <Navbarextra2  />
            </div>
          </div>
        </div>

        <h1 className="text-base text-gray-700 font-medium py-3 px-5">
          Synchronisation des calandriers
        </h1>
        <div className="flex my-3 mx-5 w-1/3">
          <h1 className="text-gray-600 text-base w-full">Booking</h1>
          <div>
            <FcSynchronize
              className="cursor-ppointer"
              style={{ width: 26, height: 26 }}
            />
            <ImCross
              className="my-3 ml-1 cursor-ppointer"
              style={{ width: 18, height: 18, color: "red" }}
            />
          </div>

        </div>
          <hr className="mx-5 w-1/3"></hr>

        <div className=" my-4 ">
          <label className="flex  mx-5 cursor-pointer" onClick={handleShowimport}>
            <BiImport style={{ width: 30, height: 30 }} />
            <p className="text-sm text-gray-700 font-medium my-2 mx-3">
              Importer le calendrier
            </p>
          </label>
              {/* MODAL_IMpORT */}
              <Modal
                            size="md"
                            show={showimport}
                            onHide={handleCloseimport}
                            backdrop="static"
                            keyboard={false}
                        >
                            <Modal.Header closeButton className="bg-gray-200 h-16">
                                <Modal.Title >
                                    <h1 className="text-base py-2  text-gray-800  ">Importez un nouveau calendrier</h1>
                                    
                                </Modal.Title>
                            
                            </Modal.Header>
                                   

                                        <Modal.Body >
                                           
                                           
                                                <label className="py-2 text-gray-600 font-medium text-sm ">
                                                Importez les autres calendriers que vous utilisez et nous actualiserons automatiquement la disponibilité de cet hébergement.
                                                </label>
                                                <div>
                                                  <label className="py-2 text-gray-600 text-sm font-medium">
                                                  Adresse du calendrier (URL)
                                                  </label>
                                                  <br></br>
                                                  <input type="text" placeholder="URL du calendrier" className=" border-2 py-2 px-2 w-full focus:border-orange-500"></input>
                                                </div>  
                                                <div className="my-3">
                                                  <label className="py-2 text-gray-600 text-sm font-medium">
                                                  Donnez un nom à votre calendrier 
                                                  </label>
                                                  <br></br>
                                                  <input type="text" placeholder="Nom du calendrier du calendrier" className=" border-2 py-2 px-2 w-full focus:border-orange-500"></input>
                                                </div>   
                                       
                           
                                        </Modal.Body>
                                        
                                        <button type="submit"  className="  text-white font-bold py-2 w-5/12  mx-3 rounded my-3"
                                                >Importer le calendrier
                                        </button>
                                   
                    


                        </Modal>



          <label className="flex  mx-5 cursor-pointer"  onClick={handleShowexport}>
            <BiExport style={{ width: 30, height: 30 }} />
            <p className="text-sm text-gray-700 font-medium  my-2 mx-3">
              Exporter le calendrier
            </p>
          </label>
             {/* MODAL_ExpORT */}
             <Modal
                            size="md"
                            show={showexport}
                            onHide={handleCloseexport}
                            backdrop="static"
                            keyboard={false}
                        >
                            <Modal.Header closeButton className="bg-gray-200 h-16">
                            <Modal.Title >
                                    <h1 className="text-base py-2  text-gray-800  "> Exportez le calendrier</h1>
                                    
                                </Modal.Title>
                            
                            </Modal.Header>
                                   

                                        <Modal.Body >
                                           
                                       
                                                <div>
                                                  <label className="py-2 text-gray-600 text-sm font-medium">
                                                 Copiez et collez le lien vres d'autres applications ICAL
                                                  </label>
                                                  <br></br>
                                                  <input type="text" placeholder="    Copiez et collez le lien" className=" border-2 py-2 px-2 w-full focus:border-orange-500"></input>
                                         </div>

                                        </Modal.Body>
                                        <button type="submit"  className="   text-white font-bold py-2 w-5/12  mx-3 rounded my-3"
                                                >Exporter le calendrier
                                        </button>
                                   
                                   
                    
                        </Modal>






        </div>
      </div>
  );
  }
// }
export default Synchro ;
