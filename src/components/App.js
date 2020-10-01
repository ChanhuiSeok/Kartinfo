import React from 'react';
import {HashRouter as Router, Route} from "react-router-dom"
import Home from "../routes/Home"
import Detail from "../routes/Detail"
import {createGlobalStyle} from 'styled-components'

const GlobalStyles = createGlobalStyle`
  body {
    font-family: 'Noto Sans KR', sans-serif;
  }
`;

function App() {
  return (
    <>
     <GlobalStyles/>
    <Router>
      <Route exact path="/" component={Home} />
      <Route exact path="/:usrName" component={Detail} />
    </Router>
    </>
  );
}

export default App;
