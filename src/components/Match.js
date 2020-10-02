import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Slide from 'react-reveal/Slide';

const Card = styled.div`
  width:1000px;
  height: 200px;
  border-radius: 7px;
  margin-bottom:10px;
  background-color:white;
  color:black;
  @media (max-width: 600px) {
    width:90%;
    height:150px;
  }
`;

const CardTitle = styled.h1`
  font-size: 18px;
  font-weight: 500;
  @media (max-width: 600px) {
    font-size: 7px;
  }
`;

const CharacterImg = styled.img`
  width:20%;
`;

export default ({ id, matchType, character, trackId }) => {
  return (
    <Slide left>
      <Card>
        <CardTitle>{id}</CardTitle>
        <CharacterImg src={'/metadata/character/'+character+'.png'}></CharacterImg>
        <CardTitle>{character}</CardTitle>
        <CardTitle>{trackId}</CardTitle>
      </Card>
    </Slide>
  );
};