import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { NavLink } from 'react-router-dom';
import axios from 'axios';




class Affichagetitre extends React.Component{
  state={
    name:null,
    description:null,
    unique:null
  }
  componentDidMount(){
    axios.get(`/logements/${this.props.logement_id}`).then(response =>{
      this.setState({
        name: response.data.logement.name,
        description: response.data.logement.description,
        unique: response.data.logement.unique,
      })
      console.log(response)
      } 
    )

   }
    render(){
      return(
        <Formik>
            <div className="w-full bg-white">
              <div className="flex">
              <h1 className="w-2/3 text-xl font-bold text-gray-700">Titre et Description</h1>
               {
                 this.state.name?(
                  <NavLink to={{ pathname: `/modifiertitre/${this.props.logement_id}`, state: { logement: this.state } }} ide={this.state}>
                    <h2 className="text-theme border-2 sansbg rounded px-4 py-2  hover:text-white text-base">Modifier</h2>
                  </NavLink>
                 ):null
               }
              
              </div>
            <div>
              {this.state.name ? (<h1 className="pt-3 uppercase font-bold text-base text-gray-800 ">{this.state.name}</h1>
                    ):null
                  }
              {this.state.description ? (<h1 className="pt-3 text-sm text-gray-700 w-9/12">{this.state.description}</h1>
              ) : (<p className="pt-3 text-sm text-gray-700">Superbe T2 avec terrasse et vue sur la mer à 180° entièrement rénové dans une résidence de standing ...</p>)
              }
                
              </div>
            
          </div>  
        </Formik>
      )
    }
  }

export default Affichagetitre;
