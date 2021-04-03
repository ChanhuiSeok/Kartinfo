import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App'
import { ApolloProvider } from "@apollo/react-hooks";
import client from "./apollo";
import './reset.css';

/* React에 Apollo Client 연결 */
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);