import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import * as Yup from "yup";
import "./HomePage.css";
import Navbaruser from "./Navbar/Navbaruser";
import { NavLink } from "react-router-dom";
import { BiCalendar } from "react-icons/bi";
import { BiMap } from "react-icons/bi";
import { BsHouseDoor } from "react-icons/bs";
import { CgCreditCard } from "react-icons/cg";
import { VscSignIn } from "react-icons/vsc";
import { VscSignOut } from "react-icons/vsc";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import moment from "moment";
import { connect } from "react-redux";
import Gallery from "./Gallery";
import Response from "./reponse/Response";
import "mapbox-gl/dist/mapbox-gl.css";
import history from "../../history";
import Rating from '@material-ui/lab/Rating';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Commentaire from './Commentairedetails/Commentaire'
import  Map from './Map';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      '& > * + *': {
        marginTop: theme.spacing(1),
      },
    },
  }),
);



const LoginSchema = Yup.object().shape({
  content: Yup.string().required("Le champ ne doit pas être vide"),
});
const MAPBOX_TOKEN =
  "pk.eyJ1Ijoicm9sbGFuZGphc21pZSIsImEiOiJja2drZjM1dGowNnR0MnFwY2V2dHB4cGltIn0.KGbcbcVaTYQhASyG17Q5rQ";

function Details(props) {

  const classes = useStyles();

  //================= carosel ============================

  const [showcourrant, setShowcourrant] = useState(false);
  const [showlog, setShowlog] = useState(false);
  const handleClosecourrant = () => setShowcourrant(false);
  const handleShowcourrant = () => setShowcourrant(true);
  const handleCloselog = () => setShowlog(false);
  const handleShowlog = () => setShowlog(true);

  //===================== logement =======================

  const [hebergement, setHebergement] = useState();
  const [comments, setComment] = useState();
  const [profil,setProfil]=useState()
  const [promotions,setPromotion]=useState()
  const [map, setMap] = useState({ longitude: null, latitude: null });
  let mapRef = useRef();
  useEffect(() => {
    const {
      match: { params },
    } = props;
    const asyn = async () => {
      await axios
        .get(`/logement/${params.logement_id}/map/public`)
        .then((response) =>
          setMap({
            longitude: response.data.log,
            latitude: response.data.lat,
            zoom: response.data.zoom,
          })
        );
          axios.get(`/logements/${params.logement_id}/profil/user`).then(response =>(
            setProfil(response.data)
          ))
        axios.get(`/logements/${params.logement_id}/calendriers`).then(response => {
          setPromotion(response.data.promotion)
        })
        
        
        
        
        axios
        .get(`/logement/${params.logement_id}/details/public`)
        .then((response) => setHebergement(response.data.logement));
        const interval = setInterval(() => {
          axios
          .get(`/logement/${params.logement_id}/commetaires/all`)
          .then((response) => setComment(response.data.comment));
        }, 1000);
        return () => {
          clearInterval(interval);
        }
      };
      asyn();
    }, []);
    
 

  //================== réponse ========================
  const { user } = props;
  const { isAuthenticated } = props;
  const [reponses, setReponse] = useState({ ok: false });
  //================= conversation=======================
  function conversation(id) {
    const asyn = async () => {
      await axios.post(`/logements/${id}/conversations`);
      history.push("/message");
    };
    asyn();
  }

  //=====================================================
  const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"]
  const {
    match: { params },
  } = props;
    return (
    <>
      {hebergement ? (
        <div className="w-full bg-white">
          <Navbaruser />
          <div className="bg-white flex justify-center py-5 px-5 h-full ">
            <div className="block w-6/12 shadow mr-5 rounded h-90">
              
              <Carousel className="bg-white ">
                {hebergement.photo.map((pho) => (
                  <div>
                    <img src={pho} />
                    {promotions && promotions.map(promotion => (
                      <div>
                        {moment(promotion.datevuedebut).format("L") <= moment(new Date()).format("L") && moment(new Date()).format("L") <= moment(promotion.datevuefin).format("L") ? (
                          <div>
                            <label className="prom textprom absolute top-0 right-0 mb-5 border-2 rounded-xl border-orange-500 w-20 bg-orange-500 h-12 
                              text-3xl font-bold text-white flex items-center justify-center ">-{promotion.reduction}%
                            </label>
                          </div>
                          ) : null}
                        </div>
                      )
                    )}

                    {pho.legend ? <p className="legend">{pho.legend}</p> : null}
                  </div>
                ))}
              </Carousel>
              <Gallery logement_id={hebergement.logement.id} />
            </div>
            <div className="py-5 rounded shadow w-1/2   ">
            <table className="  divide-y divide-gray-200  w-full">
                <thead className="divide-y divide-gray-200 w-full">
                  <tr className="divide-x divide-gray-200 w-full">
                    {/* <th className=" text-center flex-nowrap w-6/12   text-left text-xs leading-4 font-medium text-gray-500 tracking-wider ">
                      <label className="flex justify-center">
                        <VscSignIn style={{ width: 25, height: 25 }} />
                        <p className="text-sm text-gray-600  mt-1 mr-4 ">
                          {moment(hebergement.calendrier.startDate).format("L")}
                        </p>

                        <VscSignOut style={{ width: 25, height: 25 }} />
                        <p className="text-sm text-gray-600  mt-1 ">
                          {moment(hebergement.calendrier.endDate).format("L")}{" "}
                        </p>
                      </label>
                    </th> */}
                    <th className=" text-center flex-nowrap w-5/12   text-left font-medium text-gray-500  ">
                      
                       
                        <h1 className=" text-gray-700  text-2xl mb-5 font-bold ">
                        {hebergement.logement.name}
                        </h1>
                     
                    </th>
                  </tr>
                </thead>
              </table>
            <div className="h-80 overflow-y-auto  ">
           
              <table className=" overflow divide-y divide-gray-200  w-full">
                <thead className="divide-y divide-gray-200 w-full">
               
                  <tr className="divide-x divide-gray-200 w-full">
                    {/* <th className=" text-center flex-nowrap w-1/3   text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                      <label className="flex justify-center ">
                        <BsHouseDoor
                          className=""
                          style={{ width: 25, height: 25 }}
                        />
                        <h1 className="tracking-wide text-gray-700 mx-3 text-md my-2 font-bold">
                          {hebergement.logement.name}
                        </h1>
                      </label>
                    </th> */}
                    <th className=" text-center flex-nowrap w-1/3   text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                      <label className="flex justify-center">
                        <BiMap className="" style={{ width: 25, height: 25 }} />
                        <h1 className="tracking-wide text-gray-700 mx-3 text-md my-2 font-bold">
                          {hebergement.ville}{" "}
                        </h1>
                      </label>
                    </th>
                    <th className=" text-center flex-nowrap w-1/3   text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      <label className="flex justify-center">
                        <CgCreditCard
                          className="my-1"
                          style={{ width: 25, height: 25 }}
                        />
                        <h1 className="tracking-wide text-gray-700 py-1 text-lg font-bold ">
                          {hebergement.calendrier.tarif} €/{" "}
                          <span className="text-lg">nuits</span>{" "}
                        </h1>
                      </label>
                    </th>
                  </tr>
                </thead>
              </table>
              <hr className="my-3"></hr>
              <table className="  divide-y divide-gray-200  w-full">
                <thead className="divide-y divide-gray-200 w-full">
                  <tr className="divide-x divide-gray-200 w-full">
                    {/* <th className=" text-center flex-nowrap w-6/12   text-left text-xs leading-4 font-medium text-gray-500 tracking-wider ">
                      <label className="flex justify-center">
                        <VscSignIn style={{ width: 25, height: 25 }} />
                        <p className="text-sm text-gray-600  mt-1 mr-4 ">
                          {moment(hebergement.calendrier.startDate).format("L")}
                        </p>

                        <VscSignOut style={{ width: 25, height: 25 }} />
                        <p className="text-sm text-gray-600  mt-1 ">
                          {moment(hebergement.calendrier.endDate).format("L")}{" "}
                        </p>
                      </label>
                    </th> */}
                    <th className=" text-center flex-nowrap w-5/12   text-left text-xs leading-4 font-medium text-gray-500  tracking-wider">
                      <label className="text-sm  ">
                        Conditions d'annulations :
                        <h1 className="tracking-wide text-gray-700 py-1 text-base font-bold ">
                          {hebergement.condition}{" "}
                        </h1>
                      </label>
                    </th>
                  </tr>
                </thead>
              </table>
              <hr className="my-3"></hr>
              <table className="  w-full">
                <thead className="divide-y divide-gray-200 w-full">
                  <tr className="divide-x divide-gray-200 w-full">
                    <th className=" text-center flex-nowrap w-1/3   text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                      <label className="flex justify-center my-3 text-gray-700">
                        Nombre de personne :
                      </label>
                    </th>
                    <th className=" text-center flex-nowrap w-1/3   text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                      <label className="flex justify-center text-gray-700 my-3">
                        Type de logement :
                      </label>
                    </th>
                    <th className=" text-center flex-nowrap w-1/3   text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider "></th>
                  </tr>
                </thead>
                <thead className="w-full">
                  <tr className="divide-x divide-gray-200 w-full">
                    <th className=" text-center flex-nowrap w-1/3   text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                      <label className="flex justify-center my-3 text-2xl text-gray-600">
                        {hebergement.nombrepersonne}
                      </label>
                    </th>
                    <th className=" text-center flex-nowrap w-1/3   text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                      <label className="flex justify-center text-gray-600 my-3">
                        {hebergement.logement.types}
                      </label>
                    </th>
                    <th className=" text-center flex-nowrap w-1/3  flex items-center text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        {isAuthenticated && user.is_client === true ? (
                            <label className="px-5 py-3 border text-white rounded-md bg-blue-500 hover:text-white hover:font-bold hover:bg-blue-600
                                            cursor-pointer "
                            >
                              <NavLink to="/stripe">
                                Réserver

                              </NavLink>
                            </label>
                        ) :
                        (
                          <label className="px-5 py-3 border text-white rounded-md bg-blue-500 hover:text-white hover:font-bold hover:bg-blue-600
                                  cursor-pointer "
                          >
                            <NavLink to={{pathname:"/connexion",reservation:`/logement/${params.logement_id}/detail`}}>
                            Réserver
                          </NavLink>
                            </label>
                          
                          )}
                      
                      
                      
                    </th>
                  </tr>
                </thead>
                  </table>
                  <hr className="my-3"></hr>
                  <table className="  w-full">
                
                  <thead className="w-full">
                    <tr className="divide-x divide-gray-200 w-full">
                      
                          {promotions && promotions.map(promotion=>(
                            <>
                            {moment(promotion.datevuedebut).format("L") <= moment(new Date()).format("L") && moment(new Date()).format("L") <= moment(promotion.datevuefin).format("L")?(
                                <th className=" text-center flex-nowrap w-1/3   text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                        <label className="flex justify-center my-3 text-gray-700">
                               
                                  Promotion< br />
                                    {promotion.datedebut} à 
                                    {promotion.datefin}< br />
                                
                                    </label>
                                  </th>
                                    ):null  }
                             </>
                            )
                          )}
                      <th className=" flex-nowrap text-left text-xs leading-4 font-medium text-gray-500  tracking-wider ">
                            <label className="flex text-gray-600 my-3">
                              <div>
                                <p className="mx-5 uppercase"> propriétaire :</p>
                                  {profil?(<>
                                    <div className="flex mx-5 my-3 ">
                                      <img className="overflow-x-hidden mr-3 rounded-full" style={{width:40,height:40,}} 
                                      src={profil.avatar}>

                                      </img>
                                      <label>
                                          <h1 className="mx-3  text-sm font-bold text-blue-500 uppercase">{profil.user.name}{"  "}
                                                            {profil.user.first_name}</h1>
                                          <p className="mx-3  my-2 text-xs font-medium text-gray-500">  Membre depuis{"  "}
                                                            {monthNames[moment(profil.user.created_at).month()]}
                                                            {"  "}
                                                            {moment(profil.user.created_at).years()}</p>
                                      </label>
                                      {/* {profil.user.name}{"  "}
                                      {profil.user.first_name}< br />
                                      Membre depuis{"  "}
                                      {monthNames[moment(profil.user.created_at).month()]}
                                      {"  "}
                                      {moment(profil.user.created_at).years()}
                                      <div
                                      onClick={() => conversation(hebergement.logement.id)}
                                      >
                                      Contacter
                                    </div> */}
                                    </div>
                                      {
                                        map.contact?(
                                          <>
                                            {
                                              isAuthenticated && user.is_client === true && map.contact.includes(user.id)?(
                                                <>
                                                Email:{profil.user.email}<br />
                                                Mobile:{profil.user.mobile}<br />
                                                  <button className="contacterr mx-5 px-4 py-2 rounded text-white "
                                                    onClick={() => conversation(hebergement.logement.id)}
                                                  >
                                                    Message
                                                  </button >
                                                </>
                                              ):null
                                            }
                                          </>
                                        ):null
                                      }
                                    </>
                                  ):null}
                                </div>
                            </label>
                    
                    </th>
                    </tr>
                  </thead>
              </table>
              </div>
              </div>
          </div>
          <div className="flex mx-5 ">
            <div className="flex justify-center text-center py-5 shadow rounded w-1/2 h-56  mr-5">
              <div className="  w-11/12 h-48">
                <h1 className="tracking-wide text-gray-700 mx-3 text-xl font-bold">
                  <span className="uppercase">à </span>propos :
                </h1>
                <p className="tracking-wide text-xs text-gray-700  pt-4 h-28 overflow-auto ">
                  {hebergement.logement.description}<br />
                  {hebergement.logement.unique}
                </p>
              </div>
            </div>
            <div className=" shadow rounded w-6/12 h-56">
              <label className=" flex items-center justify-center h-20">
                <h1 className="tracking-wide text-gray-700  text-base font-bold">
                  Pièces et espaces :
                </h1>
                <p className="tracking-wide text-sm text-gray-700 mx-3 break-all  ">
                  Chambre: {" "} {hebergement.chambres.length}{" "}
                  {hebergement.lits ? <>Lit: {" "} {hebergement.lits.length}</> : null}{" ,"}
                  &nbsp;
                  {hebergement.salon ? (
                    <>Salon: {" "}{hebergement.chambres.length}</>
                  ) : null}{" ,"}
                  {hebergement.autres ? (
                    <> Autre espace:{" "} {hebergement.autres.length}</>
                  ) : null}
                  {/* {hebergement.chambres.map((chambre,index)=>(
                               <div>
                                 {chambre.chambre}{" "}{index + 1}<br />{
                                 chambre.lits.map(lit=>(
                                   lit.name
                                 ))
                                 }
                               </div>
                             ))} */}
                </p>
              </label>
              <hr></hr>
              <table className="  divide-y divide-x divide-gray-200  my-4 w-full">
                <thead className="divide-y divide-gray-200 w-full">
                  <tr className="divide-x divide-gray-200 w-full h-16">
                    <th className=" text-center flex-nowrap w-1/2   text-left text-xs leading-4 font-medium text-gray-500 tracking-wider ">
                      <label className="flex justify-center">
                        <h1
                          className="tracking-wide text-gray-700  text-base font-bold cursor-pointer hover:text-blue-500"
                          onClick={handleShowcourrant}
                        >
                          Equipements{" "}
                        </h1>
                      </label>
                      <Modal
                        size="md"
                        show={showcourrant}
                        onHide={handleClosecourrant}
                        backdrop="static"
                        keyboard={false}
                      >
                        <Modal.Header closeButton className="h-20">
                          <Modal.Title className="text-gray-600 text-base flex justify-center w-full">
                            {" "}
                            Liste des equipements
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <div className="h-64 h-64 ">
                            <div className="w-11/12 mx-3">
                              <label className=" text-gray-500 text-sm mt-4 ">
                                {hebergement.equipements.map((equipement) => (
                                  <li className="my-2">
                                    {equipement}
                                    <br />
                                  </li>
                                ))}
                              </label>
                            </div>
                          </div>
                        </Modal.Body>
                        <Modal.Footer></Modal.Footer>
                      </Modal>
                    </th>
                    <th className=" text-center flex-nowrap w-1/2   text-left text-xs leading-4 font-medium text-gray-500  tracking-wider">
                      <label className="text-sm  ">
                        <h1
                          className="tracking-wide text-gray-700  text-base font-bold cursor-pointer hover:text-blue-500"
                          onClick={handleShowlog}
                        >
                          Règlements
                        </h1>
                      </label>
                      <Modal
                        size="md"
                        show={showlog}
                        onHide={handleCloselog}
                        backdrop="static"
                        keyboard={false}
                      >
                        <Modal.Header closeButton className="h-20">
                          <Modal.Title className="text-gray-600 text-base flex justify-center w-full">
                            {" "}
                            Règlements
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <div className="h-64 h-64 ">
                            <div className="w-11/12 mx-3">
                              <label className=" text-gray-500 text-sm mt-4 ">
                                <ul className="text-gray-600">
                                  Règlemtents intérieurs :
                                </ul>
                                {hebergement.regleints.map((equipement) => (
                                  <li className="mx-3">
                                    {equipement}
                                    <br />
                                  </li>
                                ))}
                                <div className="mt-4">
                                  <ul className="text-gray-600">
                                    Heure d'arrivée :
                                  </ul>
                                  <li className="mx-3">
                                    {hebergement.regles.arrive1} à{" "}
                                    {hebergement.regles.arrive2} <br />
                                  </li>
                                </div>
                                <div className="my-2">
                                  <ul className="text-gray-600">
                                    Heure de départ :
                                  </ul>
                                  <li className="mx-3">
                                    {hebergement.regles.depart1} à{" "}
                                    {hebergement.regles.depart2}
                                  </li>
                                </div>
                              </label>
                            </div>
                          </div>
                        </Modal.Body>
                        <Modal.Footer></Modal.Footer>
                      </Modal>
                    </th>
                  </tr>
                </thead>
              </table>
            </div>
          </div>

          <div className="my-5 w-full flex justify-center">
             <Map map={map} />
          </div>

          {/* COMMENTS */}

          <div className="mx-5   py-5 shadow w-5/12 h-auto">
            <div className="  w-11/12 mx-5">
              <h1 className="tracking-wide text-gray-700  text-center mx-3 text-xl font-bold">
                <span className="uppercase"></span>Liste des commentaires :
              </h1>
              <p className="tracking-wide text-sm text-gray-700  pt-4  ">
                {comments &&
                  comments.map((comment) => (
                    <div className="my-5">
                      <div className="flex  h-16 mt-3 ">
                          <h1 className="text-gray-700  text-xl font-bold">
                            {comment.commentaires.name}
                          </h1>
                          <p className="text-gray-600 mx-4 my-1 text-sm  ">
                            {moment(comment.commentaires.created_at).format("lll")}
                          </p>
                      </div>
                      note: 
                      <div className="flex w-full my-4">
                         <div className="w-1/2">
                              <div className={`${classes.root}`}>
                                Personnel:
                        
                                <Rating name="half-rating-read" defaultValue={comment.commentaires.personnel / 2} precision={0.5} max={5} readOnly />
                              </div>
                             <div className={`my-2 ${classes.root}`}>
                                Qualité/Prix:
                                <Rating name="half-rating-read" defaultValue={comment.commentaires.qualite_prix / 2} precision={0.5} max={5} readOnly />
                              </div>
                          </div>
                          <div>
                              <div className={`${classes.root}`}>
                                  Propreté:
                                  <Rating name="half-rating-read" defaultValue={comment.commentaires.proprete / 2} precision={0.5} max={5} readOnly />
                              </div>
                              <div className={`my-2 ${classes.root}`}>
                                  Équipements:
                                  <Rating name="half-rating-read" defaultValue={comment.commentaires.equipement / 2} precision={0.5} max={5} readOnly />
                              </div>
                          </div>
                      </div>
                      <div className="text-gray-600 font-normal">
                          {comment.commentaires.content}
                      </div>
                      {comment.reponse &&
                        comment.reponse.map((repon) => (
                          <div>
                            Réponse(s)
                            <br />
                            {repon.content}
                          </div>
                        ))}
                      {isAuthenticated && user.is_client === false ? (
                        <Response reponse={reponses.ok} />
                      ) : null}
                    </div>
                  ))}
                  <Commentaire logement_id={params.logement_id}/>
             

              </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
const mapStateToPropos = (state) => {
  return {
    ...state.auth,
  };
};
export default connect(mapStateToPropos)(Details)
