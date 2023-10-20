
const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('@apollo/server');
const bodyParser = require('body-parser');
const { expressMiddleware } = require('@apollo/server/express4');
const db = require('./config/connection');
// const fetch = require('node-fetch'); // Import node-fetch
const path = require('path'); // Import path module
const PORT = process.env.PORT || 4001
const { typeDefs, resolvers } = require("./schemas");
const { Satellite } = require('./models');
const { authMiddleware } = require('./utils/auth');
const { createSatellite } = require('./schemas/typeDefs')
const axios = require('axios');
const { resolve } = require("path");

// const { JSONFile, Low } = require("lowdb";

const Database = () => {
  const filePath = resolve("data", "db.json");
  const adapter = new JSONFile(filePath);
  return new Low(adapter);
};


// const { PeliasGeocoderService } = require('cesium');
require('dotenv').config()

// Create an instance of Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers
});


const app = express();

const startServer = async () => {
  await server.start();
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // app.use('/.netlify/functions/graphql', expressMiddleware(server));
  app.use('/graphql', expressMiddleware(server));
  app.use(cors())
  // Define a route for your proxy
  app.get('/space-track/:noradCatId', async (req, res) => {
    const { noradCatId } = req.params;
    try {
      console.log('in')
      // Make a request to the Space-Track API
      const response = await fetch(`https://www.space-track.org/basicspacedata/query/class/tle/NORAD_CAT_ID/${noradCatId}/limit/1/format/json/`);
      const data = await response.json();


      // Send the response data back to the frontend
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  });
  function querySpaceTrackUrl(objectId) {
    // Construct the query URL based on the `objectId`
    // You should follow Space-Track's API documentation to create the correct URL.
    const spaceTrackBaseUrl = 'https://www.space-track.org/basicspacedata/query';
    const query = `class/tle/NORAD_CAT_ID/${objectId}/limit/1`;

    return `${spaceTrackBaseUrl}/${query}`;
  }
  async function querySpaceTrack(objectId) {
      try {
        const user = process.env.SPACETRACK_USER;
        const password = process.env.SPACETRACK_PASSWORD;
        const queryUrl = querySpaceTrackUrl(objectId);
  
        const postData = {
          identity: user,
          password: password,
          query: queryUrl
        };
      // Space-Track.Org auth API URL
      const loginURL = 'https://www.space-track.org/ajaxauth/login/';

      // Send the POST request to Space-Track.org with the user/pwd/query as post data
      const response = await axios.post(loginURL, postData);

      var data = response.data
      data[0].PRICE = 1000
      const newSat = await Satellite.create(data)
      console.log(newSat, response.data)
      newSat.owner = ''
      // Check the response status and resolve with data or reject with an error
      return newSat
    } catch (error) {
      console.error('Error:', error);
      response.status(500).json(error);
    }
  };
  // resolvers.Query.getTleData("25544")
  var curFetchCount = 25544
  const fetchAndAddSatellites = async () => {
    try {
      // var exists = Satellite.find({ "NORAD_CAT_ID": curFetchCount.toString() })
      // if (exists) {
      //   console.log(`CatID ${curFetchCount} exists!`)
        curFetchCount++
      // }
      // else{
      var satelliteData = await querySpaceTrack(curFetchCount);
      // curFetchCount++
      // }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  };
  // const interval = 3000
  const interval = 60 * 60 * 24 * 1000;
  setInterval(fetchAndAddSatellites, interval);
  // fetchAndAddSatellites()
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));

    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/dist/index.html"));
    });
  }

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

startServer();

module.exports = app;
