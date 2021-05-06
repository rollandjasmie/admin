import React, { Component } from 'react';
import CalendrierComponent from './CalendrierComponent';
import '../../App.css';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { frFR } from '@material-ui/core/locale';
import './Calendar.css';

export default class CalendrierContainer extends Component {

 dateRange = (dates)=>{
  console.log(this)
   let { formValue, setFormValue } = this.props;
        // mitovy amny:
    //let formValue = this.props.formValue
      //let setFormValue = this.props.setFormValue

    formValue = {...formValue, date: {startDate: dates.debut, endDate: dates.fin}};
    
    setFormValue(formValue)
     console.log(formValue)
   
 }

    render() {
        return (
            <div className="cal lg:w-2/4 md:w-3/4 mt-17 sm:w-3/4 pl-10 ml-10 mt-10  bg-white shadow-md rounded px-8 pt-6 pb-8 mb-10 ">
               <h2 className="text-xl font-bold  mb-10 "> À quel moment avant leur arrivée les voyageurs peuvent-ils annuler leur réservations ?</h2>
               <h2 className="text-sm mb-10">Cliquez sur chaque date individuellement. Toutes les dates colorées sont disponibles à la réservation. Ne vous inquiétez pas, vous pourrez toujours ajouter ou supprimer des dates plus tard.</h2>
            
                 <div className="">
               <ThemeProvider >
                  <CalendrierComponent dateRange={this.dateRange} />  
               </ThemeProvider>
                  </div>
             <div className=" flex justify-end">
              <button class=" text-white font-bold py-2 px-4 rounded mr-1" onClick={this.props.previousStep}>Précédent</button>
              <button  class=" text-white pl-6 pr-6 font-bold py-2 px-4 rounded" onClick={this.props.nextStep}>Suivant</button>
              </div>
            </div>
        )
    }
}