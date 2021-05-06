import React, { Component} from 'react'
import Navbarextra from '../../Navbar/Navbarextra'
import Navbarextra2 from '../../Navbar/Navbarextra2'
import axios from 'axios';
import Messageadmin from './Messageadmin';
import { NavLink } from 'react-router-dom';

class Affichage extends Component {
    state={
        id_conversation:null
    }

    componentDidMount(){
        const { match: { params } } = this.props
        axios.get(`/logements/${params.logement_id}/conver_admin`).then((response)=>{
            this.setState({
                conversation_admin: response.data.conversation_admin,
                conversation_id: response.data.conversation_id
            })
            // console.log(response)
        })
    }
    id_conv_admin=(id,name)=>{
        this.setState({
            id_conversation:id,
            username:name
        })
    }
    componentDidUpdate(){
        console.log(this.state)
    }
    render (){
        const { match: { params } } = this.props
        
        const { conversation_admin,conversation_id}=this.state
        let conversation_ids=[]
        conversation_id && conversation_id.map(conversation =>{
            return conversation_ids.push({...conversation})
        })
        console.log(conversation_ids);
        conversation_ids && conversation_ids.map(conversation=>{
            conversation.name_user = conversation_admin.find(id => id.id === conversation.admin_run_id).name

        })
        return(
           <>
                {
                    this.state.conversation_admin ? (
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
                         
                            <NavLink to={`/logements/${params.logement_id}/message`}>
                                <button type="submit" class="buttonnon border  rounded mx-4 p-2 hover:font-bold text-white">
                                    Message des clients
                            </button>
                                </NavLink>
                                <button type="submit" class="  rounded mx-0 p-2 font-medium text-white">
                                    Message de Runbnb
                                     </button><br /> <br />
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
                                              
                                          
                                            <div className="border-2 my-5 bg-gray-300 h-auto">
                                                <div className="h-12 bg-gray-200  flex items-center justify-center text-sm " >
                                                    {
                                                        conversation_ids.map(m => (
                                                            <div onClick={() => {
                                                                this.id_conv_admin(m.id,m.name_user)
                                                            }}>
                                                                {m.name_user}<br />
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                            </div>
                                            <div className="w-8/12 border">
                                                    <div className="h-12 flex items-center justify-center text-sm font-bold">
                                                    {this.state.username}
                                                    </div>
                                                        <hr></hr>
                                                    <div className=" my-5  ">
                                                      <Messageadmin id_conversation_admi={this.state.id_conversation} logement_id={params.logement_id} />
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