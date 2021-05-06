import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Dropdow from '../../user/Dropdow';
import moduleName from 'module'
import logoo from '../../../assets/images/logo.jpg';
export default class Navbaruser extends Component {
    render() {
        return (
            <>
                <header className="text-gray-700 body-font mx-4">
                  <div className="container mx-auto flex flex-wrap p-1 flex-col md:flex-row items-center">
                  <NavLink to="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                      <img className="w-40 pt-2 mx-3 " src={logoo}></img>
                    </NavLink>
                
                   
                    <form>
                    <div className="flex">
                    <div className="flex  justify-end w-auto ">
          

                    </div>
                      
                    </div>
                    
                    </form>
                  </div>
                </header>
            </>
        )
    }
}
