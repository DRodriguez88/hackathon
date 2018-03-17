import React, { Component } from 'react';
import Marker from 'google-maps-react';

class MarkerMaker extends Component {
    constructor(props) {
        super(props);
        this.getId = this.getId.bind(this);
    }

    getId() {
        let rndId = Math.floor(100000*Math.random());

        return rndId;
    }

    render() {
        console.log("props", this.props);
        let position = { 
            lat: parseFloat(this.props.lat),
            lng: parseFloat(this.props.lng)
        };

        console.log("position", position);

        return (
            <Marker id={this.getId()}
                google={this.props.google} position={ position }/>
        );
    }
}

export default MarkerMaker;