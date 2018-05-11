import React from 'react';

import App from './components/App';

import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { render } from 'react-dom';

import 'normalize.css';
import './index.css';

const client = new ApolloClient({
  link: createHttpLink({ uri: 'http://165.227.183.89:5050/graphql' }),
  cache: new InMemoryCache(),
});

const Root = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

render(<Root />, document.getElementById("root"));
