import React, { Component } from 'react'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

const map = (props) => {
    return (
        <Map google={props.google} 
        initialCenter={{
            lat: -21.11524923302493,
            lng: 55.582236825683566,
        }}
        zoom={9}
            className="glmap3  mb-5"
        >

            {
                props.logements && props.logements.map(logement => (
                    <Marker
                        title={'Current location'}
                        position={{ lat: logement.map.latitude, lng: logement.map.longitude }}
                    />
         
                ))
            }
        </Map>
    )
}
export default GoogleApiWrapper({
    // apiKey: 'AIzaSyBawDPz1seR1vu-Fw62CDRjmMU6B_oDOZ4'
    apiKey: 'AIzaSyAFtfyqG88MBTjMLqT5CTwmdcaxf3-BQwQ'
})(map)