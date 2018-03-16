import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import MapContainer from './MapContainer.js';

class App extends Component {
  constructor(){
    super();
    this.state = {
      latitude : 'none',
      longitude : 'none',
      distance : '5',
      stations : []
    }
    this.getLocation = this.getLocation.bind(this)
    this.getData = this.getData.bind(this)
    this.showPosition = this.showPosition.bind(this)
    this.changeHandler = this.changeHandler.bind(this)
  }

  changeHandler(e) {
    this.setState({
      [e.target.name] : e.target.value
    },()=>console.log(this.state))
  }

  showPosition(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    this.setState({
      latitude : latitude,
      longitude : longitude,
    },()=>console.log(this.state),alert('Location Received'))
    }
  
  getLocation() {
    navigator.geolocation.getCurrentPosition(this.showPosition);
  }

  getData() {
    var url = 'http://api.mygasfeed.com/stations/radius/' + this.state.latitude + '/' + this.state.longitude + '/' + this.state.distance + '/reg/distance/r7i0ude8ep.json'
    axios
    .get(url)
    .then(
      res => {
      const data = res.data;
      this.setState({
        stations: this.state.stations.concat(data.stations)
      }, ()=>console.log(this.state))
      })
  }



  render() {
    return (
      <div className='container mt-3'>
        <h1>Gassed Up</h1>
        <h5>Find the gas stations</h5>
        <hr />
          <div className='card col-5'>
            <div className='card-body'>
              <div className='row pb-2'>
                <h5 className='ml-2 mr-2'>
                  First:
                </h5>
                <a className='btn btn-warning' onClick={this.getLocation}>Get Your Location</a>
              </div>
              <div className='row pb-2'>
                <h5 className='ml-2 mr-2'>Distance to search:</h5>
                <input  name='distance' placeholder='miles(1-50)' onChange={this.changeHandler} type='number'></input>
              </div>
              <a className='btn btn-success btn-block' onClick={this.getData}>Find stations!</a>
            </div>
          </div>
          <div name='mapDiv'>
            {<MapContainer />}
          </div>
      </div>
    );
  }
}

export default App;




