import React, { Component } from 'react'
import axios from 'axios';
import history from '../../../history';
import moment from 'moment'
import { List, ListItem, ListItemText } from '@material-ui/core/';
import Button from '@material-ui/core/Button';
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
            history.push("/user/all")
            window.location.reload()
        }
    }
    render() {
        const { user } = this.state
        if (user) {
            const values = {
                name:this.state.user.name,
                first_name:this.state.user.first_name
            }
        }

        return (
          
             <>
              <div className="flex h-screen">
            <div className="w-3/12 h-screen bg-gray-700">
                <h1 className="bg-gray-800 text-white text-5xl font-bold h-32 flex items-center justify-center"> Runbnb.com </h1>
                <div className="text-white text-base  h-20 flex items-center justify-center">
                 
                       Utilisateurs
                
                    {/* {this.state.users && this.state.users.length} */}
                </div>
    
                <div className="text-white text-base font-bold h-20 flex items-center justify-center bg-indigo-500 bg-opacity-25 border-r-4 border-red-500" >
                        Logements
                   
                    {/* {this.state.logements && this.state.logements.length} */}
                </div>
            </div>
            <div className="flex justify-center w-2/3 mx-5 my-5 h-3/4 overflow-y-auto ">
            {
                    user ? (
                            <div className="w-2/3 mb-5">
                                <div className="flex justify-center">
                                {user.photo ? (
                                    <img width="40%" src={user.avatar} alt="Profil" className="rounded-full"></img>

                                ) :
                                    <img width="40%" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="Profil" className="rounded-full"></img>

                                }<br />
                            </div>
                                <label className="flex justify-center text-xs w-full my-3">  Menbre dépuis: &nbsp;
                                {moment(user.user.created_at).format("LL")}<br /></label>
                                    <List className=" shadow-lg">
                                        <ListItem>
                                            <ListItemText primary="Nom et Prénom  " secondary={`${user.user.name}  ${user.user.first_name}`} />
                                        </ListItem>
                                        <hr ></hr>
                                        <ListItem>
                                            <ListItemText primary="Sexe" secondary={user.user.sexe} />
                                        </ListItem>
                                        <hr></hr>
                                        <ListItem>
                                            <ListItemText primary="Date de Naissance" secondary={user.user.date_of_birth} />
                                        </ListItem>
                                        <hr></hr>
                                        <ListItem>
                                            <ListItemText primary="Email" secondary={user.user.email} />
                                        </ListItem>
                                        <hr></hr>
                                        <ListItem>
                                            <ListItemText primary="Numéro de téléphone" secondary={user.user.mobile} />
                                        </ListItem>
                                        <hr></hr>
                                        <ListItem>
                                            <ListItemText primary="Pièce d’identité officielle" />
                                            {user.user.piece.url ? (
                                                <a href={`http://localhost:4000${user.user.piece.url}`} target="_blank">Fichier</a>
                                            ) : "Rien"}
                                        </ListItem>
                                        <hr></hr>
                                        <ListItem>
                                            <ListItemText primary="Adresse" secondary={user.user.adresse} />
                                        </ListItem>
                                        <hr></hr>
                                        <ListItem>
                                            <ListItemText primary="Numéro d'urgence" secondary={user.user.urgence} />
                                        </ListItem>
                                    </List>
                                    <br />





                              
                            </div>
                    ) : null

                }
            </div>
        </div>    
               
               </>
        );
    }
}

export default User;