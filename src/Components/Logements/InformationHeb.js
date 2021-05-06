import React from 'react';
import './condition.css';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import $ from 'jquery';


class InformationHeb extends React.Component {
  
  state={
    longitude:this.props.formValue.map.longitude,
    latitude:this.props.formValue.map.latitude,
    zoom: this.props.formValue.map.zoom,
    ok:'none',
    ko:'block'
  }

  onChange =(event)=>{
    if (event.target.checked) {
    this.setState({
        ok: "block",
        ko:"none"
      })
    } 
    else {  
      this.setState({
      ko: "block",
      ok:"none"
    })
      
    }
  }
  
  render() {
    let adresse1 = this.props.adresse1
    let adresse = this.props.formValue.localisation.adresse
    let name = this.props.formValue.hebergement.name
    let longitude = this.props.formValue.map.longitude
    let latitude = this.props.formValue.map.latitude

    const MAPBOX_TOKEN ="pk.eyJ1Ijoicm9sbGFuZGphc21pZSIsImEiOiJja2drZjM1dGowNnR0MnFwY2V2dHB4cGltIn0.KGbcbcVaTYQhASyG17Q5rQ";

    return (
      <>
     
    

          <div className="w-1/3 on inline-block element mt-5 pl-10 ml-10 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-10  ">
            <h1 className="text-2ml font-bold  mb-10 ">Information sur l'hébergement</h1>
              <div class=" mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Vérifiez les informations sur votre hébergement :
                </label>
                <label class="block tracking-wide text-gray-700 text-xs py-3" >
                Si vous souhaitez modifier les informations,
                mieux vaut le faire maintenant. En effet, il est plus difficile de les mettre à jour pour la suite
                </label>
                <hr className="w-full"></hr>
            
              </div>

              <div className=" my-5 md:mb-0">
                <div className="flex">
                <label className="block uppercase tracking-wide w-full text-gray-700 text-xs font-bold mb-2" for="grid-city">
                Adresse de l’hébergement
                </label>
                <label className="block uppercase tracking-wide text-gray-700 text-xs  mb-2 cursor-pointer hover:font-bold hover:text-orange-500" for="grid-city">
                 <div onClick={adresse1} >Modifier</div>
                </label>
                </div>
                <label className="block uppercase tracking-wide text-gray-700 text-xs  mb-2">{adresse}</label>
              </div>
                <hr className="w-full mt-5"></hr>
              <div className="my-2 pt-5 md:mb-0 h-64">
                <div className="flex md:mb-0">
                <label className="block uppercase tracking-wide w-full text-gray-700 text-xs font-bold mb-2" for="grid-city">
               Emplacement sur la carte
                </label>
                <label className="block uppercase tracking-wide text-gray-700 text-xs  mb-2 cursor-pointer hover:font-bold hover:text-orange-500" for="grid-city">
               <div onClick={this.props.map1} >Modifier</div>
                </label>

              </div>
                <div className="">
              <Map google={this.props.google} 
              
                initialCenter={{
                  lat: this.props.formValue.map.latitude,
                  lng: this.props.formValue.map.longitude,
                  zoom: this.props.formValue.map.zoom
                }}
                className="static glmap2 "
              >

                <Marker
                  title={'Current location'}
                  position={{ lat: this.props.formValue.map.latitude, lng: this.props.formValue.map.longitude }}
                />

                {/* <InfoWindow onClose={this.onInfoWindowClose}>
                    <div>
                        <h1>{this.state.selectedPlace.name}</h1>
                        </div>
                    </InfoWindow> */}
              </Map>
                </div>                
               
               <hr className="w-full mt-5"></hr>
              </div>
              
              

            <div className="my-5 md:mb-0">
            <div className="my-5 md:mb-0">
              <div className="flex">
                <label className="block uppercase tracking-wide w-full text-gray-700 text-xs font-bold mb-2" for="grid-city">
                Nom de l’hébergement
                </label>
                <label className="block uppercase tracking-wide text-gray-700 text-xs  mb-2 cursor-pointer hover:font-bold hover:text-orange-500" for="grid-city">
                 <div onClick={this.props.nom1} >Modifier</div>
                </label>
                </div>
                <label className="block uppercase tracking-wide text-gray-700 text-xs  mb-2">{name}</label>
                
              </div>
              <hr className="w-full mt-5"></hr>
             
            </div>
            <div className="flex my-5 md:mb-0">
            
              <input type="checkbox" name="informations" id="daika" onClick={this.onChange}></input>
              <label className="block  tracking-wide text-gray-700 text-xs mb-2 px-3" for="daika">
              Je confirme que ces informations sont correctes
              </label>
             
             
            </div>
       
            <div className="flex items-end justify-end z-50">

                <button class=" text-white font-bold py-2 px-4 rounded mr-1" onClick={this.props.previousStep}>Précédent</button>  
                <button style={{display:this.state.ok}}  class=" text-white pl-6 pr-6 font-bold py-2 px-4 rounded" onClick={this.props.nextStep}>Suivant</button>   
                <button style={{display:this.state.ko}} class=" text-white pl-6 pr-6 font-bold py-2 px-4 rounded bg-gray-400 hover:bg-gray-400" >Suivant</button>

              </div>
        
          </div>
     </>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBawDPz1seR1vu-Fw62CDRjmMU6B_oDOZ4'
  // apiKey: 'AIzaSyAFtfyqG88MBTjMLqT5CTwmdcaxf3-BQwQ'
})(InformationHeb)