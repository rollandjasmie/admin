import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { NavLink } from 'react-router-dom';
import axios from 'axios'




class Affichageacces_voyageur extends React.Component{
  state = {
    acces: null,
    aide1: null,
    aide2: null,
    autre:null
  }
  componentDidMount() {
    axios.get(`/logements/${this.props.logement_id}/acces_voyageurs`).then(response => {
      this.setState({
        acces: response.data.acces.acces,
        aide1: response.data.acces.aide1,
        aide2: response.data.acces.aide2,
        autre: response.data.acces.autre,
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
               <h1 className="w-2/3 text-xl font-bold text-gray-700">Accès aux voyageurs</h1>
              {
                this.state.acces ? (
              <NavLink  to={{ pathname: `/modifieracces_voyageur/${this.props.logement_id}`, state: { voyageur: this.state } }} >
               <h2 className="text-theme border-2 sansbg rounded px-4 py-2  hover:text-white">Modifier</h2>
               </NavLink>
                ):null
                }
              </div>
              
              <div className="py-4 flex "> 
                  <div className="w-1/3 py-1">
                <h1 className=" text-gray-600 text-sm">Indiquez aux voyageurs les parties du logement auxquelles ils auront acccès</h1>
                   
                  </ div>
                 
              </div>
            
            </div>  
        </Formik>
      )
    }
  }

export default Affichageacces_voyageur;
