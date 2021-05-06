import React, { Component } from 'react';
import FormUserDetails from './FormUserDetails';

import Confirm from './Confirm';


export class UserForm extends Component {
  state = {
    step: 1,
    PrenomEtNom: '',
    Sexe: '',
    DateDeNaissance: '',
    Email: '',
    NumeroDeTel: '',
    Piece: '',
    Adresse:'',
    NumeroDurgence:'',
  };

  // Proceed to next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  };

  // Go back to prev step
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  };




  render() {
      const { step } = this.state;


    switch (step) {
      case 1:
        return (
          <Confirm
          nextStep={this.nextStep}
          />
          );
          case 2:
            return (
          
              <FormUserDetails
              prevStep={this.prevStep}
              nextStep={this.nextStep}
            
             
            />
          );

  
    }
    
  }
}

export default UserForm;
