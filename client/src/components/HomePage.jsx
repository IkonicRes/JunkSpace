import { Component } from 'react';
import { Cartesian3, createOsmBuildingsAsync, Ion, JulianDate, Terrain, Viewer, SkyBox } from 'cesium';

// import { twoline2satrec, propagate, gstime, eciToGeodetic, degreesLat, degreesLong } from 'satellite.js';
import { GET_SPACE_DEBRIS } from '../utils/queries';
import { ApolloConsumer } from '@apollo/client';
import Skybox_back from '/assets/SkyBoxBK.png'
import Skybox_bottom from'/assets/SkyBoxDN.png'
import Skybox_front from '/assets/SkyBoxFT.png'
import Skybox_left from '/assets/SkyBoxLF.png'
import Skybox_right from '/assets/SkyBoxRT.png'
import Skybox_top from '/assets/SkyBoxUP.png'
import axios from 'axios';

class CesiumMap extends Component {
  // async fetchSpaceDebrisData() {
  //   try {
  //     console.log("client:", this.props.client)
  //     const { data } = await this.props.client.query({
  //       query: GET_SPACE_DEBRIS,
  //       variables: { id: '25544' }, // Provide the appropriate variables
  //     });
  
  //     // Handle the data as needed
  //     console.log('Space Debris Data:', data);
  //   } catch (error) {
  //     console.error('Error fetching space debris data:', error);
  //   }
  // }

  async componentDidMount() {

    // this.fetchSpaceDebrisData();

    // Cesium Ion access token
    Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmNTUzNTA4Yy01YTNiLTQ1ZDYtOTAzNi1jZjY0NTRlNjQyNTYiLCJpZCI6MTcwNjUxLCJpYXQiOjE2OTY3NzE4OTF9.H6QbhLHrhp_Culob6xtjd56owzBtTWgSDNoZHOWe7Fs';

    // Initialize the Cesium Viewer in the component's DOM element
    const viewer = new Viewer(this.cesiumContainer, {
      skyBox : new SkyBox({

        sources : {
        
        // positiveX : Skybox_front,
        positiveX : Skybox_front,
        
        negativeX : Skybox_back,
        // negativeX : FTex,
        
        positiveY : Skybox_bottom,
        // positiveY : FTex,
        
        negativeY : Skybox_top,
        // negativeY : FTex,
        
        positiveZ : Skybox_left,
        // positiveZ : FTex,
        
        negativeZ : Skybox_right
        // negativeZ : FTex
        
        },
        
        terrain: Terrain.fromWorldTerrain(),
        })
    });

    const referenceSemimajorAxis = 0.5; // Replace with your value

    // Hide unnecessary Cesium controls
    viewer.animation.container.style.visibility = 'hidden';
    viewer.timeline.container.style.visibility = 'hidden';
    viewer.fullscreenButton.container.style.visibility = 'hidden';
    viewer.navigationHelpButton.container.style.visibility = 'hidden';

    // Configure camera settings
    viewer.scene.screenSpaceCameraController.enableTranslate = false;
    viewer.scene.screenSpaceCameraController.inertiaSpin = 0.2;
    viewer.scene.screenSpaceCameraController.enableTilt = false;
    viewer.scene.screenSpaceCameraController.enableLook = false;

    viewer.forceResize();

    // Set up camera zoom limits
    viewer.camera.defaultZoomAmount = 100000000000000.0;
    viewer.scene.screenSpaceCameraController.minimumZoomDistance = 17500000;
    viewer.scene.screenSpaceCameraController.maximumZoomDistance = 20000000 * 2;

    // Function to compute satellite position
    // function computeSatellitePosition(tleData, currentTime) {
    //   var satrec = twoline2satrec(tleData.TLE_LINE1, tleData.TLE_LINE2);
    //   var positionAndVelocity = propagate(satrec, currentTime);
    //   var positionEci = positionAndVelocity.position;
    //   var gmst = gstime(currentTime);
    //   var positionGd = eciToGeodetic(positionEci, gmst);
    //   var latitude = degreesLat(positionGd.latitude);
    //   var longitude = degreesLong(positionGd.longitude);
    //   var altitude = positionGd.height;
    //   var cartesianPosition = Cartesian3.fromDegrees(longitude, latitude, altitude);
    //   return cartesianPosition;
    // }

    // Make HTTP requests to fetch TLE data and create satellite entities
    // const fetchTLEDataAndCreateSatellites = async () => {
    //   // for (var noradCatId = 25514; noradCatId <= 25544; noradCatId++) {
    //     try{
    //     const response = await axios.get('https://www.space-track.org/basicspacedata/query/class/tle/NORAD_CAT_ID/25544/limit/1/');
    //     const data = response.data[0];
    //     // const currentTime = JulianDate.now();
    //     const satellitePosition = Cartesian3.fromDegrees(0, 0, 15000000)
    //     const testSat = viewer.entities.add({
    //       name: `Satellite 25544`,
    //       model: {
    //         uri: '../assets/sat.gltf',
    //         scale: (2 * data.SEMIMAJOR_AXIS) / referenceSemimajorAxis,
    //       },
    //       position: satellitePosition,
    //     });
    //     // } 
    //     viewer.trackedEntity = testSat;
    //   }
    //   catch (err) {
    //     console.log(err)
    //   }
    //   };
    // fetchTLEDataAndCreateSatellites();

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
