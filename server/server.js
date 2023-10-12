
const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('@apollo/server');
const bodyParser = require('body-parser');
const { expressMiddleware } = require('@apollo/server/express4');
const { createProxyMiddleware } = require('http-proxy-middleware');
const axios = require('axios')
const db = require('./config/connection');
// const fetch from 'node-fetch'); // Import node-fetch
const path = require('path'); // Import path module
const PORT = process.env.PORT || 4001;
const { typeDefs, resolvers } = require("./schemas");
const { authMiddleware } = require('./utils/auth');
const {createSatellite} = require('./schemas/typeDefs')

// Create an instance of Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});


const app = express();

const startServer = async () => {
  await server.start();
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  
  app.use(cors())
  app.use('/graphql', expressMiddleware(server), createProxyMiddleware({
    target: 'https://www.space-track.org',
    changeOrigin: true,
  }));
  // Define a route for your proxy
  // app.get('/space-track/:noradCatId', async (req, res) => {
  //   const { noradCatId } = req.params;
  //   try {
  //     // Make a request to the Space-Track API
  //     const response = await fetch(`https://www.space-track.org/basicspacedata/query/class/tle/NORAD_CAT_ID/${noradCatId}/limit/1/format/json/`);
  //     const data = await response.json();


  //     // Send the response data back to the frontend
  //     res.json(data);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ error: 'An error occurred' });
  //   }
  // });
  function querySpaceTrackUrl(objectId) {
    // Construct the query URL based on the `objectId`
    // You should follow Space-Track's API documentation to create the correct URL.
    const spaceTrackBaseUrl = 'https://www.space-track.org/basicspacedata/query';
    const query = `class/tle/NORAD_CAT_ID/${objectId}/limit/1`;
  
    return `${spaceTrackBaseUrl}/${query}`;
  }

  function querySpaceTrack(objectId) {
    return new Promise(async (resolve, reject) => {
      try {
        // NEVER share your spacetrack user / password with anyone!!
        // So, especially don't put them in source code.
        // You can either pass them in as command line args, or better yet get them from
        // environment variables.
        const user = process.env.SPACETRACK_USER;
        const password = process.env.SPACETRACK_PASSWORD;
        const queryUrl = querySpaceTrackUrl(objectId);
  
        const postData = {
          identity: user,
          password: password,
          query: queryUrl,
        };
  
        // Space-Track.Org auth API URL
        const queryURL = 'https://www.space-track.org/ajaxauth/login';
  
        // Send the POST request to Space-Track.org with the user/pwd/query as post data
        const response = await axios.post(queryURL, postData);
        
        // Check the response status and resolve with data or reject with an error
        if (response.status === 200) {
          // console.log('POST Success: ' + JSON.stringify(response.data).substring(0, 255));
          resolve(response.data);
        } else {
          console.log('POST Error: ' + response.statusText);
          reject(response.statusText);
        }
      } catch (error) {
        // console.error('Error:', error);
        reject(error);
      }
    });
  }
  const curFetchCount = 25544
  const fetchAndAddSatellites = async () => {
    try {
      if(curFetchCount == 25574){
        return
      }
      // Fetch satellite data from space-track.org API
      const response = await querySpaceTrack(curFetchCount)
      const satelliteData = await response.json();
  
      // Use your mutation helper function to add the data to your server
      await createSatellite(satelliteData);
  
      console.log('Satellite data fetched and added to the server.');
    } catch (error) {
      console.error('Error fetching or adding satellite data:', error);
    }
  };
  const interval = 2000;
  setInterval(fetchAndAddSatellites, interval);

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
