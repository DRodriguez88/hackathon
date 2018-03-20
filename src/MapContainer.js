import React, { Component } from 'react';
import './App.css';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
 
export class MapContainer extends Component {

  style = {
    height: '60%',
    width: '80%'
  }

  render() {
      let lat = parseFloat(this.props.lat);
      let lng = parseFloat(this.props.lng);
      let pos = { lat, lng };

      return (
        <Map 
          google={this.props.google} 
          zoom={this.props.zoom}
          style={this.style} 
          center={pos}
           >
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