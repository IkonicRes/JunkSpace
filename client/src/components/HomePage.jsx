import { Component, useEffect, useRef } from "react";
import {
  createOsmBuildingsAsync,
  Ion,
  Terrain,
  Viewer,
  SkyBox,
  createWorldImageryAsync,
  Cartesian3,
  CzmlDataSource,
  Model,
  Color,
  EntityCollection,
  Matrix4,
  Quaternion,
  defined,
  ScreenSpaceEventType,
  ScreenSpaceEventHandler,
  Math,
  InfoBox
} from "cesium";
// import "cesium/Build/Cesium/Widgets/widgets.css";
import { propagate, gstime, eciToGeodetic, twoline2satrec } from 'satellite.js';
import Skybox_back from "/assets/SkyBoxBK.png";
import Skybox_bottom from "/assets/SkyBoxDN.png";
import Skybox_front from "/assets/SkyBoxFT.png";
import Skybox_left from "/assets/SkyBoxLF.png";
import Skybox_right from "/assets/SkyBoxRT.png";
import Skybox_top from "/assets/SkyBoxUP.png";
const czmlFile = "http://localhost:4001/assets/temp.tle.czml";
import { useQuery } from "@apollo/client";
import { GET_ALL_SATELLITES } from "../utils/queries";
import { useCartContext } from "../utils/cartContext";

const CesiumMap = () => {
  const cart = useCartContext();
  const ref = useRef();
  const { loading, error, data } = useQuery(GET_ALL_SATELLITES);
  // Cesium Ion access token

  //  const model = Model.fromGltfAsync({
  //     id: '24455',
  //     url: `http://localhost:4000/assets/sat.glb`,
  //     modelMatrix: Matrix4.fromTranslationQuaternionRotationScale(
  //       new Cartesian3(-123, 44.0, 10000000.0), // translation
  //       Quaternion.IDENTITY,           // rotation
  //       new Cartesian3(100000, 100000, 100000), // scale
  //     ),
  //     minimumPixelSize: 64,
  //     maximumScale: 1,
  //     silhouetteColor: Color.GREENYELLOW,
  //     silhouetteSize: 0,
  //     //releaseGltfJson: false # If true, the json file will not be cached
  //     data: data.allSatellites[0]
  // })
  const scaleFactor = 7;
  const findSatelliteById = (satellites, id) => {
    for (const sat of satellites) {
      console.log(sat)
      if (sat.NORAD_CAT_ID == id) {
        // sat.price = 1000
        return sat
      }
    }
  }
  // const infobox = new InfoBox(ref)
  const createSatelliteModels = async (satelliteDataArray) => {

    const models = [];
    var count = 0
    for (const sat of satelliteDataArray) {
      count++
      if (count > 3){
        break
      }
      console.log(sat)
      const tle = {
        t: (`${sat.TLE_LINE1} ${sat.TLE_LINE2}`)

      };
      console.log("tle", tle)
      var satrec = twoline2satrec(sat.TLE_LINE1, sat.TLE_LINE2);
      var positionAndVelocity = await propagate(satrec, new Date());
      console.log(positionAndVelocity)
  
      const gmst = gstime(new Date());
      const longitude = positionAndVelocity.position.x
      const latitude = positionAndVelocity.position.y
      const height = positionAndVelocity.position.z
      console.log(longitude, latitude, height)
      const lonDeg = Math.toDegrees(longitude);
      const latDeg = Math.toDegrees(latitude);
      console.log(`LAT:${latDeg}, LON:${lonDeg}`)
      const modelPromise = Model.fromGltfAsync({
  
        id: sat.NORAD_CAT_ID,
  
        url: "http://localhost:4000/assets/sat.glb",
  
        modelMatrix: Matrix4.fromTranslationQuaternionRotationScale(
  
          new Cartesian3(lonDeg, latDeg, 7750000),
          
          Quaternion.IDENTITY,
  
          new Cartesian3(
            
            sat.SEMIMAJOR_AXIS * scaleFactor,
            sat.SEMIMAJOR_AXIS * scaleFactor,
            sat.SEMIMAJOR_AXIS * scaleFactor
  
          )
        ),
  
        minimumPixelSize: 64,
  
        maximumScale: 2,
  
        silhouetteColor: Color.GREEN,
  
      });
      const model = await modelPromise
      models.push(model);
  
    }
  
    return models;
  
  };
  useEffect(() => {
    console.log("S", data, ref, ref.current);
    if (loading) {
      return;
    }
    if (!ref.current) {
      return;
    }

    Ion.defaultAccessToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmNTUzNTA4Yy01YTNiLTQ1ZDYtOTAzNi1jZjY0NTRlNjQyNTYiLCJpZCI6MTcwNjUxLCJpYXQiOjE2OTY3NzE4OTF9.H6QbhLHrhp_Culob6xtjd56owzBtTWgSDNoZHOWe7Fs";
    // Initialize the Cesium Viewer in the component's DOM element
    const viewer = new Viewer(ref.current, {
      infoBox: false,
      selectionIndicator: false,
      shadows: true,
      shouldAnimate: true,
      skyBox: new SkyBox({
        sources: {
          // positiveX : Skybox_front,
          positiveX: Skybox_front,

          negativeX: Skybox_back,
          // negativeX : FTex,

          positiveY: Skybox_bottom,
          // positiveY : FTex,

          negativeY: Skybox_top,
          // negativeY : FTex,

          positiveZ: Skybox_left,
          // positiveZ : FTex,

          negativeZ: Skybox_right,
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
    viewer.scene.screenSpaceCameraController.minimumZoomDistance = 17500000;
    viewer.scene.screenSpaceCameraController.maximumZoomDistance = 20000000 * 2;
    // {
    //   position: Cartesian3.fromDegrees(-123.0744619, 44.0503706),
    //   model: {
    //     uri: "../../public/assets/sat.glb",
    //   },
    //   scale: 1000
    // }

    // const models = await getSats()
    console.log(data);

    const entities = []
    const loadModels = async function () {
      var models = await createSatelliteModels(data.allSatellites)
      models.forEach((model) => {
        console.log(model);
        viewer.scene.primitives.add(model)
        entities.push(model)
      })
    }
    var scene = viewer.scene;
    createOsmBuildingsAsync().then((buildingTileset) => {
      viewer.scene.primitives.add(buildingTileset);
    });
    loadModels()
    var handler = new ScreenSpaceEventHandler(scene.canvas);
    handler.setInputAction(async function (click) {
      var pickedObject = scene.pick(click.position);
      const satelliteId = await pickedObject.id
      console.log("picked: ", pickedObject)
      if (defined(pickedObject)) {
        const matchedSat = await findSatelliteById(data.allSatellites, satelliteId)
        console.log('matchedSat: ', matchedSat)
        if (matchedSat) {
          console.log('matchedSat: ', matchedSat);
          cart.addToCart(matchedSat);
        } else {
          console.error('Satellite not found with ID:', satelliteId);
        }
      }
    }, ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
  });
  console.log("Viewer made");
  // viewer.trackedEntity = entity;
  // viewer.dataSources.add(
  //   CzmlDataSource.load(czmlFile)
  //   );
  // Add Cesium OSM Buildings, a global 3D buildings layer

  return (loading) ? <div>loading</div> : <div ref={ref} style={{ height: "100vh" }} />;
};

export default CesiumMap;
