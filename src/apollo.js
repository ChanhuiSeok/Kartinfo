import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: "https://kartinfoapi.herokuapp.com/",
  onError: ({ graphQLErrors, networkError }) => {
    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }
    if (graphQLErrors) {
      console.log(`[GraphQL error]: ${graphQLErrors}`);
    }
  },
});

export default client;
