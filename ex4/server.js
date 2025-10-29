require("dotenv").config();
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const mongoose = require("mongoose");
const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");

(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  const app = express();
  const schema = buildSchema(typeDefs);
  const rootValue = { ...resolvers.Query, ...resolvers.Mutation };
  
  app.use("/graphql", graphqlHTTP({ schema, rootValue, graphiql: true }));
  app.listen(4000, () => console.log("Server at http://localhost:4000/graphql"));
})();
