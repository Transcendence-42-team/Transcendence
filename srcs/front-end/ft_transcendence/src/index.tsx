import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider, ApolloLink} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import App from "./App";
import { WebSocketProvider } from "./WebSocketProvider"


const authLink = setContext((_, { headers }) => {
  
  const userString = sessionStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const token = user? user.token : null;
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

// const ip_host = process.env.REACT_APP_IP_HOST ;
// const IP_HOST = $IP_HOST;

const test =  "http://" + process.env.REACT_APP_IP_HOST + ":4000/graphql"

const httpLink = createHttpLink({
  uri: test,
  credentials: "include"
});


const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    // Gérer les erreurs GraphQL ici
    graphQLErrors.forEach(error => {
      // console.log("Erreur GraphQL :", error.message);
    });
  }
  
  if (networkError) {
    // Gérer les erreurs réseau ici
    if (networkError.message.includes("401")) {
      sessionStorage.removeItem("user");
      window.location.reload();
      console.log("erreur 401");
    }
    else if (networkError.message.includes("404"))
      console.log("erreur 404");

    console.log("Erreur réseau :", networkError);

  }
});


const apollo_client = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache()
});


const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <ApolloProvider client={apollo_client}>
    <BrowserRouter>
      <WebSocketProvider>
        <App />
      </WebSocketProvider>
    </BrowserRouter>
  </ApolloProvider>
);
