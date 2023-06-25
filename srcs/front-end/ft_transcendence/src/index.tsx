import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache, ApolloLink } from '@apollo/client';

import { useCookies } from 'react-cookie';

import App from './App';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql', // Remplacez par l'URL de votre serveur GraphQL
});

// Créez une instance de ApolloLink personnalisée pour intercepter les requêtes sortantes
const authLink = new ApolloLink((operation, forward) => {
  const [cookies] = useCookies(['user']);
  const { user } = cookies;

  // Ajoutez le cookie `user` en tant qu'en-tête `Authorization`
  operation.setContext(({ headers }: { headers: Record<string, string> }) => ({
    headers: {
      ...headers,
      Authorization: user ? `Bearer ${user.token}` : '',
    },
  }));
  // Poursuivez l'opération en renvoyant la requête modifiée
  return forward(operation);
});
const link = authLink.concat(httpLink);

const apollo_client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});

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
