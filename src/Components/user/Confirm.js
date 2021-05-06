import React, { Component } from 'react';

import { List, ListItem, ListItemText } from '@material-ui/core/';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux'
import axios from 'axios';

export class Confirm extends Component {
  state={
  user:null
  }
componentDidMount(){
    const { user } = this.props;
    axios.get(`/users/${user.id}`).then(response => { this.setState({
      user:response.data.user
    })
  }
        )
}

 
  continue = e => {
    e.preventDefault();
    // PROCESS FORM //
    this.props.nextStep();
  };


  back = e => {
    e.preventDefault();
    this.props.nextStep();
  };
  
  render() {
    if (this.state.user) {
      const values = {
        name:this.state.user.name,
        first_name:this.state.user.first_name
      }

    return (
        <>
        
           <List>
              <ListItem>
            <ListItemText primary="Nom et Prénom  " secondary={`${values.name}  ${values.first_name}`}/>
              </ListItem>
              <hr className="larg"></hr>
              <ListItem>
                <ListItemText primary="Sexe" secondary={this.state.user.sexe} />
              </ListItem>
               <hr></hr>
              <ListItem>
                <ListItemText primary="Date de Naissance" secondary={this.state.user.date_of_birth} />
              </ListItem>
                 <hr></hr>
              <ListItem>
                <ListItemText primary="Email" secondary={this.state.user.email} />
              </ListItem>
                 <hr></hr>
              <ListItem>
            <ListItemText primary="Numéro de téléphone" secondary={this.state.user.mobile} />
              </ListItem>
                 <hr></hr>
              <ListItem>
            <ListItemText primary="Pièce d’identité officielle" />
            {this.state.user.piece.url?(
              <a href={`http://localhost:4000${this.state.user.piece.url}`} target="_blank">Fichier</a>
            ):"Rien"}
              </ListItem>
                 <hr></hr>
                <ListItem>
                <ListItemText primary="Adresse" secondary={this.state.user.adresse} />
              </ListItem>
                 <hr></hr>
              <ListItem>
                <ListItemText primary="Numéro d'urgence" secondary={this.state.user.urgence} />
              </ListItem>
            </List>
            <br />

            <Button
              style={{background: "#F47E54", color:"#fff"}}
              variant="contained"
              onClick={this.back}
            >Modifier</Button>

          
       
        </>
 
    );
    } else {
      return null
    }

  }
}

const mapStateToPropos=(state) =>{
  return{
    ...state.auth
  }
}
export default connect(mapStateToPropos) (Confirm);
