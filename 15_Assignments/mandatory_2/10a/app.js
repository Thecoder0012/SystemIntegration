import express from "express";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./schema.js";

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true, 
  })
);

const PORT = 8080;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}/graphql`));

