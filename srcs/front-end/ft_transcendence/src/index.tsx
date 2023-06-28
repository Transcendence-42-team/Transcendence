import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import App from './App';

const GET_COOKIE = gql`
query GetCookieByName($cookieName: String!) {
  getCookieByName(cookieName: $cookieName)
}
`;



// const authLink = setContext(async (_, { headers }) => {
//   try {
    
//     const cookie = "tessst";
//     console.log('cookie', cookie);
    
//     return {
//         headers: {
//             ...headers,
//             authorization: cookie ? `Bearer ${cookie}` : '',
//           },
//         };
//       } catch (error) {
//           console.log("Une erreur s'est produite :", error);
//           return {
//               headers,
//             };
//           }
//         });
        
const httpLink = createHttpLink({
   uri: 'http://localhost:4000/graphql', 
   credentials: 'include'
 });

const apollo_client = new ApolloClient({
  link: httpLink, //authLink.concat(httpLink), 
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
