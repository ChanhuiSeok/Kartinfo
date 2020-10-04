import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: "https://kartinfoapi.herokuapp.com/"
});

export default client;