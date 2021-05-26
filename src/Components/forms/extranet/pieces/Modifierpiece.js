import React, { useState,useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import Navbarextra from '../../Navbar/Navbarextra'
import Navbarextra2 from '../../Navbar/Navbarextra2'
import { GoArrowSmallLeft } from 'react-icons/go';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import IncrementeComponentl from './IncrementeComponentl';
import IncrementeComponenta from './IncrementeComponenta';

import  axios  from 'axios';
import Modalchambre from './Modalchambre'
import history from '../../../../history';
import Salonmodal from './Salonmodal'
import Autremodal from './Autremodal';
import { NavLink } from 'react-router-dom';
import { TiDeleteOutline } from 'react-icons/ti';


function Modifierpiece(props){


      const [modal,setmodal] = useState({
        modalIsOpen: false,
        modalId: 0
      })

    const [salonmodal, setsalonmodal] = useState({
        salonmodalIsOpen: false,
        salonmodalId: 0
    })
    
    const [autreslitsmodal, setautreslitsmodal] = useState({
        autreslitsnmodalIsOpen: false,
        autreslitsnmodalId: 0
    })
    const handleChange = (row, index, setFieldValue, event) => {
        const isChecked = event.target.checked;
        setFieldValue(`${row}[${index}].checked`, isChecked);
    }
      const openModal = (idc,id) =>{
        setmodal({modalIsOpen:true , modalId:id,idc:idc})
        }
       const closeModal = () =>{
          setmodal(false)
    
          }

    const salonopenModal = (id) => {
        setsalonmodal({ salonmodalIsOpen: true, salonmodalId: id })
    }
    const saloncloseModal = () => {
        setsalonmodal(false)

    }
    const autreslitsopenModal = (id) => {
        setautreslitsmodal({ autreslitsmodalIsOpen: true, autreslitsmodalId: id })
    }
    const autreslitscloseModal = () => {
        setautreslitsmodal(false)

    }
  
        const [chambrevalue,chambre]= useState({
            chambre:null,
            salon:null,
            bain_entier: null,
            bain_demi:null,
            cuisine:null,
            kitchenette:null

        })

        const [hebergement,sethebergement]= useState({
            chambres:[],
            salons:[],
            autres:[],
           
        })

        const [bain,setbain]= useState({
           
            bain_entier:"",
            bain_demi:"",
            cuisine:"",
            kit:""
        })


        const [showpiece, setShowpiece] = useState(false);
        const [showchambre1, setShowchambre1] = useState(false);
        const [showsalon, setShowsalon] = useState(false);
        const [showespace, setShowespace] = useState(false);
        const [nombre,setnombre] = useState()
        const handleClosepiece = () => setShowpiece(false);
        const handleShowpiece= () => setShowpiece(true);
        const handleClosechambre1 = () => setShowchambre1(false);
        const handleClosesalon = () => setShowsalon(false);
        const handleShowsalon = () => setShowsalon(true);
        const handleCloseespace = () => setShowespace(false);
        const handleShowespace = () => setShowespace(true);
        const { match: { params } } = props;
        const deletechambre= (id)=>{
            axios.delete(`/chambre/delete/${id}`)
            history.push(`/modifierpiece/${params.logement_id}/chambre`)
        }
        const deletesalon = (id) => {
            axios.delete(`/salon/delete/${id}`)
            history.push(`/modifierpiece/${params.logement_id}/chambre`)
        }
        const deleteautre = (id) => {
            axios.delete(`/autre/delete/${id}`)
            history.push(`/modifierpiece/${params.logement_id}/chambre`)
        }
        const save = ()=>{
            axios.put(`logements/${params.logement_id}/nombrepersonne`,{personne:nombre})
            history.push(`/modifierpiece/${params.logement_id}/chambre`)

        }
        useEffect(() => {
            axios.get(`/logements/${params.logement_id}/chambres`)
                .then(res => {
                    sethebergement(res.data);
                    setnombre(res.data.nombre_personne)
                    console.log( res.data)

                })
            axios.get(`/logements/${params.logement_id}/bain_entiers`)
                .then(res => {
                    setbain(res.data);
                    console.log( res.data)
                })
        }, []);
        
      return(
          
          <>
            <div className="">
                <Navbarextra logement_id={params.logement_id}/>
            </div> 
            <div className="h-24">
                <Navbarextra2 logement_id={params.logement_id}/>
            </div> 
           
                  <NavLink to={`/extraheb/${params.logement_id}`}>
                  <label className=" px-4 py-5 text-gray-600 text-sm text-blue-500 hover:text-blue-700 hover:font-bold flex "  >
                      <GoArrowSmallLeft className="w-10 h-10" /><span className="py-2 px-3 text-base"> Retour à la modification de la   Villa Nath - Saint Gilles Les Bains </span>
                      </label>
                </NavLink>
            
        
            <div className="w-full px-5 ">
              <div className="">
               <h1 className="w-2/3 text-xl font-bold text-gray-700">Pièces et espaces</h1>
                <h2 className=" text-sm font-medium text-gray-500 py-4" >Ajouter ou modifier les espaces à la disposition des voyageurs et indiquer quels sont les espaces partagés  </h2>
             
              </div>
            
            </div>
            {/* piece et esace */}
            <div className="w-4/6 mx-5 flow-root inline-block  mt-5 pl-10 ml-9 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-10   ">  
                <span className=" text-sm w-4/6" >
                      Chambre : ({hebergement.chambres.length})
                  {hebergement.salons?(
                    <>
                       {" "} -{" "}Salons :
                        ({hebergement.salons.length})
                    </>
                     ):null} 
                 {hebergement.autres ? (
                          <>
                              {" "} -{" "}Autres :
                        ({hebergement.autres.length})
                          </>
                      ) : null}
                </span>
                <span className="w-2/6 mx-5 px-5  text-sm text-blue-500 hover:font-bold hover:text-blue-700 cursor-pointer"  onClick={handleShowpiece}> Modifier les pièces et les espaces </span>          
                <div className="mt-5">
                      <label>Nombre de pérsonnes</label>
                      {
                          hebergement.nombre_personne?(
                          <IncrementeComponenta
                            quant={hebergement.nombre_personne}
                            onChange={(e)=>{setnombre(e)}}
                          />):null
                      }
                </div>   
                    {/* modal */}

                        <Modal
                            size="lg"
                            show={showpiece}
                            onHide={handleClosepiece}
                            backdrop="static"
                            keyboard={false}
                        >
                            <Modal.Header closeButton>
                                <Modal.Title >
                                    <h1 className="text-base py-5">Quels espaces sont  à disposition des voyageurs ?</h1>
                                    
                                </Modal.Title>
                            
                            </Modal.Header>
                            <Formik
                            initialValues={chambrevalue}
              
                            onSubmit={value =>{
                                axios.post(`/logements/${params.logement_id}/chambres`,{chambre:value.chambre})
                                axios.post(`/logements/${params.logement_id}/chambres`, { salon: value.salon })

                                console.log(value)
                                    
                                axios.put(`/logements/${params.logement_id}/chambres/${params.logement_id}`,{bain_entier:value.bain_entier,
                                        bain_demi:value.bain_demi, cuisine:value.cuisine, kitchenette:value.kitchenette})
                                console.log(value)
                                handleClosepiece()
                                history.push(`/modifierpiece/${params.logement_id}/chambre`)
                            }      
                                }
                            >
                                {({ values, checked, handleSubmit, touched, setFieldValue }) => (
                                    <Form onSubmit={handleSubmit}>

                                        <Modal.Body >
                                            <div className="py-5">
                                            <div className="w-full flex px-5">
                                                <label className="w-3/4">
                                                    Chambre
                                                </label>
                                                <IncrementeComponentl onChange={quantity =>
                                                    setFieldValue('chambre',quantity)
                                                }/>
                                            </div>
                                            <div className="w-full flex px-5 py-2">
                                                <label className="w-3/4">
                                            Salon
                                                </label>
                                                <IncrementeComponentl onChange={quantity =>
                                                    setFieldValue('salon',quantity)
                                                }/>
                                            </div>

                                            
                                            <div className="w-full flex px-5 py-2">
                                                <label className="w-3/4">
                                                Salle de bain entière : Toilette, lavabo, douce et baignoire
                                                </label>
                                                <IncrementeComponentl  onChange={quantity =>
                                                    setFieldValue('bain_entier',quantity)
                                                }/>
                                            </div>
                                            <div className="w-full flex px-5 py-2">
                                                <label className="w-3/4">
                                                Demi-salle de bain : Toilette et lavabo
                                                </label>
                                                <IncrementeComponentl  onChange={quantity =>
                                                    setFieldValue('bain_demi',quantity)
                                                }/>
                                            </div>
                                            <div className="w-full flex px-5 py-2">
                                                <label className="w-3/4">
                                                Cuisine entière
                                                </label>
                                                <IncrementeComponentl  onChange={quantity =>
                                                    setFieldValue('cuisine',quantity)
                                                }/>
                                            </div>
                                            <div className="w-full flex px-5 py-2">
                                                <label className="w-3/4">
                                                Kitchenette : un espace compact pour préparer à manger
                                                </label>
                                                <IncrementeComponentl  onChange={quantity =>
                                                    setFieldValue('kitchenette',quantity)
                                                }/>
                                            </div>
                                          
                                            <div className="w-full flex px-5 py-2">
                                                <label className="w-3/4">
                                                Espace repas
                                                </label>
                                                <IncrementeComponentl/>
                                            </div>
                                            </div>   
                                        </Modal.Body>
                                        <button type="submit" className=" m-5  text-white font-bold py-2 px-4 rounded "
                                                >Enregistrer
                                        </button>
                                    </Form>

                                )}
                            </Formik>
                        </Modal>

                        <div>    
                            <Salonmodal logement_id={params.logement_id} salonmodalIsOpen={salonmodal.salonmodalIsOpen}
                            salonmodalId={salonmodal.salonmodalId} saloncloseModal={saloncloseModal}/>
                        </div>
                        <div>
                            <Autremodal logement_id={params.logement_id} autreslitsmodalIsOpen={autreslitsmodal.autreslitsmodalIsOpen}
                            autreslitsmodalId={autreslitsmodal.autreslitsmodalId} autreslitscloseModal={autreslitscloseModal} />
                        </div>
                        <div>
                            <Modalchambre logement_id={params.logement_id} modalIsOpen={modal.modalIsOpen} 
                          modalId={modal.modalId} idc={modal.idc} closeModal={closeModal}/>
                        </div>
              </div>

            <div className="w-1/3 mx-5  mt-5 pl-10 ml-9 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-10   ">  
                {hebergement.chambres.map((log,index) =>(
                    <div className="flex">
                        <label className="w-full hover:text-blue-500 hover:font-bold cursor-pointer" 
                        key={index} onClick={()=>{openModal(log.id,index)}}>
                            <span className="plus font-bold text-2xl">+</span>
                            <span className="mx-3">  
                                {log.title}{" "}{index + 1}
                            </span>
                        </label><br />
                        {
                            hebergement.chambres.length != 1?
                                <span onClick={() => { deletechambre(log.id) }} className="hover:text-blue-500 hover:font-bold cursor-pointer w-5" style={{fontSize: " 30px"}}>
                                <TiDeleteOutline/> 
                                </span>:null     
                            
                        }
                        
                    </div>   
                 )
                )}     
                                                            
                {hebergement.salons?(
                    <>
                        {hebergement.salons.map((log, index) => (
                        <div className="flex">
                            <label className="w-full hover:text-blue-500 hover:font-bold cursor-pointer"
                                onClick={() => { salonopenModal(index) }}>
                                <span className="plus font-bold text-2xl">+</span>
                                <span className="mx-3">
                                    {log.title}{" "}{index + 1}
                                </span>
                            </label>
                            <span onClick={()=>{deletesalon(log.id)}} className="hover:text-blue-500 hover:font-bold cursor-pointer w-5" style={{fontSize: " 30px"}}>
                                <TiDeleteOutline/> 
                            </span>
                        </div> 
                        )
                        )}
                    </>
                 ):null
                }   

                {hebergement.autres?(
                    <>
                        {hebergement.autres.map((log,index) =>(
                            <div className="flex">
                                    <label className="w-full hover:text-blue-500 hover:font-bold cursor-pointer" onClick={() => { autreslitsopenModal(index) }}>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
                                        <span className="plus font-bold text-2xl">+</span>                                                                                                                                                                       
                                        <span className="mx-3">  
                                            {log.title}
                                            </span> 
                                    </label>  
                                    <span onClick={()=>{deleteautre(log.id)}} className="hover:text-blue-500 hover:font-bold cursor-pointer w-5" style={{fontSize: " 30px"}}>
                                        <TiDeleteOutline/> 
                                    </span>
                                </div> 
                         )
                        )}
                    </>
                 ):null
                }  



               <div className="mt-5">
                    {bain.bain_demi.quantite ?(
                        <>
                            <span className="text-gray-600 text-sm">
                                { (bain.bain_demi.title)} {(bain.bain_demi.quantite)}
                            </span><br></br>
                        
                        </>
                    ):null                                                                                                                                                                               
                    }
                    {bain.bain_entier.quantite ?(
                        <>
                            <span className="text-gray-600 text-sm">
                            {(bain.bain_entier.title)}{(bain.bain_entier.quantite)}
                            </span> <br></br>
                        </>
                        ):null
                    }
                    {bain.cuisine.quantite ? (
                        <>
                            <span className="text-gray-600 text-sm">
                            {(bain.cuisine.title)}{(bain.cuisine.quantite)}
                            </span> <br></br>
                        </>
                    ):null

                    }
                    {bain.kit.quantite ? (
                        <>
                            <span className="text-gray-600 text-sm">
                            {(bain.kit.title)} {(bain.kit.quantite)} 
                            </span> 
                        </>
                    ):null

                    }
                </div> 
                </div>
                <div className="mx-5 py-5">
                    <h1 className="w-2/3 text-xl font-bold text-gray-700">Extérieur</h1>
                    <h2 className=" text-sm font-medium text-gray-700 py-4" >Avec qui ces espaces sont-ils partagés ? </h2>
                    <h3 className=" text-sm font-medium text-gray-500" >Incluez toutes les personnes susceptibles de s'y retrouve </h3>
                </div>
                <div className="px-5 mb-5">
                    <div className="flex">
                        <label className="text-sm text-gray-600">
                            <input type="checkbox" className="pt-5 mx-2"></input>
                            Moi
                        </label>
                    </div>
                    <div className="flex">
                        <label className="text-sm text-gray-600">
                            <input type="checkbox" className="pt-5 mx-2"></input>
                            Famille, ami, ou colocataire
                        </label>
                    </div>
                    <div className="flex">
                        <label className="text-sm text-gray-600">
                            <input type="checkbox" className="pt-5 mx-2"></input>
                            public
                        </label>
                    </div>
                    <button className="h-10 w-40 text-center text-white hover:font-bold rounded my-5" onClick={save}>Enregistrer</button>
                </div>
              
         
          </> 
      )
    }


export default Modifierpiece;
