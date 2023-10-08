import React, { Component } from 'react';
import { Cartesian3, createOsmBuildingsAsync, Ion, Math as CesiumMath, Terrain, Viewer } from 'cesium';
import 'cesium/Build/Cesium/Widgets/widgets.css';

class CesiumMap extends Component {
  componentDidMount() {
    // Cesium Ion access token
    Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmNTUzNTA4Yy01YTNiLTQ1ZDYtOTAzNi1jZjY0NTRlNjQyNTYiLCJpZCI6MTcwNjUxLCJpYXQiOjE2OTY3NzE4OTF9.H6QbhLHrhp_Culob6xtjd56owzBtTWgSDNoZHOWe7Fs';

    // Initialize the Cesium Viewer in the component's DOM element
    const viewer = new Viewer(this.cesiumContainer, {
      terrain: Terrain.fromWorldTerrain(),
    });

    // Fly the camera to San Francisco at the given longitude, latitude, and height
    viewer.camera.flyTo({
      destination: Cartesian3.fromDegrees(-122.4175, 37.655, 400),
      orientation: {
        heading: CesiumMath.toRadians(0.0),
        pitch: CesiumMath.toRadians(-15.0),
      },
    });

    // Add Cesium OSM Buildings, a global 3D buildings layer
    createOsmBuildingsAsync().then((buildingTileset) => {
      viewer.scene.primitives.add(buildingTileset);
    });
  }

  render() {
    return <div ref={(element) => (this.cesiumContainer = element)} style={{ height: '100vh' }} />;
  }
}

export default CesiumMap;