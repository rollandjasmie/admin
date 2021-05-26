import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { NavLink } from 'react-router-dom';
import axios from 'axios'





class Affichageequip extends React.Component{
  state={
    tables: null,
  }
  componentDidMount() {
    axios.get(`/logements/${this.props.logement_id}/equi_courants`).then(response => {
      this.setState({
        tables: response.data.tables
      })
      console.log(response.data)
    }
    )
  }
    render(){
      return(
        <Formik>
            <div className="w-full bg-white">
              <div className="flex">
               <h1 className="w-2/3 text-xl font-bold text-gray-700">Equipements</h1>
              <NavLink to={`/modifierequip/${this.props.logement_id}`}>
               <h2 className="text-theme border-2 sansbg rounded px-4 py-2  text-base hover:text-white">Modifier</h2>
               </NavLink>
              </div>
              <div> 
                 {
                this.state.tables?(
                     <>
                  
                    {
                      this.state.tables ? (
                        <>
                          {
                            this.state.tables && this.state.tables.map((title,index) => (<>
                              <div key={index} className="text-gray-600 text-sm ">{title}</div>
                              </>
                            )
                            )
                          }

                        </>
                      )
                        : null
                    }
                     
                     </>
                   )
                   :null
                 }
              </div>
          </div>  
        </Formik>
      )
    }
  }

export default Affichageequip;
