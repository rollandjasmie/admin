import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import DropDown from '../DropDown/DropDown';
import logoo from '../../../assets/images/logo.jpg';
import '../../../App.css'
export default class Navbarin extends Component {
    render() {
        return (
            <>
                <header className="text-gray-700 bg-white">
                  <div className="entete  mx-auto flex flex-wrap p-1  md:flex-row items-center">
                    <NavLink to="/" className="homelog1 my-3 flex-grow sm:w-6/12 md:w-6/12 lg:w-8/12 flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                      <img className="homelog  w-40 ml-4" src={logoo}></img>
                    </NavLink>
                    <nav className="deja flex-grow lg:visible md:visible sm:invisible  md:ml-auto flex flex-wrap items-center text-base justify-center ">
                      <a className="deja flex-grow lg:visible md:visible sm:invisible hover:text-gray-900">Déjà partenaire ?</a>
                    </nav>
                    <form>
                    <div className="cobloc w-full flex-grow  lg:mr-8 md:mr-8 sm:mr-8 ">
                    <NavLink to="/signup">  
                   <button className="butcon flex-grow hover:font-bold text-white
                      rounded hover:bg-orange-500 shadow-lg px-4 py-2 lg:mr-4 md:mr-4 sm:mr-2">Se connecter</button>
                    </NavLink>   
                    </div>
                    
                    </form>
                  </div>
                </header>
            </>
        )
    }
}