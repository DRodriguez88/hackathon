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
      stations : [],
      cheapest: '',
    }
    this.getLocation = this.getLocation.bind(this)
    this.getData = this.getData.bind(this)
    this.showPosition = this.showPosition.bind(this)
    this.changeHandler = this.changeHandler.bind(this)
    this.findCheapest = this.findCheapest.bind(this)
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
    },alert('Location Received'))
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
      }, ()=>this.findCheapest())
      })
  }

  findCheapest() {
    var lowest = this.state.stations[0];
    // for(let i=0; i<this.state.stations.length-1; i++){
    //   if(this.state.stations[i] < this.state.stations[i+1].reg_price){
    //     lowest = this.state.stations[i]
    //   }
    // }
    this.setState({
      cheapest: lowest
    }, ()=>console.log(this.state))
  }


  render() {
    return (
      <div className='container mt-3'>
        <h1>Gassed Up</h1>
        <h5>Find the gas stations</h5>
        <hr />
          <div className='row'>
            <div className='card col-5 ml-3'>
              <div className='card-body'>
                <div className='row pb-2'>
                  <h5 className='ml-2 mr-2'>
                    First:
                  </h5>
                  <a className='btn btn-warning' onClick={this.getLocation}>Get Your Location</a>
                  <span>(May take a sec)</span>
                </div>
                <div className='row pb-2'>
                  <h5 className='ml-2 mr-2'>Distance to search:</h5>
                  <input  name='distance' placeholder='miles(1-50)' onChange={this.changeHandler} type='number'></input>
                </div>
                <a className='btn btn-success btn-block' onClick={this.getData}>Find stations!</a>
              </div>
            </div>
            
            {
              (this.state.stations.length > 0)?
                <div className='card col-6 ml-4'>
                  <div className='card-header'>
                    Cheapest Station for Regular Unleaded
                  </div>
                  <div className='card-body'>
                    <div className='row'>
                      <div className='card'>
                        <p>The cheapest gas within {this.state.distance} miles:</p>
                        <p className='font-weight-bold'>{this.state.cheapest.address}</p>
                        <p className='font-weight-bold'>{this.state.cheapest.city}, {this.state.cheapest.region}, {this.state.cheapest.zip}</p>
                      </div>
                      <div className='card ml-4'>
                        <h3>Regular Unleaded</h3>
                        <h1 className='ml-5 font-weight-bold'>${this.state.cheapest.reg_price}</h1>
                      </div>
                    </div>
                  </div>
                </div>
              :
              <div className='card col-6 ml-4'>
                <h3 className='mt-3'>Provide your location and a radius to search.</h3>
                <h4 className='mt-3'>The default search radius is 5 miles.</h4>
              </div>
            }

          </div>

        {<MapContainer stations={this.state.stations} lat={this.state.latitude} lng={this.state.longitude}/>}
        
      </div>
    );
  }
}

export default App;




