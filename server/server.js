const express = require("express");
const cors = require("cors");
const { ApolloServer } = require("@apollo/server");
const bodyParser = require("body-parser");
const { expressMiddleware } = require("@apollo/server/express4");
const db = require("./config/connection");
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
  const PORT = process.env.PORT || 4001;

  app.use(
    "/graphql",
    cors({
      origin: ["http://localhost:4000", "https://studio.apollographql.com"],
    }),
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({
        token: req.headers.token,
      }), 
    })
  );
  // context: authMiddleware

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
