import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import { connect } from 'react-redux'



import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { userUpdateAttempt } from '../../redux/Auth/auth.action';
import {createBrowserHistory} from 'history';
const history = createBrowserHistory();
export class FormUserDetails extends Component {
  state = {
    user: null,
    color: '#F47E54'
  }
  componentDidMount() {
    const { user } = this.props;
    axios.get(`/users/${user.id}`).then(response => {
      this.setState({
        user: response.data.user,
      })
    }
    )
  }

  continue = e => {
    const { user } = this.props;
    e.preventDefault();
  if (this.state.update) {
    
    let formData = new FormData();
    Object.keys(this.state.update).map((item) =>
    {
      // console.log(this.state.update[item])
      formData.append(`${item}`, this.state.update[item])
      
      console.log(formData)
    }
    )
    const asyn = async () =>{
      await 
      axios.put(`/users/${user.id}`, formData)
    }
    asyn()
    history.push("/EditProfil")
    window.location.reload()
  }else{
    this.props.prevStep()
    
    }
  }
  render() {
    if (this.state.user) {

      return (
        <>
          <div className='foutu-overflow'>
            <TextField

              label={' Nom'}
              onChange={(e) => { this.setState({ update: {...this.state.update,  name: e.target.value  }})}}
              defaultValue={this.state.user.name}
              margin="normal"
              fullWidth
            />
            <TextField
              label={'Prénom'}
              onChange={(e) => { this.setState({ update: { ...this.state.update,  first_name: e.target.value }}) }}
              defaultValue={this.state.user.first_name}
              margin="normal"
              fullWidth
            />
            <br />


            <TextField


              label="Sexe"
              onChange={(e) => { this.setState({ update: { ...this.state.update,  sexe: e.target.value }}) }}
              defaultValue={this.state.user.sexe}
              margin="normal"
              fullWidth
            />
            <br />
            <TextField

              label="Date de naissance"
              onChange={(e) => { this.setState({ update: { ...this.state.update,  date_of_birth: e.target.value }}) }}
              defaultValue={this.state.user.date_of_birth}
              margin="normal"
              fullWidth
            />
            <br />
            <TextField

              label="Email"
              onChange={(e) => { this.setState({ update: { ...this.state.update, email: e.target.value }}) }}
              defaultValue={this.state.user.email}
              margin="normal"
              fullWidth
            />
            <br />

            <TextField

              label="Numero de Télephone"
              onChange={(e) => { this.setState({ update: { ...this.state.update,  mobile: e.target.value }}) }}
              defaultValue={this.state.user.mobile}
              margin="normal"
              fullWidth
            />
            <br />
            <input
                type="text"
                label=" Piece d'identité"
                onChange={(e)=>{
                  this.setState({ update: { ...this.state.update,   piece: e.target.files[0] }})
                }}
                margin="normal"
                type="file"
                fullWidth
                accept=".pdf,.png,.jpg,.jpng"
              />
              <br />
            <TextField

              label="Numéro de téléphone"
              onChange={(e) => { this.setState({ update: { ...this.state.update,   urgence: e.target.value }})}}
              defaultValue={this.state.user.urgence}
              margin="normal"
              fullWidth
            />
            <br />
            <br />
            <Button
              style={{ background: this.state.color, color: "#fff" }}
              variant="contained"
              onClick={this.continue}
            >Enregistrer</Button>
          </div>
        </>


      );
    } else {
      return null
    }



  }
}
const mapStateToPropos = (state) => {
  return {
    ...state.auth
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    userUpdateAttempt: (user, values) => { dispatch(userUpdateAttempt(user, values)) }
  }
}
export default connect(mapStateToPropos, mapDispatchToProps)(FormUserDetails);
