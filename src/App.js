import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(){
    super();
    this.state = {
      location : 'none',
      distance : '5',
      fuelType : 'reg',
    }
    this.handleClick = this.handleClick.bind(this)
    this.showPosition = this.showPosition.bind(this)
    this.changeHandler = this.changeHandler.bind(this)
  }

  changeHandler(e) {
    this.setState({
      [e.target.name] : e.target.value
    },()=>console.log(this.state))
  }

  showPosition(position) {
    var foo = position.coords.latitude + ' , ' +position.coords.longitude;
    this.setState({
      location : foo
    },()=>alert('Location Received'))
    }
  
  handleClick() {
    if (this.state.location === 'none'){navigator.geolocation.getCurrentPosition(this.showPosition);}


    
    // axios
    // .get(`http://api.mygasfeed.com/stations/radius/32.708859/-117.156273/5/reg/10/r7i0ude8ep.json`)
    // .then(
    //   res => {
    //   const persons = res.data;
    //   console.log(persons)})
  }



  render() {
    return (
      <div className='container'>
        <div>
          <h1>Dollars per Gallon</h1>
          <a className='btn btn-warning' onClick={this.handleClick}>Location</a>
          reg, med, pre, or diesel
          <input name='fuelType' placeholder='fuel type' onChange={this.changeHandler}></input>
          Number 1-50
          <input  name='distance' placeholder='distance' onChange={this.changeHandler} type='number'></input>
          <a className='btn btn-success' onClick={this.handleClick}>GET GAS</a>
        </div>
      </div>
    );
  }
}

export default App;




