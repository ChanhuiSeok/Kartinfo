import React from 'react';
import {HashRouter as Router, Route} from "react-router-dom"
import Home from "../routes/Home"
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
    </Router>
    </>
  );
}

export default App;
