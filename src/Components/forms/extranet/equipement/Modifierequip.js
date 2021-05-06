import React from 'react';
import Navbarextra from '../../Navbar/Navbarextra'
import Navbarextra2 from '../../Navbar/Navbarextra2'
import { GoArrowSmallLeft } from 'react-icons/go';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';
import Courant from "./Courant";
import Suplementaire from './Suplementaire'
import Famille from './Famille'
import Securite from './Securite'
import Logistiques from "./Logistiques";
import axios from "axios";



class Modifierequip extends React.Component{
        constructor(){

          super();

          this.state={

            showequipement :false,
            showsupp :false,
            showfam :false,
            showlog :false,
            showsecurite    :false,
            courant:null,
            famille:null,
            logistique:null,
            securite :null,
            suplementaires :null,
            name: null,
                       
        }
        
    }
    componentDidMount() {
        const { match: { params } } = this.props;
        axios.get(`/logements/${params.logement_id}/equi_courants`).then(response => {
         this.setState({
                courant: response.data.courant
            })
            console.log(response.data)
}
        )

        axios.get(`/logements/${params.logement_id}/equi_familles`).then(response => {
            this.setState({
                famille: response.data.familles
            })
            console.log(response.data)
        }
        )

        axios.get(`/logements/${params.logement_id}/equi_logistiques`).then(response => {
            this.setState({
                logistique: response.data.logistiques
            })
        }
        )

        axios.get(`/logements/${params.logement_id}/equi_securites`).then(response => {
            this.setState({
                securite: response.data.fichier
            })
            console.log(response.data);
        }
        )

        axios.get(`/logements/${params.logement_id}/equi_suplementaires`).then(response => {
            this.setState({
                suplementaires: response.data.suplementaires
            })
        }
        )
        axios.get(`/logements/${params.logement_id}`).then((response) => {
            this.setState({
                name: response.data.logement.name,
            })
        }
        )
        
    }
    handlechange=(event)=>{
        this.setState({
            name:event.target.value
        })
    }
ferme=(ok)=>{
    this.setState({ showequipement: ok })
}
ferme1 = (ok) => {
    this.setState({ showsupp: ok })
}
ferme2 = (ok) => {
    this.setState({ showfam: ok })
}
ferme3 = (ok) => {
    this.setState({ showlog: ok })
}
ferme4 = (ok) => {
    this.setState({ showsecurite: ok })
}
  render() {
      const { match: { params } } = this.props;

        return(
                <>
                    <div className="">
                        <Navbarextra logement_id={params.logement_id}/>
                    </div> 
                    <div className="h-24">
                        <Navbarextra2/> 
                    </div> 
                {
                    this.state.name ? (
                        <NavLink to={`/extraheb/${params.logement_id}`}>
                            <label className=" px-4 py-5 text-gray-600 text-sm text-blue-500 hover:text-blue-700 hover:font-bold flex " >
                                <GoArrowSmallLeft className="w-10 h-10" /><span className="py-2 px-3 text-base"  > Retour à la modification de la {this.state.name} </span>
                            </label>
                        </NavLink>
                    ) : null
                }
                
                    <div className="w-full px-5 ">
                        <div className="">
                            <h1 className="w-2/3 text-xl font-bold text-gray-700">Equipements :</h1>
                            <h2 className="cursor-pointer text-sm font-medium text-gray-600 pt-5 py-4" onClick={() => { this.setState({ showequipement: !this.state.showequipement }) }} >+ Equipements courants</h2>
                           { this.state.courant?(
                            <Courant courant={this.state.courant} logement_id={params.logement_id} showequipement={this.state.showequipement} ok={this.ferme} />
                            ):null
                        }

                            <h3 className="cursor-pointer text-sm font-medium text-gray-600 py-4"  onClick={()=>{this.setState({showsupp:!this.state.showsupp})}} >+ Equipements supplémentaires</h3>
                        {this.state.suplementaires ? (
                            <Suplementaire suplementaires={this.state.suplementaires} showsupp={this.state.showsupp} logement_id={params.logement_id} ok={this.ferme1} />
                        ) : null
                        }
                            <h4 className="cursor-pointer text-sm font-medium text-gray-600 py-4" onClick={()=>{this.setState({showfam:!this.state.showfam})}} >+ Famille</h4>
                        {this.state.famille ? (
                            <Famille famille={this.state.famille} showfam={this.state.showfam} logement_id={params.logement_id} ok={this.ferme2}/>
                        ) : null
                        }
                            <h5 className="cursor-pointer text-sm font-medium text-gray-600 py-4"  onClick={()=>{this.setState({showlog:!this.state.showlog})}}> <span> + Logistiques</span></h5>
                         {this.state.logistique ? (
                            <Logistiques logistique={this.state.logistique} showlog={this.state.showlog} logement_id={params.logement_id} ok={this.ferme3} />
                        ) : null
                        }
                            <h6 className="cursor-pointer text-sm font-medium text-gray-600 py-4"  onClick={()=>{this.setState({showsecurite:!this.state.showsecurite})}} >+ Sécurité à la maison</h6>
                         {this.state.securite ? (
                            <Securite securite={this.state.securite} showsecurite={this.state.showsecurite} logement_id={params.logement_id} ok={this.ferme4} />
                        ) : null
                        }
                        </div>
                    </div>
                </> 
            )
    }   
}

export default Modifierequip;
 
        // const [showcourant, setShowcourant] = useState(false);
        // const [showsupp, setShowsupp] = useState(false);
        // const [showfamille, setShowfamille] = useState(false);
        // const [showlogistique, setShowlogistique] = useState(false);
        // const handleClosecourant = () => setShowcourant(false);
        // const handleShowcourant= () => setShowcourant(true);
        // const handleClosesupp = () => setShowsupp(false);
        // const handleShowsupp= () => setShowsupp(true);
        // const handleClosefamille = () => setShowfamille(false);
        // const handleShowfamille = () => setShowfamille(true);
        // const handleCloselogistique = () => setShowlogistique(false);
        // const handleShowlogistique = () => setShowlogistique(true);
   
    
     
   



