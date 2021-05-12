import React from 'react'
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from './home/Home';
import users from './users/All'
import logements from './logements/All'
import logement from './logements/Show'
import adminLogementMessages from './logements/message/Affichage'
import HomePage from '../forms/HomePage';
import Extraheb from '../../Components/forms/extranet/Extraheb';
import PhotoLegende from "../../Components/extranetphoto/PhotoLegende";
import ThumbnailGallery from "../../Components/extranetphoto/ThumbnailGallery"
import Details from '../../Components/forms/Details'
import Modifierpiece from '../../Components/forms/extranet/pieces/Modifierpiece';
import Modifierequip from '../../Components/forms/extranet/equipement/Modifierequip';
import Modifiertitre from '../../Components/forms/extranet/titre/Modifiertitre';
import Modifieracces_voyageur from '../../Components/forms/extranet/acces_voyageurs/Modifieracces_voyageur';
import Ressources from '../../Components/forms/extranet/Ressources_voyageur/Modificationressources_voyageur';
import Reglement_interieur from '../../Components/forms/extranet/Parametre_reservation/Reglement_interieur'
import Regles from "../../Components/forms/extranet/Parametre_reservation/Regles";
import Reservation from '../../Components/forms/extranet/Reservation';
import Frais_complementaire from '../../Components/forms/extranet/Frais/Frais_complementaire'
import Modifierfrais from '../../Components/forms/extranet/Frais/Modifierfrais'
import Calendrier from '../../Components/forms/extranet/Calendrier'
import Message from '../../Components/forms/extranet/Boite_de_réception/Affichage'
import Messageadmin from '../../Components/forms/extranet/Boite_de_réception/Affichageadmin'
import Promotion from '../../Components/forms/extranet/Promotion/Affichage'
import Recapitulatif from '../../Components/forms/extranet/Promotion/Recapitulatif'
import Synchro from '../../Components/forms/extranet/tarif_calendrier/Synchro'
import Reservation_extra from '../../Components/forms/extranet/Reservation/Reservation';
import Details_reservation from '../../Components/forms/extranet/Reservation/Details_reservation';
import Taxe from '../../Components/forms/extranet/Taxes/Taxe';
import Cohote from '../../Components/forms/extranet/CO-hote/Cohote';
import Reservationtout from '../../Components/forms/tout_reservation/Reservationtout';
import Commentaires from '../../Components/forms/extranet/Commentaire/Commentaire';
import Destination from '../../Components/forms/Destination/Destination'
import Offre from '../../Components/forms/tout_offres/Offre'
import ToutDestination from '../../Components/forms/Destination/Tout_destination'
import toutcalendriers from '../../Components/forms/tout_calendrier/Toutcaledrier';
import invitation from '../../Components/forms/invitation/invitation'
import '../../loader.js'
import prevu from '../../Components/forms/Prevue'
import Home2 from '../../Components/forms/extranet/Home/Home';
import adminuser from "./users/User";
import compta from '../../Components/forms/extranet/compta/Compta';
import { connect } from 'react-redux';


import admin from './admin/Admins'
import add_admin from './admin/Add'
import show_admin from './admin/Update'

class App extends React.Component {
    render() {
        const { isAuthenticated } = this.props;
        const { user } = this.props;
        return (
              <BrowserRouter>
                <Switch>
                    {/* USER */}
                    <Route exact path="/" component={Home} />
                    <Route exact path="/user/all" component={users} />
                    <Route exact path="/user/:user_id/adminshow/" component={adminuser} />

                    {/* LOGEMENT  */}

                  <Route exact path="/logements/all" component={logements} />
                  <Route exact path="/logement/:logement_id/show" component={logement} />
                  <Route excat path="/logements/:logement_id/adminmessage" component={adminLogementMessages} />
                  <Route exact path="/extraheb/:logement_id" component={Extraheb} />
                  <Route exact path="/logement/:logement_id/detail" component={Details} />

                    {/*  EXTRANET */}

                  <Route exact path="/extraheb/:logement_id" component={Extraheb} />
                  <Route exact path="/modifierpiece/:logement_id/chambre" component={Modifierpiece} />
                  <Route exact path="/logements/:logement_id/photos/" component={ThumbnailGallery} />
                  <Route exact path="/logement/:logement_id/photo/:photo_id" component={PhotoLegende} />
                  <Route exact path="/modifierequip/:logement_id" component={Modifierequip} />
                  <Route exact path="/modifiertitre/:logement_id" component={Modifiertitre} />
                  <Route exact path="/modifieracces_voyageur/:logement_id" component={Modifieracces_voyageur} />
                  <Route exact path="/logements/:logement_id/ressources" component={Ressources} />
                  <Route exact path="/logements/:logement_id/reservation" component={Reservation} />
                  <Route exact path="/logements/:logement_id/Reglement_interieur" component={Reglement_interieur} />
                  <Route exact path="/logements/:logement_id/Regles" component={Regles} />
                  <Route exact path="/logements/:logement_id/frais_complementaires" component={Frais_complementaire} />
                  <Route exact path="/logements/:logement_id/modifier_frais" component={Modifierfrais} />
                  <Route exact path="/logements/:logement_id/calendrier" component={Calendrier} />
                  <Route exact path="/logements/:logement_id/message" component={Message} />
                  <Route exact path="/logements/:logement_id/messageadmin" component={Messageadmin} />
                  <Route exact path="/logements/:logement_id/promotion" component={Promotion} />
                  <Route exact path="/logements/:logement_id/recapitulatif" component={Recapitulatif} />
                  <Route exact path="/logements/Synchro" component={Synchro} />
                  <Route exact path="/logements/:logement_id/reservation_extra" component={Reservation_extra} />
                  <Route exact path="/logements/:logement_id/details_reservation/:id" component={Details_reservation} />
                  <Route exact path="/logements/:logement_id/Taxe" component={Taxe} />
                  <Route exact path="/logements/:logement_id/Co-hote" component={Cohote} />
                  <Route exact path="/logements/:logement_id/Home" component={Home2} />
                  <Route exact path="/proprietaire/reservation" component={Reservationtout} />
                  <Route exact path="/logements/:logement_id/commentaire" component={Commentaires} />
                  <Route exact path="/destination/:destinations/destination" component={Destination} />
                  <Route excat path="/offres/offres" component={Offre} />
                  <Route excat path="/desination/logements" component={ToutDestination} />
                  <Route exact path="/proprietaire/calendriers" component={toutcalendriers} />
                  <Route exact path="/invitaion/cogestionaire/:time/:user/:logement_id/:date" component={invitation} />
                  <Route exact path="/prevuer/:logement_id/prevue" component={prevu} />
                  <Route exact path="/compta/:logement_id" component={compta} />
                    
                    {/* ADMIN  */}
                    
                    
                    {
                       user.niveau === "2"  ? (
                            <>
                                <Route exact path="/admin" component={admin} />
                                <Route exact path="/admin/add" component={add_admin} />
                                <Route exact path="/admin/show/:admin_id" component={show_admin} />
                                
                            </>
                        ) : null
                    }
                </Switch>
            </BrowserRouter>
        );
    }
}
const mapStateToprops = (state) => {
    return {
        ...state.auth
    }
}
export default connect(mapStateToprops)(App);