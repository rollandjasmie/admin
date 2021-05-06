import React, { Component} from 'react'
import Navbarextra from '../../Navbar/Navbarextra'
import Navbarextra2 from '../../Navbar/Navbarextra2'
import axios from 'axios';
import Message from './Message';
import { NavLink } from 'react-router-dom';


class Affichage extends Component {
    state={
        id_conversation: null,
        recherche_id:null,
        resulat:null,
        detail:null,
        non_repondu:null
    }

    componentDidMount(){
        const { match: { params } } = this.props
        axios.get(`/logements/${params.logement_id}/reservations/`).then((response)=>{
             this.setState({
                reservations: response.data.reservation
            })
        })
        axios.get(`/logements/${params.logement_id}/conversations`).then((response)=>{
            this.setState({
                conversation_user: response.data.conversation_user,
                conversation_id: response.data.conversation_id,
                id: response.data.conversation_id
            })
             console.log(response)
        })

    }
    id_conv=(id,name,user_id)=>{
        this.setState({
            id_conversation:id,
            username:name
        })
        this.detail(user_id)
    }
  filtre=(event)=>{
      if (event.target.value == "Tous les messages") {
        this.setState({
            id:1,
            resultat:null,
            non_repondu:null
        })
    }else if(event.target.value == "messages en attente d'une response"){
        const { match: { params } } = this.props
        axios.get(`/conversation/${params.logement_id}/non_repondu`).then(response=>(
            this.setState({ 
                id: null,
                resultat: null,
                non_repondu: response.data.non_repondu_conversation_id,
                user_non_repondu: response.data.non_repondu_user
            })
        ))
    } 
  }
    nonrepondu=()=>{
        
    }

    recherche=()=>{
        const { match: { params } } = this.props

        if (this.state.recherche) {
            this.setState({ 
                id:null,
                non_repondu: null,
                recherche_id: this.state.recherche
                })
            let name1 = this.state.recherche
            let name = name1.split(" ")[0]
            const form = new FormData
            form.append("name",name)
            axios.post(`/recherche/message/${params.logement_id}/client`, form).then((response)=>{
                this.setState({
                    resultat: response.data.resultat,
                    resultat_user: response.data.resultat_user,    

                })
            })
            // console.log(name)
        }
    }

    detail(m){
    const {reservations}=this.state
    let res = null
    reservations && reservations.map((item)=>{
        if (item.user_id == m.user_id) {
           this.setState({detail: item})
        }
        }
        )
    
    console.log(reservations)
    }

    render (){
  
      
        const { match: { params } } = this.props
        const { conversation_user,conversation_id}=this.state
        
        let conversation_ids=[]
        conversation_id && conversation_id.map(conversation =>{
            return conversation_ids.push({...conversation})
        })
        conversation_ids && conversation_ids.map(conversation=>{
            conversation.name_user = conversation_user.find(id => id.id === conversation.user_id).name
            conversation.first_name_user = conversation_user.find(id => id.id === conversation.user_id).first_name

        })

        const { resultat, resultat_user } =this.state
        let resultats = []
        resultat && resultat.map(conversation => {
            return resultats.push({ ...conversation })
        })
        resultats && resultats.map(conversation => {
            conversation.name_user = resultat_user.find(id => id.id === conversation.user_id).name
            conversation.first_name_user = resultat_user.find(id => id.id === conversation.user_id).first_name

        })


        const { non_repondu, user_non_repondu}=this.state
        let non_repondes = []
        non_repondu && non_repondu.map(non=>{
            return non_repondes.push({...non})
        })
        non_repondes && non_repondes.map(non=>{
            non.name_user = user_non_repondu.find(id => id.id === non.user_id).name
            non.first_name_user = user_non_repondu.find(id => id.id === non.user_id).first_name
        })

        return(
            <>
                {
                    this.state.conversation_user ? (
                        <div>
                            <div>
                                <div className="">
                                    <Navbarextra logement_id={params.logement_id}  />
                                </div>
                                <div className="h-24">
                                <Navbarextra2 logement_id={params.logement_id}  />
                                </div>
                            </div>
                            <div >
                                <span className="pl-6" >Boite de réception</span>
                         
                                <button type="submit" class="font-medium   rounded mx-4 p-2 text-white ">
                                    Message des clients
                            </button>
                                <NavLink to={`/logements/${params.logement_id}/messageadmin`}>
                                <button type="submit" class="buttonnon border text-white  rounded mx-0 p-2  ">
                                    Message de Runbnb
                                </button><br /> <br />
                                </NavLink>
                                <hr className="py-2" />
                            </div>
                            <div className="px-8">
                                <span className="py-5">Trier les messages par :</span>
                                <div className="flex mt-2">
                                    <div className="flex-1">
                                        <div className="mb-4">
                                            <select className="block w-40 h-10 mx-4 rounded leading-tight text-xs bg-gray-300 border border-gray-200 text-gray-700  focus:outline-none focus:bg-white focus:border-gray-500" onChange={this.filtre} id="grid-state">
                                                <option>----Choisir le type----</option>
                                                <option value="Tous les messages" >Tous les messages</option>
                                                <option value="messages en attente d'une response">messages en attente d'une response</option>
                                            </select>
                                          
                                         
                                        </div>
                                    </div>
                                    {/* <div className="flex-1">
                                        <Message id_conversation={this.state.id_conversation} logement_id={params.logement_id} />

                                    </div>
                                    <div className="flex-1">
                                        a
                                    </div> */}
                                    
                                </div>
                            </div>
                            <div className="flex justify-center w-full">

                                            <div className=" w-3/12  ">

                                            <input type="text" placeholder="Recherche ..." className="border-2 my-2 text-sm rounded-xl h-10 w-64 text-center leading-tight" onChange={(e)=>{this.setState({recherche:e.target.value})}}></input>
                                                <label onClick={this.recherche}>Rechercher</label>
                                                {
                                                    this.state.id?(
                                            <div className="border-2 my-5 bg-gray-300 h-auto">
                                                {
                                                    conversation_ids.map(m => (
                                                        <div className="h-12 bg-200 font-medium hover:font-bold cursor-pointer flex items-center justify-center text-sm " onClick={() => {this.id_conv(m.id,m.name_user,m) }}>
                                                            <p onClick={() => this.detail(m)}> {m.name_user}{' '}{m.first_name_user} </p>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                                    ):null
                                                }{
                                                    this.state.resultat?(
                                            <div className="border-2 my-5 bg-gray-300 h-auto">
                                                {
                                                    resultats.map(m => (
                                                        <div className="h-12 bg-gray-200  flex items-center justify-center text-sm " onClick={() => { this.id_conv(m.id,m.name_user,m)}}>
                                                            {m.name_user}{' '}{m.first_name_user}

                                                        </div>

                                                    ))
                                                }
                                                
                                            </div>

                                                    ):null
                                                }
                                                {
                                                    this.state.non_repondu?(
                                                    <div className="border-2 my-5 bg-gray-300 h-auto">
                                                        {
                                                            non_repondes.map(m=>(
                                                                <div className="h-12 bg-gray-200  flex items-center justify-center text-sm " onClick={() => { this.id_conv(m.id, m.name_user, m) }}>
                                                                    {m.name_user}{' '}{m.first_name_user}

                                                                </div>

                                                            ))
                                                        }
                                                    </div>
                                                    ):null
                                                }
                                            </div>
                                            <div className="w-5/12 border">
                                                    <div className="h-12 flex items-center justify-center text-sm font-bold">
                                                    {this.state.username}
                                                    </div>
                                                        <hr></hr>
                                                    <div className=" my-5  ">
                                                          <Message id_conversation={this.state.id_conversation} logement_id={params.logement_id}/>
                                                    </div>    
                                            </div>
                                            <div className=" w-3/12">
                                                    <div className="h-12  flex items-center justify-center text-sm text-blue-500 font-bold">
                                                    A propos du séjour
                                                    </div>
                                                    <div className="h-12  mx-5 flex items-center  text-sm text-gray-500 font-bold">
                                                    Nom : {this.state.username}
                                                    </div>

                                                    <div className="h-12  mx-5 flex items-center  text-sm text-gray-500 font-bold">
                                                    Voir la réservation : {this.state.detail?(this.state.detail.id):null}
                                                    </div>
                                                    <div className="h-12  mx-5 flex items-center  text-sm text-gray-500 font-bold">
                                                    Langue préférée : francais
                                                    </div>
                                                    <div onClick={()=>{console.log(this.state)}}className="h-12  mx-5 flex items-center  text-sm text-gray-500 font-bold">
                                                    Arrivée : {this.state.detail?(this.state.detail.arrivee):null }
                                                    </div>
                                                    <div className="h-12  mx-5 flex items-center  text-sm text-gray-500 font-bold">
                                                    Départ : {this.state.detail?(this.state.detail.depart):null}
                                                    </div>
                                                    <div className="h-12  mx-5 flex items-center  text-sm text-gray-500 font-bold">
                                                    Nombre total de personnes : {this.state.detail?(this.state.detail.nombre_personne):null }
                                                    </div>
                                                    <div className="h-12  mx-5 flex items-center  text-sm text-gray-500 font-bold">
                                                    Montant total : {this.state.detail?(this.state.detail.montan_total):null }
                                                    </div>
                                                    <div className="h-12  mx-5 flex items-center  text-sm text-gray-500 font-bold">
                                                    Heure d'arrivée approximative : 
                                                    </div>
                                            </div>
                                            </div>
                        </div>
                    ) : null
                }

            </>

                
        )
    }
}
export default Affichage; 