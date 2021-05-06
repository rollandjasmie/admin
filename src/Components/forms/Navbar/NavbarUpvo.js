import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DropDown from '../DropDown/DropDown';
import logoo from '../../../assets/images/logo.jpg';
export default class NavbarUp extends Component {
    render() {
        return (
            <>
                   <header className="text-gray-700 bg-white">
                <div className=" mx-auto flex flex-wrap p-1  md:flex-row items-center">
                    <Link to="/" className="homelog1 sm:w-8/12 flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                      <img className="homelog w-40 ml-4" src={logoo}></img>
                    </Link>
                    <nav className="lg:visible md:visible sm:hidden  md:ml-auto flex flex-wrap items-center text-base justify-center">
                      <a className="lg:visible md:visible sm:hidden mr-5 hover:text-gray-900"></a>
                    </nav>
                    <form>
                    <div className="flex lg:mr-8 md:mr-8 sm:ml-16">
                    <Link to="/inscription">  
                   <button className=" hover:font-bold text-white 
                      rounded hover:bg-orange-500 shadow-lg px-4 py-2 sm:ml-2">S'inscrire</button>
                    </Link>   
                    </div>
                    
                    </form>
                  </div>
                </header>
            </>
        )
    }
}