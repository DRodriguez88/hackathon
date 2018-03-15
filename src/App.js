import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(){
    super();
    this.state = {
      latitude : 'none',
      longitude : 'none',
      distance : '5',
      fuelType : 'reg',
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
    var url = 'http://api.mygasfeed.com/stations/radius/' + this.state.latitude + '/' + this.state.longitude + '/' + this.state.distance + '/' + this.state.fuelType + '/distance/r7i0ude8ep.json'
    axios
    .get(url)
    .then(
      res => {
      const data = res.data;
      console.log(data)})
  }



  render() {
    return (
      <div className='container'>
        <div>
          <h1>Dollars per Gallon</h1>
          <a className='btn btn-warning' onClick={this.getLocation}>Location</a>
          reg, med, pre, or diesel
          <input name='fuelType' placeholder='fuel type' onChange={this.changeHandler}></input>
          Number 1-50
          <input  name='distance' placeholder='distance' onChange={this.changeHandler} type='number'></input>
          <a className='btn btn-success' onClick={this.getData}>GET GAS</a>
        </div>
      </div>
    );
  }
}

export default App;




