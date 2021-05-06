import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import history from '../../../history';
import DropDown from '../DropDown/DropDown';
import axios from 'axios';
import Dropdow1 from '../../user/Dropdow1';
import logoo from '../../../assets/images/logo.jpg';
export default class Navboard extends Component {
  state={

  }
  componentDidMount() {
    axios.get(`logements/`).then(res => {
      this.setState({
        logements: res.data.logement
      })
    })
  }
  show=(id)=>{
    history.push(`/extraheb/${id}`)
  }
    render() {
        return (
            <>
                <header className="text-gray-700 bg-white">
                  <div className="container mx-auto flex flex-wrap p-1 flex-col md:flex-row items-center">
                    <NavLink to="/" className="flex title-font font-medium items-center text-gray-900 mb-3 md:mb-0">
                      <img className="w-40 mx-3" src={logoo}></img>
                 
                    </NavLink>
                      
                    <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center mr-4">
                      
                      <Dropdow1 />
                    </nav>
              
                  </div>
                </header>
            </>
        )
    }
}