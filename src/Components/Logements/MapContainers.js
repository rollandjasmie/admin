import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
export class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state={zoom:this.props.formValue.map.zoom}
        let { formValue, setFormValue } = this.props;
    }
  
    marker=(value, marker, e)=>{
        let { formValue, setFormValue } = this.props;
        formValue = {
            ...formValue,
            map: {
                latitude: marker.position.lat(),
            longitude: marker.position.lng(),
            zoom: 8.56
            }
        }
        setFormValue(formValue);
    }
    handleZoomChanged=(zoom)=>{
       zoom.google.maps.event.addListener("zoom_changed", () => {
            console(zoom.google.maps.getZoom());
        })
    }
    render() {
        return (
            <>
               {/* <div className=" regle w-auto h-full on inline-block element mt-15  my-5 mx-5 bg-white shadow-md rounded pb-8 mb-10 " >
        <div className="z-0 mapcont w-full mb-6 md:mb-0">
            <Map google={this.props.google} zoom={this.state.zoom}
                // style={{ width: '50%', height: '50%'}}
                initialCenter={{
                    lat: this.props.formValue.map.latitude,
                    lng: this.props.formValue.map.longitude,
                    zoom: this.props.formValue.map.zoom
                }}
                    onZoomChanged={this.handleZoomChanged}
                className="z-10 glmap "
                >
                <Marker 
                    title={'Current location'}
                    position={{ lat: this.props.formValue.map.latitude, lng: this.props.formValue.map.longitude }}
                    draggable={true}
                    onDragend={this.marker}
                    />
            </Map>
            </div>
                <div className="z-40 h-full w-full flex items-end justify-center pt-40 px-8 pt-6 pb-8 mb-10">

                    <button class="z-40 text-white font-bold py-2 px-4 rounded mr-1" onClick={this.props.previousStep}>Précédent</button>
                    <button class="z-40 text-white pl-6 pr-6 font-bold py-2 px-4 rounded" onClick={this.props.nextStep}>Suivant</button>
                </div>
            </div>     */}
<div className="relative w-3/4 on inline-block element mt-5 pl-10 ml-10 bg-white shadow-md rounded px-8  pb-8 mb-10  ">
              <div className="my-2 pt-5 md:mb-0">
                <div className="flex md:mb-0">
                <label className="block uppercase tracking-wide w-full text-gray-700 text-xs font-bold mb-2" for="grid-city">
               Emplacement sur la carte
                </label>
                <label className="block uppercase tracking-wide text-gray-700 text-xs  mb-2 cursor-pointer hover:font-bold hover:text-orange-500" for="grid-city">
             
                </label>

              </div>
                    </div>
                    
                <div className="static h-72">
                <Map google={this.props.google} zoom={this.state.zoom}
            
                initialCenter={{
                    lat: this.props.formValue.map.latitude,
                    lng: this.props.formValue.map.longitude
                }}
                    onZoomChanged={this.handleZoomChanged}
                className="static glmap "
              >
                <Marker 
                    title={'Current location'}
                    position={{ lat: this.props.formValue.map.latitude, lng: this.props.formValue.map.longitude }}
                    draggable={true}
                    onDragend={this.marker}
                    />
            </Map>
                </div>                
            <div className="flex  justify-end mt-8 my-8">
            <button class=" text-white font-bold py-2 px-4 rounded mr-1" onClick={this.props.previousStep}>Précédent</button>
                    <button class=" text-white pl-6 pr-6 font-bold py-2 px-4 rounded" onClick={this.props.nextStep}>Suivant</button>
              </div>
          </div>
            </>
        );
    }
}

export default GoogleApiWrapper({
    // apiKey:'AIzaSyBawDPz1seR1vu-Fw62CDRjmMU6B_oDOZ4'
    apiKey: 'AIzaSyAFtfyqG88MBTjMLqT5CTwmdcaxf3-BQwQ'
})(MapContainer)