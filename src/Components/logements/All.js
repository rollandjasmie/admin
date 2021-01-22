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
                                    <img width="10%" src={logement.photo} alt="logement"></img>
                                    <NavLink to={`/user/${logement.logement.id}/show`}>
                                        {logement.logement.name}<br />
                                    </NavLink>
                                    <div onClick={() => { if (window.confirm('Vous êtes sûr?')) { this.delete() } }}>
                                        Supprimer
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