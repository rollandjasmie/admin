
import React from "react";
import CalendarView from "./CalendarViewer/CalendarViewer";
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import Navbarextra from '../Navbar/Navbarextra'
import { BiImport } from "react-icons/bi";
import { BiExport } from "react-icons/bi";
import Navbarextra2 from '../Navbar/Navbarextra2'
import * as Moment from 'moment';
import { extendMoment } from 'moment-range';
import 'moment/locale/fr';
// import history from '../../../../history'
import { Formik, Form, Field } from "formik";
import Loading from "react-loading";
import history from '../../../history'


const moment = extendMoment(Moment);

export default class DemoApp extends React.Component {
 constructor(props){
     super(props);  
     this.state = {
         ouvrir:null,
         delaimin:null,
         nuitmin:null,
         tarif:null,
     }
 }
  componentDidMount() {
      const { match: { params } } = this.props;

    this.setState({
      id: this.props.days,
    });
      axios.get(`/logements/${params.logement_id}/calendriers`).then(response => {
          this.setState({
              debut: response.data.debut,
              fin: response.data.fin,
              delaimin: response.data.delaimin,
              nuitmin: response.data.nuitmin,
              debut: response.data.debut,
              ouvrir: response.data.ouvrir,
              tarif: response.data.tarif,
              promotion: response.data.promotion,
          })
          //============= calendrier =================
            const tab = [];
            const date = []
            const s = moment(this.state.debut);
            const e = moment(this.state.fin);
            var start = new Date(s)
            var end = new Date(e)
            
            
            while (start <= end) {
                tab.push(moment(start));
                var newDate = start.setDate(start.getDate() + 1);
                start = new Date(newDate);
                }
            tab && tab.map(response => (
                date.push({daty:new Date(response), ouvert: this.state.ouvrir})
                ))
                this.setState({
                    date: date
            })
            //=======================================================
            //==================== promotion ========================
            let dates = []
            let dateprom = []
            
            response.data.promotion && response.data.promotion.map(prom=>{
                var start = new Date(prom.datedebut)
                var end = new Date(prom.datefin)
            while (start <= end) {
                dates.push(moment(start));
                var newDate = start.setDate(start.getDate() + 1);
                start = new Date(newDate);
            }
        })
        dates && dates.map(response => {
            dateprom.push({ daty: new Date(response), ouvert: this.state.ouvrir })
        })
        this.setState({
            promotions: dateprom
        })

            //=======================================================

      })
  }

  render() {
      const { match: { params } } = this.props;
    return (
      <div className="bg-white">
            <div>
                <div>
                        <div className="">
                            <Navbarextra logement_id={params.logement_id} />
                        </div>
                        <div className="h-24">
                        <Navbarextra2 logement_id={params.logement_id} />
                        </div>
                </div>

            </div>

            <h1 className="text-base text-gray-700 font-medium py-3 px-5">Tarifs et calendrier</h1>

            <div className="flex w-12/12">
                    <div className="w-8/12">
                            <CalendarView
                            ref={this.props.popupNode}
                            days={this.props.days}
                            labels={this.props.labels}
                            month={this.props.month}
                            year={this.props.year}
                            backMonth={this.props.backMonth}
                            nextMonth={this.props.nextMonth}
                            setValue={this.props.setValue}
                            isToday={this.props.isToday}
                            blank_days={this.props.blank_days}
                            logement_id={params.logement_id}
                            dates={this.state.date}
                            ouvert={this.state.ouvert}
                            dateprom={this.state.promotions}
                            tarif={this.state.tarif }
                            />

                            <h2 className="text-base text-gray-700 font-medium py-3 px-5">Synchronisation des calendriers</h2>
                            
                            <NavLink to="/logements/Synchro" >
                            <div className="border w-10/12 mx-5 my-3 cursor-pointer" >
                                <h1 className="text-base text-gray-700 font-medium mx-5 my-4">Gérez la Synchronisation du  calendrier</h1>
                                <label className="flex px-5 mx-5">
                                <BiImport style={{width:30,height:30,}}/>
                                <p className="text-sm text-gray-700 font-medium my-2 mx-3">Importer le calendrier</p>
                                </label>
                                <label className="flex px-5 mx-5">
                                <BiExport style={{width:30,height:30,}}/>
                                <p className="text-sm text-gray-700 font-medium  my-2 mx-3">Exporter le calendrier</p>
                                </label>
                            </div>
                            </NavLink>
                            <div className="border w-10/12 mx-5 my-3">
                                <h1 className="text-sm text-blue-500 font-medium mx-4 my-4">Cliquez ici pour diffuser votre hébergement sur d'autres sites d'annonces</h1>
                                
                            </div>
                    </div>
                <>
                    {
                        this.state.date ? (<Formik

                            initialValues={this.state}
                            onSubmit={value => {
                                const asy =async ()=>{
                                    await axios.put(`/logements/${params.logement_id}/calendriers/`, value)
                                }
                                asy()
                                history.push(`/logements/${params.logement_id}/calendrier`)
                             }
                            }>
                            {({ values, errors, handleSubmit, touched, setFieldValue }) => (

                                <Form onSubmit={handleSubmit}>
                                    <div className="w-4/12 my-5 py-5">
                                        <div>
                                            <label>
                                                <h1 className="text-sm text-gray-700 font-medium my-3">Date de début</h1>
                                                <Field name="debut" type="date" placeholder="10 avril 2020" className="border rounded h-10 px-3 "></Field>
                                            </label>
                                            <label>
                                                <h1 className="text-sm text-gray-700 font-medium my-3">Date de fin</h1>
                                                <Field name="fin" type="date" placeholder="10 avril 2020" className="border rounded h-10 px-3 "></Field>
                                            </label>
                                        </div>
                                        <div className="my-3 ">
                                            <h1 className="text-sm text-gray-700 font-medium my-3">Status</h1>
                                            <label className="flex mx-5 my-3">
                                                <h1 className="text-sm text-gray-600 font-medium ">Ouvert</h1>
                                                <Field name="ouvrir" onClick={()=>{this.setState({ouvert:1})}} type="radio" value="yes" className="mx-3"></Field>
                                            </label>
                                            <label className="flex mx-5">
                                                <h1 className="text-sm text-gray-600 font-medium ">Fermé</h1>
                                                <Field name="ouvrir" onClick={() => { this.setState({ ouvert:0})}} type="radio" value="no" className="mx-3"></Field>
                                            </label>
                                        </div>
                                        <div className="my-3">
                                            <h1 className="text-sm text-gray-700 font-medium my-3">Tarif</h1>
                                            <label className="flex">
                                                <label className="h-10 w-10 border bg-gray-100 text-xl flex items-center justify-center">€</label>
                                                <Field name="tarif" type="number" min="O" placeholder="140" className="border rounded h-10 px-3 w-32"></Field>
                                            </label>

                                        </div>
                                        <div className="my-3">
                                            <label className="">
                                                <h1 className="text-sm text-gray-700 font-medium my-3">Délai minimum de réservation avant arrivée</h1>

                                                <Field name="delaimin"  min="0" type="number" placeholder="03 jours" className="border rounded h-10 px-3 w-32"></Field>
                                            </label>
                                            <label className="">
                                                <h1 className="text-sm text-gray-700 font-medium my-3">Nombre de nuits minimum</h1>

                                                <Field name="nuitmin" min="0" type="number" placeholder="04 nuits" className="border rounded h-10 px-3 w-32"></Field>
                                            </label>

                                        </div>
                                        <div className="flex my-4">
                                            <button className="h-10 px-5   rounded b text-white   text-sm flex items-center justify-center   hover:font-bold ">Annuler</button>
                                            <button type="submit" className="h-10 px-5  mx-3  rounded  text-white   text-sm flex items-center justify-center   hover:font-bold ">Enregistrer</button>
                                        </div>
                                    </div>
                                </Form>)}
                        </Formik>
                        ):null
                    }
                </>    
                </div>


        </div>
    );
  }
}
