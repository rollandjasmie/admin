import React, { Component } from 'react'
import axios from 'axios';
import history from '../../history';
import moment from 'moment'
class User extends Component {
    state = {
        user: null,
    }

    componentDidMount() {
        const { match: { params } } = this.props
        axios.get(`/user/${params.user_id}/show`).then(response => (
            this.setState({ user: response.data.user })
        ))
    }
    async delete(id) {
        {
            alert("avant")
            await axios.delete(`/user/${id}/delete`)
            alert("aprés")
            history.push("/user/all")
            window.location.reload()
        }
    }
    render() {
        const { user } = this.state
        return (
            <>
                {
                    user ? (
                        <>
                            <div >
                                {user.photo ? (
                                    <img width="30%" src={user.avatar} alt="Profil"></img>

                                ) :
                                    <img width="30%" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="Profil"></img>

                                }<br />
                                {user.user.first_name}<br />
                                {user.user.name}<br />
                                {user.user.email}<br />
                                {user.user.adresse}<br />
                                {user.user.date_of_birth}<br />
                                {user.user.sexe}<br />
                                {user.user.mobile}<br />
                                {user.user.urgence}<br />
                                Menbre dépuis:<br />
                                {moment(user.user.created_at).format("LL")}<br />
                            </div>
                            <div onClick={() => { if (window.confirm('Vous êtes sûr?')) this.delete(user.user.id) }}>
                                Supprimer
                            </div>
                        </>
                    ) : null

                }
            </>
        );
    }
}

export default User;