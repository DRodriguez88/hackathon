import React, { Component } from 'react';
import './App.css';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
 
export class MapContainer extends Component {
  mapZoom = 10;
  style = {
    height: '60%',
    width: '80%'
  }

  render() {
      return (
        <Map 
          google={this.props.google} 
          zoom={this.mapZoom}
          style={this.style} 
          center={{
            lat: 32.7090788, 
            lng: -117.15620969999999}}>
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
            )
          }    
          
        <Marker id='homeMarker' google={this.props.google} position={{lat: [this.props.lat], lng: [this.props.lng]}}/>
        </Map>
      );
    }
}
 
export default GoogleApiWrapper({
  apiKey: 'AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo'
})(MapContainer)