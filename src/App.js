import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import MapContainer from './MapContainer.js';

class App extends Component {
  constructor(){
    super();
    this.state = {
      latitude : 40.400186,
      longitude : -99.551047,
      distance : '5',
      stations : [],
      cheapest: '',
      zoom: 3,
    }
    this.getLocation = this.getLocation.bind(this)
    this.getData = this.getData.bind(this)
    this.showPosition = this.showPosition.bind(this)
    this.changeHandler = this.changeHandler.bind(this)
    this.findCheapest = this.findCheapest.bind(this)
    this.zoomer = this.zoomer.bind(this)
  }

  componentWillMount() {
    this.getLocation()
  }

  showPosition(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    this.setState({
      latitude : latitude,
      longitude : longitude,
      zoom : 12
    })
    }
  
  getLocation() {
    navigator.geolocation.getCurrentPosition(this.showPosition);
  }

  changeHandler(e) {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  getData() {
    var url = 'http://api.mygasfeed.com/stations/radius/' + this.state.latitude + '/' + this.state.longitude + '/' + this.state.distance + '/reg/distance/r7i0ude8ep.json'
    axios
    .get(url)
    .then(
      res => {
      const data = res.data;
      console.log(data);
      this.setState({
        stations: this.state.stations.concat(data.stations)
      }, ()=>this.findCheapest())
      })
  }

  findCheapest() {
    var cheapest = this.state.stations[0];
    for(let i=0; i < this.state.stations.length-1; i++){
      if(cheapest.reg_price > this.state.stations[i+1].reg_price){cheapest = this.state.stations[i+1]}
    }
    this.setState({
      cheapest: cheapest
    },()=>this.zoomer())
  }

  zoomer() {
    var mapZoom;
    if (this.state.distance <= 1){
      mapZoom = 14;
    }
    else if (this.state.distance <=2){
      mapZoom = 13;
    }
    else if (this.state.distance <= 3){
      mapZoom = 12;
    }
    else if (this.state.distance <= 7){
      mapZoom = 11
    }
    else if (this.state.distance <= 10){
      mapZoom = 10
    }
    else if (this.state.distance <= 25){
      mapZoom = 9
    }
    else if (this.state.distance <= 50){
      mapZoom = 8
    }

    this.setState({
      zoom: mapZoom
    },()=>console.log(this.state.zoom))
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
                  <h5 className='ml-2 mr-2'>Search 1-50 miles:</h5>
                  <input  name='distance' placeholder='default 5 miles' onChange={this.changeHandler} type='number'></input>
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
                      <div className='card p-2'>
                        <p>The cheapest gas within {this.state.distance} miles:</p>
                        <p className='font-weight-bold'>{this.state.cheapest.address}</p>
                        <p className='font-weight-bold'>{this.state.cheapest.city}, {this.state.cheapest.region}, {this.state.cheapest.zip}</p>
                      </div>
                      <div className='card ml-4 p-2'>
                        <h3>Regular Unleaded</h3>
                        <h1 className='ml-5 font-weight-bold'>${this.state.cheapest.reg_price}</h1>
                      </div>
                    </div>
                  </div>
                </div>
              :
              <div className='card col-6 ml-4'>
                <h3 className='mt-3'>Provide your location and a radius (maximum 50 miles) to search.</h3>
              </div>
            }

          </div>

        {<MapContainer stations={this.state.stations} lat={this.state.latitude} lng={this.state.longitude} zoom={this.state.zoom}/>}
        
      </div>
    );
  }
}

export default App;




