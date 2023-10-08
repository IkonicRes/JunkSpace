import { React, Component } from 'react';
import Viewer from "cesium"

const cesiumDefaultToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmNTUzNTA4Yy01YTNiLTQ1ZDYtOTAzNi1jZjY0NTRlNjQyNTYiLCJpZCI6MTcwNjUxLCJpYXQiOjE2OTY3NzE4OTF9.H6QbhLHrhp_Culob6xtjd56owzBtTWgSDNoZHOWe7Fs"

class CesiumMap extends Component {
  componentDidMount() {
    Cesium.Ion.defaultAccessToken = cesiumDefaultToken
    // Initialize Cesium viewer in the component's DOM element
    const viewer = new Viewer(this.cesiumContainer);
  }

  render() {
    return <div ref={(element) => (this.cesiumContainer = element)} />;
  }
}

export default CesiumMap;