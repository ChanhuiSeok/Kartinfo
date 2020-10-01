import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components"
import Bounce from 'react-reveal/Bounce';
import Fade from 'react-reveal/Fade';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
const Header = styled.header`
  background-color: #2F9FE7 ;
  background-image: linear-gradient(45deg, #0896E7 25%, transparent 25%, transparent 75%, #0896E7 75%, #0896E7), linear-gradient(45deg, #0896E7 25%, transparent 25%, transparent 75%, #0896E7 75%, #0896E7);
  background-position: 0 0, 25px 25px;
  background-size: 50px 50px;

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
  max-width:80%;
  top:0;
  left:0;
`;
const Dizni = styled.img`
  position:absolute;
  max-width:80%;
  top:0;
  right:0;
`;

const TitleImg = styled.img`
  margin-top:-350px;
  max-width:100%;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 20px;
  background-color: rgba(0,0,0, 0.8);
  padding: 1vh;
  border-radius: 10px;
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
    <Bounce top>
      <Dao src={'/cha1.png'}></Dao>
      <Dizni src={'/cha4.png'}></Dizni>
    </Bounce>
    <Container>     
      <Header>  
      <Bounce top>
        <TitleImg src={'/title.png'}></TitleImg>
        </Bounce>
        <Fade top>
        <Title>KartRider 오픈 API로 제작한 유저정보 조회 페이지입니다</Title>
        <Subtitle>I love GraphQL</Subtitle>
        </Fade>
      </Header>   
    </Container>
    </>
  )
};