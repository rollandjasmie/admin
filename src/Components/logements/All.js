import React, { Component } from 'react'
import axios from 'axios';
import { NavLink } from 'react-router-dom';
class Home extends Component {
    state = {
        logements: null,
    }
    componentDidMount() {
        axios.get('/admin/logements/all').then(response => (
            this.setState({ logements: response.data.logements })
        ))
    }
    render() {
        const { logements } = this.state
        return (
            <>
                {
                 logements ? (
                  <>
                   {logements.map(logement =>
                     <>
                      <img width="10%" src={logement.photo} alt="logement"></img><br />
                       {logement.logement.idlogement}<br />
                       {logement.logement.name}<br />
                       <a href={`/logements/${logement.logement.id}/message`}>Contacter le Propriétaire</a>
                      <div>   
                         Propriétaire<br />
                       {logement.proprietaire.name}<br />
                       {logement.proprietaire.first_name}<br />
                       {logement.proprietaire.email}<br />
                       {logement.proprietaire.mobile}<br />
                       tarif:<br />
                       {logement.tarif}€
                      </div>
                      <div>
                        <NavLink to={`/logement/${logement.logement.id}/show`}>
                          Modifier/Supprimer
                        </NavLink>
                      </div>
                     </>
                   )}
                  </>
                 ) : null
                }
            </>
        );
    }
}

export default Home;