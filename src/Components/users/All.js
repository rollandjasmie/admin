import React, { Component } from 'react'
import axios from 'axios';
import { NavLink } from 'react-router-dom';
class Home extends Component {
    state = {
        users:null,
    }
    componentDidMount() {
        axios.get('/user/all').then(response => (
            this.setState({ users: response.data.users })
        ))
    }
    render() {
        const {users}=this.state
        return (
            <>
                {
                users?(
                    <>
                    {users.map(user => 
                    <>
                        <NavLink to={`/user/${user.id}/show`}>
                                {user.first_name}{" "}{user.name}{" "}{user.email}<br />
                        </NavLink>
                            <div onClick={() => { if (window.confirm('Vous êtes sûr?')) { this.delete(user.id) }}}>
                                    Supprimer
                            </div>
                    </>
                        
                        )}
                    </>
                ):null

                }
            </>
        );
    }
}

export default Home;