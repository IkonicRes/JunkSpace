import React, { Component } from 'react';
import {Viewer} from "cesium"

class CesiumMap extends Component {
  componentDidMount() {
    
    // Initialize Cesium viewer in the component's DOM element
    const viewer = new Viewer(this.cesiumContainer);
  }

  render() {
    return <div ref={(element) => (this.cesiumContainer = element)} />;
  }
}

export default CesiumMap;