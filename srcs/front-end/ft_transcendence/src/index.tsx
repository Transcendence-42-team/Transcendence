import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { ApolloProvider, ApolloClient, InMemoryCache, ApolloLink, createHttpLink, concat } from '@apollo/client';
import App from './App';

// const authMiddleware = new ApolloLink((operation, forward) => {
//   operation.setContext(({ headers }) => {
//     return {
//       headers: {
//         ...headers,
//         Authorization: token ? `Bearer ${token}` : '',
//       },
//     };
//   });

//   return forward(operation);
// });
const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql', // Remplacez par l'URL de votre serveur GraphQL
});

const apollo_client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

// apollo_client.link = concat(authMiddleware, httpLink);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ApolloProvider client={apollo_client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);

reportWebVitals();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
