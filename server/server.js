
const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('@apollo/server');
const bodyParser = require('body-parser');
const { expressMiddleware } = require('@apollo/server/express4');
const db = require('./config/connection');
// const fetch = require('node-fetch'); // Import node-fetch
const path = require('path'); // Import path module
const PORT = process.env.PORT || 4001;
const { typeDefs, resolvers } = require("./schemas");
const { authMiddleware } = require('./utils/auth');

// Create an instance of Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});


const app = express();

const startServer = async () => {
  await server.start();
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  
  app.use('/graphql', expressMiddleware(server));
  app.use(cors())
  // Define a route for your proxy
  app.get('/space-track/:noradCatId', async (req, res) => {
    const { noradCatId } = req.params;
    try {
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
