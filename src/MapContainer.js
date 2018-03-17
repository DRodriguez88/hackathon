import React, { Component } from 'react';
import './App.css';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import MarkerMaker from './MarkerMaker.js';
 
export class MapContainer extends Component {

  render() {
      return (
        <Map google={this.props.google} zoom={2}>
          {/* { this.props.stations.map((station, index) => 
              <MarkerMaker google={this.props.google} 
                key={index} 
                lat={parseFloat(station.lat)} 
                lng={parseFloat(station.lng)}/>
              )} */}

          { 
            this.props.stations.map((station, index) => 
              <Marker 
                key={index} 
                google={this.props.google}
                position= {{
                  lat: parseFloat(station.lat),
                  lng: parseFloat(station.lng)
                }}
              />
          )}    
          
          <Marker id='homeMarker' google={this.props.google} position={{lat: [this.props.lat], lng: [this.props.lng]}}/>
        </Map>
      );
    }
}
 
export default GoogleApiWrapper({
  apiKey: 'AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo'
})(MapContainer)