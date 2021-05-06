import React, { Component} from 'react'
import Navbarextra from '../../Navbar/Navbarextra'
import { NavLink } from 'react-router-dom';
import { ImWarning } from "react-icons/im";
import offre from '../../../../assets/images/Ellipse52.png'
import offre1 from '../../../../assets/images/Ellipse53.png'
import offre3 from '../../../../assets/images/Rectangle527.png'
import  DateRangePicker1  from "./Calendrier1";
import DateRangePicker2 from "./Calendrier2";
import { Formik, Field, Form } from 'formik';
import moment from 'moment'
import 'moment/locale/fr';
import Navbarextra2 from '../../Navbar/Navbarextra2'
import './Promotion.css'
import axios from 'axios'
import history from '../../../../history'
import { AiOutlineDelete } from "react-icons/ai";
class Affichage extends Component {
    state={
        open:true,
        datedebut:this.props.formValue.datedebut,
        datefin:this.props.formValue.datefin,
        datevuedebut:this.props.formValue.datevuedebut,
        datevuefin:this.props.formValue.datevuefin
    }



    standard = () => {
        this.setState({
            types:"Offre standard"
        })
    }

    nuits = () => {
        this.setState({
            types: "Nuits offertes"
        })
    }

    

    date=(range)=>{
        let date1a = range.range.startDate
        let date2a = range.range.endDate
        let date1 = moment(date1a).locale("fr").format('LL')
        let date2 = moment(date2a).locale('fr').format('LL')

        this.setState({
            datedebut: date1,
            datefin : date2,
            debut1:date1a,
            fin1 :date2a
            }
        )
        
    }
    prom = (range) =>{
        let date1a = range.range.startDate
        let date2a = range.range.endDate
        let date1 = moment(date1a).locale("fr").format('L')
        let date2 = moment(date2a).locale("fr").format('L')
        this.setState({
            datevuedebut: date1,
            datevuefin: date2,
            debut2:date1a,
            fin2:date2a
        })
    }
    componentDidMount(){
        const asy = async () => {
        this.setState(this.props.formValue.recapu )
        await axios.get(`/logements/${this.props.logement_id}/promotions`).then(response =>{
            this.setState({
                prom: response.data.promotion
            })
        })
        }
        asy();
    }
    supprimer=(id)=>{
        const asy= async ()=> {
            await axios.delete(`/logements/${this.props.logement_id}/promotions/${id}`)
            history.push(`/logements/${this.props.logement_id}/promotion`)

        }
        asy ();
    }


    state = {
      
        isActive: 0
      };
      comingSoon(e) {
        this.setState(activate => {
         return { isActive: 1};
        });
      }
      boxOffice(e) {
        this.setState(activate => {
          return {  isActive: 2};
        });
      }
    
 
    render (){
        const today = this.props.formValue.datedebut;
        const toggle = this.props.formValue.datedefin;
        

        return(
            <div className="bg-white">
            <div>
                <div>
                    <div className="">
                        <Navbarextra logement_id={this.props.logement_id} />
                    </div>
                    <div className="h-24">
                    <Navbarextra2 logement_id={this.props.logement_id} />
                    </div>
                </div>
                

            </div>

            <h1 className="mx-5 font-bold text-sm text-gray-600">Promotions en cours</h1>
            <hr className="w-11/12 mx-5 my-3"></hr>
            <div className="flex mx-5 my-5">
                   {
                       this.state.prom?(
                           <>
                                {
                                    this.state.prom.map((prom)=>(
                                        <>
              <div className="w-7/12 bg-white shadow mx-5 my-4 ">
                    <div className="flex mx-5 py-4">
                        <h1 className="w-1/2 font-medium text-base text-gray-700">Nom</h1>
                        <p className="text-base text-gray-700"> {prom.name_promotion}</p>
                    </div>
                    <hr></hr>
                    <div className="flex mx-5 py-4">
                        <h1 className="w-1/2 font-medium text-base text-gray-700">Réduction </h1>
                            <p className="text-base text-gray-700">  {prom.reduction}% de réduction</p>
                        </div>
                    <hr></hr>
                    <div className="flex mx-5 py-4 ">
                        <h1 className="w-1/2 font-medium text-base text-gray-700">Détails</h1>
                        <label className=" block">
                            <p className="text-sm font-bold text-gray-700"> {prom.types}</p>
                         
                            <p className="text-sm text-gray-700">Réservable du {moment(prom.datedebut).locale("fr").format('LL')}  au   {moment(prom.datefin).locale("fr").format('LL')}<br /></p>
                            <p className="text-sm text-gray-700">Séjour minimum :    {prom.temps}jours</p>
                            <p className="text-sm text-gray-700">Correspond au tarif sélectionné</p>
                        </label>
                    </div>
                    <hr></hr>
                    <div className="flex mx-5 py-4">
                    <h1 className="w-1/2 font-medium text-base text-gray-700">Visibilité de la promotion</h1>
                        <p className="text-sm text-gray-700">  {moment(prom.datevuedebut).locale("fr").format('LL')}-   {moment(prom.datevuefin).locale("fr").format('LL')}<br /></p>
                    </div>
                   

                    <button className="rounded my-5 mx-5 px-4 py-2 flex items-center text-white hover:font-medium hovrt:text-white cursor-pointer" onClick={()=>{this.supprimer(prom.id)}}>  <AiOutlineDelete className="w-6 h-6 mr-3" />Supprimer</button>
                </div>


                                        {/* {prom.name_promotion} <label className="text-red-500 cursor-pointer" onClick={()=>{this.supprimer(prom.id)}}>Supprimer</label><br />
                                       <br />
                                      <br />
                                     <br />
                                        <br />
                                       
                                        {moment(prom.datevuedebut).locale("fr").format('LL')}<br />
                                        {moment(prom.datevuefin).locale("fr").format('LL')}<br /> */}
                                    </>
                                    ))
                                }

                           </>
                       ):
                       (
                        <div className="flex items-center mx-5  w-2/3 h-40 border-l-8  border-t border-b border-r">
                            <ImWarning style={{width:60,height:60,color:'red'}} className="mx-5"/>
                            <p className="text-sm text-gray-500">Aucune promotion à offrir à vos clients.</p>
                        </div>
                       )
                   }
            </div>
            <Formik
            
            initialValues={this.props.formValue.recapu}
            onSubmit={value =>{
                let { formValue, setFormValue } = this.props
                formValue = {
                    ...this.props.formValue, recapu: {
                        temps: value.temps,
                        reduction: value.reduction,
                        name_promotion: value.name_promotion,
                        datevuedebut: this.state.datevuedebut,
                        datevuefin: this.state.datevuefin,
                        datedebut: this.state.datedebut,
                        datefin: this.state.datefin,
                        types: this.state.types,
                        debut1:this.state.debut1,
                        fin1:this.state.fin1,
                        debut2:this.state.debut2,
                        fin2:this.state.fin2,
                    }}
                setFormValue(formValue)
                this.props.nextStep()
            }}
            >
                {({ values, checked, handleSubmit, touched, setFieldValue }) => (
                    <Form onSubmit={handleSubmit}>
                            <h2 className="mx-5 font-bold text-sm text-gray-600">Ajouter une nouvelle promotion</h2>
                            <div className="my-5 bg-gray-200 w-1/2 mx-5 py-3">
                                <h3 className="mx-4 font-medium text-sm text-gray-600  my-3 ">De quel type de promotion s'agit-il ?</h3>
                                <h4 className="  text-sm text-gray-500 mx-4 my-3 h-full">Choisissez une réduction à offrir à vos voyageurs</h4>
                                <div className="flex">
                                    <div className={`w-5/12 border mx-4 cursor-pointer ${this.state.isActive === 1 ? "actives" : ""}`} onClick={this.standard}>
                                        <div onClick={() => this.comingSoon(this)}>
                                        <div className="flex justify-center my-3">
                                            <img src={offre} className=""></img>
                                        </div>
                                        <h1 className="text-center text-sm font-medium text-blue-500 my-3">Offre standard</h1>
                                        <p className="text-center text-sm text-gray-700 ">Proposez une réduction à vos clients en seulement quelques clics</p>
                                        <hr className="my-4"></hr>
                                        <p className=" text-sm text-gray-500 mx-3 my-3"> <span className=" text-lg font-bold text-green-500"></span> Facile et rapide à créer</p>
                                        <p className=" text-sm text-gray-500 mx-3 my-3"> <span className=" text-lg font-bold text-green-500"></span>  Personnalisable pour correspondre à vos besoins</p>
                                    </div>
                                    </div>
                                    <div className={`w-5/12 border ml-4 cursor-pointer ${this.state.isActive === 2 ? "actives" : ""}`} onClick={this.nuits}>
                                    <div onClick={() => this.boxOffice(this)}>
                                        <div className="flex justify-center my-3">
                                            <img src={offre1} className=""></img>
                                        </div>
                                        <h1 className="text-center text-sm font-medium text-blue-500 my-3">Nuits offertes</h1>
                                        <p className="text-center text-sm text-gray-700 w-11/12 mx-3 ">Proposez gratuitement certaines nuits pour obtenir plus de réservations de longue durée</p>
                                        <hr className="my-4"></hr>
                                        <p className=" text-sm text-gray-500 mx-3 my-3"> <span className=" text-lg font-bold text-green-500"></span> Obtenez plus de réservations</p>
                                        <p className=" text-sm text-gray-500 mx-3 my-3"> <span className=" text-lg font-bold text-green-500"></span>  Remplissez vos hébergement en basse saison</p>
                                    </div>
                                    </div>
                                </div>
                            </div>


                            <h3 className="mx-5 font-bold text-sm text-gray-600">Qui peut voir cette prommotion</h3>

                            <div className="mx-5 my-4 flex justify-center bg-gray-200 w-1/4 cursor-pointer ">
                                <div>
                                    <img src={offre3} className="my-3"></img>
                                    <p className="text-center text-blue-500 font-medium mb-4" onClick={() => {
                                        this.setState({ vu: "Tout le monde" })
                                    }}> Tout le monde</p>
                                </div>
                            </div>

                            <hr className="my-5 w-11/12 mx-5 "></hr>

                            <h4 className="mx-5 font-medium text-sm text-gray-600">Combien de temps les clients doivent-ils séjourner dans votre hébergement pour bénéficier de cette promotion ?</h4>
                            <div className="flex  my-5 mx-5">

                                <Field type="number" min="0" placeholder="Faire correspondre au plan tarifaire sélectionné" name="temps" className="w-64 h-10 text-center border rounded leading-tight bg-gray-200 border-gray-500"></Field>
                                <p className="mx-4 my-2 text-gray-500 text-sm">nuit(s) ou plus</p>
                            </div>
                            <hr className="my-5 w-11/12 mx-5 "></hr>


                            <h4 className="mx-5 font-medium text-sm text-gray-600">Quelle réduction souhaitez-vous appliquer ?</h4>
                            <div className="flex  my-5 mx-5">
                                <Field type="number" min="0" name="reduction" className="w-12 h-10 text-center border  leading-tight bg-gray-200 border-gray-500" ></Field>
                                <label className="flex items-center h-10 w-8 justify-center border bg-gray-500">%</label>
                                <p className="mx-4 my-2 text-gray-500 text-sm">Sur le plan tarifaire défini au calendrier</p>
                            </div>
                            <hr className="my-5 w-11/12 mx-5 "></hr>

                            <h5 className="mx-5 font-medium text-sm text-gray-600">Pour profiter de cette réduction, à quelle(s) date(s) les clients doivent-ils séjourner dans votre hébergement ?</h5>
                            <div className="my-5">
                                <div className="flex items-center mx-5  w-5/6 h-40 border-l-8  border-t border-b border-r">

                                    <ImWarning style={{ width: 60, height: 60, color: 'red' }} className="mx-5" />
                                    <p className="text-sm text-red-500">Pour sélectionner/désélectionner les dates spécifiques, maintenez la touche CTRL enfoncée et cliquez sur chaque date</p>
                                </div>
                                <div className="my-5 w-1/2 mx-5">
                                <DateRangePicker1
                                    date={this.date}

                                />
                                </div>
                                <p className="text-sm text-gray-600 mx-5 my-5">Votre réduction s’appliquera sur les séjours réservés aux date(s) :</p>
                                <p className="mx-5 text-gray-700 px-5">
                                    <input disabled={true} className="w-64 h-10 border rounded my-3 mx-5 bg-gray-200 text-center focus:bg-white text-sm"  onChange={(e)=>{this.setState({datedebut:e.target.value})}} defaultValue={this.state.datedebut} type="text" name="datedebut"/>
                                    <input disabled={true} className="w-64 h-10 border rounded my-3 mx-2 bg-gray-200 text-center focus:bg-white text-sm" onChange={(e) => { this.setState({ datefin:e.target.value})}} defaultValue={this.state.datefin} type="text" name="datefin" />
                                </p>
                                <div className="my-5">
                                    <h1 className="mx-5 font-medium text-sm text-gray-600">Quel est le nom de votre promotion ?</h1>
                                    <Field type="text" placeholder="Nom de la promotion" name="name_promotion" className="w-64 h-10 border rounded my-3 mx-5 bg-gray-200 text-center focus:bg-white text-sm"></Field>
                                </div>
                            </div>
                            <hr className="my-5 w-11/12 mx-5 "></hr>
                            <h1 className="mx-5 font-medium text-sm text-gray-600">Quand les clients peuvent-ils voir cette promotion sur Runbnb.com ?</h1>
                            <div className="my-5 w-1/2 mx-5">
                            <DateRangePicker2
                                prom={this.prom}

                            />
                            </div>
                            <p className="text-sm text-gray-600 mx-5 py-4">Les clients peuvent voir cette promotion aux  dates suivantes :</p>
                            <input  disabled={true}onChange={(e)=>{this.setState({datevuedebut:e.target.value})}} defaultValue={this.state.datevuedebut} className="w-64 h-10 border rounded my-3 mx-5 bg-gray-200 text-center focus:bg-white text-sm" name="datevuedebut" />
                            <input  disabled={true}onChange={(e)=>{this.setState({datevuefin:e.target.value})}} defaultValue={this.state.datevuefin} className="w-64 h-10 border rounded my-3 mx-2 bg-gray-200 text-center focus:bg-white text-sm" name="datevuefin" />

                            <div>
                                <button type="submit" className="w-56 h-10 mx-5 my-5 text-white  rounded hover:font-medium justify-center flex items-center" >Vérifier la promotion</button>
                            </div>
                    </Form>
                )}
            </Formik>

            </div>
        )
    }
}
export default Affichage; 