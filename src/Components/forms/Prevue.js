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
import image1 from "../../assets/images/slider1920x1080_1.jpg";
import image2 from "../../assets/images/slider1920x1080_4.jpg";
import image3 from "../../assets/images/slider1920x1080_5.jpg";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import moment from "moment";
import { connect } from "react-redux";
import Gallery from "./Gallery";
import Response from "./reponse/Response";
import { Formik, Form, Field } from "formik";
import "mapbox-gl/dist/mapbox-gl.css";
import MapGL, { Marker } from "react-map-gl";
import Pin from "../Logements/pin";
import history from "../../history";
import Rating from '@material-ui/lab/Rating';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';


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
  const [showsupp, setShowsupp] = useState(false);
  const [showfam, setShowfam] = useState(false);
  const [showlog, setShowlog] = useState(false);
  const handleClosecourrant = () => setShowcourrant(false);
  const handleShowcourrant = () => setShowcourrant(true);
  const handleClosesupp = () => setShowsupp(false);
  const handleShowsupp = () => setShowsupp(true);
  const handleClosefam = () => setShowfam(false);
  const handleShowfam = () => setShowfam(true);
  const handleCloselog = () => setShowlog(false);
  const handleShowlog = () => setShowlog(true);

  //===================== logement =======================

  const [hebergement, setHebergement] = useState();
  const [comments, setComment] = useState();
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
      axios
        .get(`/logement/${params.logement_id}/details/public`)
        .then((response) => setHebergement(response.data.logement));
      // const interval = setInterval(() => {
      axios
        .get(`/logement/${params.logement_id}/commetaires/all`)
        .then((response) => setComment(response.data.comment));
      // }, 1000);
      // return () => {
      //   clearInterval(interval);
      // }
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
  return (
    <>
      {hebergement ? (
        <div className="w-full bg-white">
          <Navbaruser />
          <div className="bg-white flex justify-center py-5 px-5 h-full ">
            <div className="block w-6/12 shadow mr-5 rounded">
              <Carousel className="bg-white ">
                {hebergement.photo.map((pho) => (
                  <div>
                    <img src={`http://f07f4cb.online-server.cloud${pho.photo.url}`} />
                    {pho.legend ? <p className="legend">{pho.legend}</p> : null}
                  </div>
                ))}
              </Carousel>
              <Gallery logement_id={hebergement.logement.id} />
            </div>
            <div className="py-5 rounded shadow w-1/2 ">
              <table className="  divide-y divide-gray-200 mx-2 w-full">
                <thead className="divide-y divide-gray-200 w-full">
                  <tr className="divide-x divide-gray-200 w-full">
                    <th className=" text-center flex-nowrap w-1/3   text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                      <label className="flex justify-center ">
                        <BsHouseDoor
                          className=""
                          style={{ width: 25, height: 25 }}
                        />
                        <h1 className="tracking-wide text-gray-700 mx-3 text-md my-2 font-bold">
                          {hebergement.logement.name}
                        </h1>
                      </label>
                    </th>
                    <th className=" text-center flex-nowrap w-1/3   text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                      <label className="flex justify-center">
                        <BiMap className="" style={{ width: 25, height: 25 }} />
                        <h1 className="tracking-wide text-gray-700 mx-3 text-md my-2 font-bold">
                          {hebergement.ville}{" "}
                        </h1>
                      </label>
                    </th>
                    <th className=" text-center flex-nowrap w-1/3   text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      <label className="flex justify-center mx-2">
                        <CgCreditCard
                          className="my-1"
                          style={{ width: 25, height: 25 }}
                        />
                        <h1 className="tracking-wide text-gray-700 mx-2 py-1 text-xl font-bold ">
                          {hebergement.calendrier.tarif} €/{" "}
                          <span className="text-lg">nuits</span>{" "}
                        </h1>
                      </label>
                    </th>
                  </tr>
                </thead>
              </table>
              <hr className="my-3"></hr>
              <table className="  divide-y divide-gray-200 mx-2 w-full">
                <thead className="divide-y divide-gray-200 w-full">
                  <tr className="divide-x divide-gray-200 w-full">
                    <th className=" text-center flex-nowrap w-6/12   text-left text-xs leading-4 font-medium text-gray-500 tracking-wider ">
                      <label className="flex justify-center">
                        <VscSignIn style={{ width: 25, height: 25 }} />
                        <p className="text-sm text-gray-600  mt-1 mx-2 mr-4 ">
                          {moment(hebergement.calendrier.startDate).format("L")}
                        </p>

                        <VscSignOut style={{ width: 25, height: 25 }} />
                        <p className="text-sm text-gray-600  mt-1 mx-2 ">
                          {moment(hebergement.calendrier.endDate).format("L")}{" "}
                        </p>
                      </label>
                    </th>
                    <th className=" text-center flex-nowrap w-5/12   text-left text-xs leading-4 font-medium text-gray-500  tracking-wider">
                      <label className="text-sm  ">
                        Conditions d'annulations :
                        <h1 className="tracking-wide text-gray-700 mx-2 py-1 text-base font-bold ">
                          {hebergement.condition}{" "}
                        </h1>
                      </label>
                    </th>
                  </tr>
                </thead>
              </table>
              <hr className="my-3"></hr>
              <table className="  mx-2 w-full">
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
                    <th className=" text-center flex-nowrap w-1/3   text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                      <NavLink to="/signin">
                        <label
                          className="   px-5 py-3 border text-white rounded-md bg-blue-500 hover:text-white hover:font-bold hover:bg-blue-600
                                        cursor-pointer "
                        >
                          Réserver
                        </label>
                      </NavLink>
                      <div
                        onClick={() => conversation(hebergement.logement.id)}
                      >
                        Contacter
                      </div>
                    </th>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
          <div className="flex">
            <div className="mx-5 flex justify-center text-center py-5 shadow rounded w-6/12 h-auto">
              <div className="  w-11/12">
                <h1 className="tracking-wide text-gray-700 mx-3 text-xl font-bold">
                  <span className="uppercase">à </span>propos :
                </h1>
                <p className="tracking-wide text-sm text-gray-700  pt-4  ">
                  {hebergement.logement.description}
                </p>
              </div>
            </div>
            <div className="mx-5   shadow rounded w-6/12 h-56">
              <label className=" flex my-4 mx-5">
                <h1 className="tracking-wide text-gray-700  text-base font-bold">
                  Pièces et espaces :
                </h1>
                <p className="tracking-wide text-sm text-gray-700 mx-3 break-all  ">
                  Chambre: {hebergement.chambres.length}{" "}
                  {hebergement.lits ? <>Lit:{hebergement.lits.length}</> : null}{" "}
                  &nbsp;
                  {hebergement.salon ? (
                    <>Salon:{hebergement.chambres.length}</>
                  ) : null}
                  {hebergement.autres ? (
                    <> Autre espace:{hebergement.autres.length}</>
                  ) : null}
                </p>
              </label>
              <hr></hr>
              <table className="  divide-y divide-x divide-gray-200 mx-2 my-4 w-full">
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
            <MapGL
              className="rounded shadow"
              ref={mapRef}
              mapStyle='mapbox://styles/mapbox/streets-v11'
              {...map}
              width="92%"
              height="400px"
              mapboxApiAccessToken={MAPBOX_TOKEN}
            >
              <Marker
                longitude={map.longitude}
                latitude={map.latitude}
                offsetTop={-20}
                offsetLeft={-10}
              >
                <Pin size={20} />
              </Marker>
            </MapGL>
          </div>

          {/* COMMENTS */}

          <div className="mx-5   py-5 shadow w-7/12 h-auto">
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
                {isAuthenticated && user.is_client === true ? (
                  <Formik
                    validationSchema={LoginSchema}
                    initialValues={{
                      content: null,
                      personnel: 0,
                      qualite_prix: 0,
                      proprete: 0,
                      equipement: 0,
                    }}
                    onSubmit={(values) => {
                      const {
                        match: { params },
                      } = props;

                      axios
                        .post(
                          `/logements/${params.logement_id}/commentaire/`,
                          values
                        )
                        .then((response) => console.log(response));
                    }}
                  >
                    {({ errors, touched }) => (
                      <Form>
                        <div>
                          <h1 className="font-medium text-base"> Laissez un commentaire</h1>

                          <Field
                            component="textarea"
                            name="content"
                            className="outline-none leading-tight py-2 px-2 my-3 h-10 w-10/12 border rounded  focus:bg-white bg-blue-100"
                            placeholder="Mettez votre commentaire ici"
                          />
                          <br />
                          {errors.content && touched.content ? (
                            <div className="text-red-600 text-sm font-bold">
                              {errors.content}
                            </div>
                          ) : null}
                        </div>

                        <div className="my-3 ">
                          <h1>Personnel</h1>
                          <Field
                            type="number"
                            className="my-3 h-10 outline-none border rounded text-center focus:bg-white bg-blue-100"
                            name="personnel"
                            step="1"
                            max="10"
                          />
                          <br />
                        </div>

                        <div className="my-3 ">
                          <h1>Qualité prix</h1>

                          <Field
                            type="number"
                            className="my-3 h-10 outline-none border rounded text-center focus:bg-white bg-blue-100"
                            name="qualite_prix"
                            max="10"
                          />
                          <br />
                        </div>

                        <div className="my-3 ">
                          <h1>Propreté</h1>

                          <Field
                            type="number"
                            className="my-3 h-10 outline-none border rounded text-center focus:bg-white bg-blue-100"
                            name="proprete"
                            max="10"
                          />
                          <br />
                        </div>

                        <div className="my-3 ">
                          <h1>equipement</h1>

                          <Field
                            type="number"
                            className="my-3 h-10 outline-none border rounded text-center focus:bg-white bg-blue-100"
                            name="equipement"
                            max="10"
                          />
                          <br />
                        </div>
                        <button
                          type="submit"
                          className="rounded text-white hover:font-medium py-2 px-4"
                        >
                          CREER
                        </button>
                      </Form>
                    )}
                  </Formik>
                ) : null}
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
export default connect(mapStateToPropos)(Details);
