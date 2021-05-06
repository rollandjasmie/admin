import React, { Component } from 'react'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

const map=(props)=>{
    return(
        <Map google={props.google} zoom={props.map.zoom}
         
            initialCenter={{
                lat: props.map.latitude,
                lng: props.map.longitude
            }}
            className="glmap3 mx-4 mb-5"
        >

            <Marker
                title={'Current location'}
                position={{ lat: props.map.latitude, lng: props.map.longitude }}
            />
        </Map>
    )
}
export default GoogleApiWrapper({
    // apiKey: 'AIzaSyBawDPz1seR1vu-Fw62CDRjmMU6B_oDOZ4'
    apiKey: 'AIzaSyAFtfyqG88MBTjMLqT5CTwmdcaxf3-BQwQ'
})(map)