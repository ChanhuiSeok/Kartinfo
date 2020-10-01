import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
const Header = styled.header`
  background-image: linear-gradient(-40deg, #0E5FCC, #37B0E4);
  height: 95vh;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
const Dao = styled.img`
  position:absolute;
  top:0;
  left:0;
`;
const Dizni = styled.img`
  position:absolute;
  top:0;
  right:0;
`;

const Title = styled.h1`
  font-size: 60px;
  font-weight: 600;
  margin-bottom: 20px;
`;
const Subtitle = styled.h3`
  font-size: 35px;
`;
const Loading = styled.div`
  font-size: 18px;
  opacity: 0.5;
  font-weight: 500;
  margin-top: 10px;
`;


export default () => {
  //const { loading, data } = useQuery(GET_MOVIES);
  return(
    <>
    <Dao src={'/cha1.png'}></Dao>
    <Dizni src={'/cha4.png'}></Dizni>

    <Container>     
      <Header>
        <Title>Apollo 2020</Title>
        <Subtitle>I love GraphQL</Subtitle>
      </Header>   
    </Container>
    </>
  )
};