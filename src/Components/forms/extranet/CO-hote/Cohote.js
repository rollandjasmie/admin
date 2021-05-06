import React, { useEffect,useState } from "react";
import { Formik, Form, Field } from "formik";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Navbarextra from "../../Navbar/Navbarextra";
import Navbarextra2 from "../../Navbar/Navbarextra2";
import { ImWarning } from "react-icons/im";
import Modal from 'react-bootstrap/Modal'
import Loading from 'react-loading';
import history from '../../../../history';
function Cohote(props) {
  const imagess ="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [loading,setloading] = useState(false)
    const {match:{params}}=props
    const [admin, setAdmin] = useState({admin:null,cohote:null})
    const [loge, setLoge] = useState({  logement_id:null, adresse:null})

   
      useEffect(() =>{
        axios.get(`/cogestion/${params.logement_id}/index`).then(response=>
          setAdmin({ admin: response.data.admin, cohote: response.data.cohote} 
            )
          )

          axios.get(`/logements/${params.logement_id}`).then(res=>{
            setLoge({
              logement:res.data.logement,
              adresse:res.data.adresse
            })
          })
      },[] )
      function retire(id){
        const asy = async () =>{
          setloading(true)
          await
          axios.post(`/cogestion/${params.logement_id}/${id}`).then()
          history.push(`/logements/${params.logement_id}/Co-hote`)
        }
        asy()
        console.log(id)
      }
      if (loading) {
        return <Loading />
      } else {
        return (
        <div className="w-full bg-white h-full mb-5">
          <div className="h-24">
            <Navbarextra logement_id={params.logement_id} />
          </div>
          <div>
            <Navbarextra2 logement_id={params.logement_id}/>
          </div>
          <div className="my-5 py-5 px-5 flex">
          <div className=" py-2">
                      {
                       loge.logement?(
                    <h1 className="text-xl font-medium   text-gray-700 ">{loge.logement.name}-  {loge.adresse}  <span className="font-normal text-base"> {loge.logement.idlogement} </span></h1>
                        ):null
                      }
                  </div>
            <div className="mx-5">
              <NavLink to={`/prevuer/${params.logement_id}/prevue`}>
                  <label className="sansbg rounded px-3 py-2 text-theme hover:text-white
                      hover:font-bold ">
                      Prévisualiser l'annonce
                  </label>
              </NavLink>
              <NavLink to={`/logements/${params.logement_id}/calendrier`}>
                  <label className="border-2 rounded px-3 py-2 sansbg text-theme hover:text-white
                      hover:font-bold mx-4">
                      Voir le calendrier
                  </label>
              </NavLink>
            </div>
          </div>
          <div className=" my-5">
            <div className="mx-4 flex w-5/6 h-10   ">
              <NavLink to={`/extraheb/${params.logement_id}`}>
                <label className="mx-4  h-10 text-sm text-gray-500 hover:text-gray-600 cursor-pointer ">
                  Détails de l'annonce
                </label>
              </NavLink>
              <NavLink to={`/logements/${params.logement_id}/reservation`}>
                <label className="mx-4  h-10 text-sm text-gray-500 hover:text-gray-600 cursor-pointer ">
                  Paramètre de réservation
                </label>
              </NavLink>
              <NavLink to={`/logements/${params.logement_id}/frais_complementaires`}>
              <label className="mx-4  h-10 text-sm text-gray-500 hover:text-gray-600 cursor-pointer  ">
                Frais complémentaire
              </label>
              </NavLink>
              <NavLink to={`/logements/${params.logement_id}/Taxe`}>
              <label className="mx-4  h-10 text-sm text-gray-500  hover:text-gray-600 cursor-pointer">
                Taxe de séjour locale
              </label>
              </NavLink>
              <label className="mx-4  h-10 text-sm text-theme font-bold border-b-4 hr-theme ">
                Co-gestionnaire
              </label>
            </div>
            <div className="w-4/6 ">
              <hr className="w-full mx-5"></hr>
            </div>
          </div>
  
          {/* shshttsr */}
          <div className="bg-white">
            <h1 className="mx-5 mt-5 text-sm font-bold text-gray-600">Besoin d’aide pour gérer votre annonce ?</h1>
                <div className="mx-5">
                    <h1 className="mx-5 my-4 text-sm font-medium text-gray-500">Vos co-gestionnaires vous aident à optimiser votre hébergement. </h1>
                    <label className="mx-5 border-2 rounded border-blue-500 text-blue-500 w-32 h-12 flex items-center justify-center hover:text-white
                     hover:bg-blue-500 hover:font-medium cursor-pointer " onClick={handleShow}>Inviter un ami</label>
                      <Modal
                      size= "md"
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Formik
            initialValues={{ email: '', condition:''}}
            onSubmit={value=>{
              axios.post(`/logements/${params.logement_id}/invitation`,value).then(response=>{
                if (response.data.resultat) {
                  alert(response.data.resultat)
                }
              }
              )
              handleClose()
            }}
          >
            {({handleSubmit})=>(
            <Form onSubmit={handleSubmit}>
              <Modal.Header closeButton className="h-20">
                <Modal.Title  className="text-gray-600 text-base flex justify-center w-full"> Inviter un ami</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h1 className="tex-gray-600 text-sm my-2">Adresse e-mail</h1>
                <Field required type="email" name="email" className="w-64 h-10 text-sm px-3 my-3 border rounded bg-gray-100 focus:bg-white" placeholder="Entrez un adresse e-mail valide"></Field>
                <div className="flex text-gray-500 text-xs mt-4">
                  <Field required type="checkbox" name="condition" className="mr-3"></Field>
                  <label className="flex text-gray-500 text-xs ">
                    J’accepte les Conditions générales prévues pour le service rendu par des co-gestionnaires.
                  </label>
                </div>
                <label type="submit" className="flex text-gray-500 text-xs mt-4">
                  NB : Lorsque vous ajoutez un co-gestionnaire, il peut agir en votre nom. Vous êtes donc responsable des sanctions lorsqu’il accueille des voyageurs dans votre hébergement.
                </label>
              </Modal.Body>
              <Modal.Footer>
           
                <button className="mx-5 border-2 rounded  w-32 h-12 flex items-center justify-center 
                    hover:font-medium cursor-pointer text-white ">Inviter</button>
              </Modal.Footer>
            </Form>
                )}
          </Formik>
        </Modal>
                </div>
  
                <hr className="w-5/12 mx-5 mt-5"></hr>
              {admin.admin?(
                <div className="flex mx-5 my-3 ">
                <img className="   overflow-x-hidden mr-3 rounded-full" src={admin.admin.photos} style={{width:80,height:80,}}></img>
                    <label>
                    <h1 className="mx-3 mt-4 text-sm font-bold text-blue-500">{admin.admin.admin.name}{" "}{admin.admin.admin.first_name}</h1>
                    <p className="mx-3  my-2 text-sm font-medium text-gray-500">Administrateur de l’hébergement</p>
                    </label>
                </div>
  
              ):null}
            <hr className="w-5/12 mx-5 mt-3"></hr>
  
  
              {/* AFFICHEGE CO-HOTE */}
  
          
          
                {admin.cohote && admin.cohote.map(co=>(
                <div className="flex mx-5 my-3 ">
                    {co.photos? (
                    <img className=" overflow-x-hidden mr-3 rounded-full" src={imagess} style={{ width: 80, height: 80, }}></img>):(
                    <img className="overflow-x-hidden mr-3 rounded-full" src={imagess} style={{ width: 80, height: 80, }}></img>)}
                    <label className="w-4/12">
                  <h1 className="mx-3 mt-4 text-sm font-bold text-blue-500">{co.cohote.name}{" "}{admin.cohote[0].cohote.first_name}</h1>
                      <p className="mx-3  my-2 text-sm font-medium text-gray-500">Votre co-gestionnaire</p>
                    </label>
                    <h1 className="mx-3 mt-4 text-sm font-bold text-blue-500 cursor-pointer"  onClick={()=>{retire(co.cohote.id)}}>Retirer </h1>
                </div>
  
                ))}
              
          </div>
          </div>
      );
        
      }
  }


export default Cohote;
