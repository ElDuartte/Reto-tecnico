import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from '@apollo/client';
import App from './App';
import './index.scss';

const client = new ApolloClient({
  link: new HttpLink({
    uri: `${import.meta.env.VITE_API_BASE_URL}/graphql`,
    headers: {
      Authorization: import.meta.env.VITE_API_KEY,
    },
  }),
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>
);
