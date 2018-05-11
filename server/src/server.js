import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import bodyParser from 'body-parser';

import { schema, rootValue, context } from './schema';

const cors = require('cors');

const PORT = 5050;
const server = express();

process.env.NEO4J_URI = 'bolt://54.85.92.193:33889/';
process.env.NEO4J_USER = 'neo4j';
process.env.NEO4J_PASSWORD = 'message-flame-cubes';

if (typeof process.env.NEO4J_URI === 'undefined') {
  console.warn('WARNING: process.env.NEO4J_URI is not defined. Check README.md for more information');
}
if (typeof process.env.NEO4J_USER === 'undefined') {
  console.warn('WARNING: process.env.NEO4J_USER is not defined. Check README.md for more information');
}
if (typeof process.env.NEO4J_PASSWORD === 'undefined') {
  console.warn('WARNING: process.env.NEO4J_PASSWORD is not defined. Check README.md for more information');
}

server.use('/graphql', cors(), bodyParser.json(), graphqlExpress(request => ({
  schema,
  rootValue,
  context: context(request.headers, process.env),
})));

server.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
  query: `# Welcome to GraphiQL

{
  moviesByTitle(subString:"Matrix") {
    movieId
    title
    genres
    similar {
      title
    }
  }
}
`,
}));

server.listen(PORT, () => {
  console.log(`GraphQL Server is now running on http://localhost:${PORT}/graphql`);
  console.log(`View GraphiQL at http://localhost:${PORT}/graphiql`);
});