import { Component } from 'react';
import {createOsmBuildingsAsync, Ion, Terrain, Viewer, SkyBox, createWorldImageryAsync, Cartesian3, CzmlDataSource, Model, Color, EntityCollection, Matrix4, Quaternion} from 'cesium';
// import "cesium/Build/Cesium/Widgets/widgets.css";
// import { twoline2satrec, propagate, gstime, eciToGeodetic, degreesLat, degreesLong } from 'satellite.js';
import Skybox_back from '/assets/SkyBoxBK.png'
import Skybox_bottom from'/assets/SkyBoxDN.png'
import Skybox_front from '/assets/SkyBoxFT.png'
import Skybox_left from '/assets/SkyBoxLF.png'
import Skybox_right from '/assets/SkyBoxRT.png'
import Skybox_top from '/assets/SkyBoxUP.png'

const czmlFile = "http://localhost:4001/assets/temp.tle.czml"

class CesiumMap extends Component {
  async componentDidMount() {
    // Cesium Ion access token
    Ion.defaultAccessToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmNTUzNTA4Yy01YTNiLTQ1ZDYtOTAzNi1jZjY0NTRlNjQyNTYiLCJpZCI6MTcwNjUxLCJpYXQiOjE2OTY3NzE4OTF9.H6QbhLHrhp_Culob6xtjd56owzBtTWgSDNoZHOWe7Fs";

     const model = await Model.fromGltfAsync({
        url: `http://localhost:4000/assets/sat.glb`,
        modelMatrix: Matrix4.fromTranslationQuaternionRotationScale(
          new Cartesian3(-123, 44.0, 17500000.0), // translation
          Quaternion.IDENTITY,           // rotation
          new Cartesian3(100000, 100000, 100000), // scale
        ),
        minimumPixelSize: 64,
        maximumScale: 1,
        silhouetteColor: Color.GREENYELLOW,
        silhouetteSize: 0,
        //releaseGltfJson: false # If true, the json file will not be cached
    })

    // Initialize the Cesium Viewer in the component's DOM element
    const viewer = new Viewer(this.cesiumContainer, {
      infoBox: false,
      selectionIndicator: false,
      shadows: true,
      shouldAnimate: true,
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
      }),
    });

    // const referenceSemimajorAxis = 0.5; // Replace with your value

    // Hide unnecessary Cesium controls
    viewer.animation.container.style.visibility = "hidden";
    viewer.timeline.container.style.visibility = "hidden";
    viewer.fullscreenButton.container.style.visibility = "hidden";
    viewer.navigationHelpButton.container.style.visibility = "hidden";

    // Configure camera settings
    viewer.scene.screenSpaceCameraController.enableTranslate = false;
    viewer.scene.screenSpaceCameraController.inertiaSpin = 0.2;
    viewer.scene.screenSpaceCameraController.enableTilt = false;
    viewer.scene.screenSpaceCameraController.enableLook = false;

    viewer.forceResize();

    // Set up camera zoom limits
    viewer.camera.defaultZoomAmount = 100000000000000.0;
    // viewer.scene.screenSpaceCameraController.minimumZoomDistance = 17500000;
    // viewer.scene.screenSpaceCameraController.maximumZoomDistance = 20000000 * 2;
    // {
    //   position: Cartesian3.fromDegrees(-123.0744619, 44.0503706),
    //   model: {
    //     uri: "../../public/assets/sat.glb",
    //   },
    //   scale: 1000
    // }

    const entity = viewer.scene.primitives.add(
      model
    );
    console.log("Viewer made")
    // viewer.trackedEntity = entity;
    // viewer.dataSources.add(
    //   CzmlDataSource.load(czmlFile)
    //   );
    // Add Cesium OSM Buildings, a global 3D buildings layer
    createOsmBuildingsAsync().then((buildingTileset) => {
      viewer.scene.primitives.add(buildingTileset);
    });
  }

  render() {
    return (
      <div
        ref={(element) => (this.cesiumContainer = element)}
        style={{ height: "100vh" }}
      />
    );
  }
}

export default CesiumMap;
