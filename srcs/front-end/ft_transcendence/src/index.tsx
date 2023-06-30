import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider} from '@apollo/client';

import App from './App';
 
        
const httpLink = createHttpLink({
  uri: 'http://back-end:4000/graphql',
   credentials: 'include'
 });

const apollo_client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <ApolloProvider client={apollo_client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
