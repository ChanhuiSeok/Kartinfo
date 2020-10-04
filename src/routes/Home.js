import React, { useState } from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components"
import Bounce from 'react-reveal/Bounce';
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
import Tada from 'react-reveal/Tada';
import { Link } from "react-router-dom";


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
  top:30px;
  left:0;
  @media (max-width: 700px) {
    width: 60%;
    top:20px;
  }
`;
const Dizni = styled.img`
  position:absolute;
  max-width:80%;
  top:30px;
  right:0;
  @media (max-width: 700px) {
    width: 50%;
    top:30px;
  }
`;

const Uni = styled.img`
  position:absolute;
  max-width:13%;
  top:0;
  right:200px;
  @media (max-width: 700px) {
    width: 0
  }
`;

const Bazzi = styled.img`
  position:absolute;
  max-width:60%;
  top:0;
  left:200px;
  max-width:40%;
  @media (max-width: 700px) {
    width: 0
  }
`;

const Etti = styled.img`
  position:absolute;
  max-width:50%;
  top:300px;
  right:100px;
  max-width:40%;
  @media (max-width: 700px) {
    width: 0
  }
`;

const Marid = styled.img`
  position:absolute;
  max-width:50%;
  top:300px;
  left:100px;
  max-width:40%;
  @media (max-width: 700px) {
    width: 0
  }
`;

const TitleImg = styled.img`
  margin-top:100px;
  width:100%;
  @media (max-width: 600px) {
    margin-top:130px;
  }
`;

const Title = styled.h1`
  font-size: 22px;
  font-weight: 500;
  margin-bottom: 20px;
  background-color: rgba(0,0,0, 0.8);
  padding: 1vh;
  border-radius: 13px;
  @media (max-width: 600px) {
    font-size: 13px;
  }
`;
const Subtitle = styled.h3`
  margin-top:7vh;
  font-size: 20px;
`;
const Footer = styled.div`
  float:bottom;
  font-size: 12px;
  font-weight: 300;
  text-align:center;
  opacity: 0.7;
  margin:10px;
  @media (max-width: 700px) {
    font-size: 9px;
  }
`;
const InputField = styled.input`
  font-family:Noto Sans KR;
  font-weight:600;
  font-size:28px;
  background-color:white;
  border-radius:10px;
  border:2px solid white;
  padding:10px;
  margin:0.8vh;
  @media (max-width: 600px) {
    font-size: 21px;
  }
`;
const EnterButton = styled.button`
  background: url('/button.png');
  cursor:pointer;
  width:140px;
  height:70px;
  border:none;
  transition: all ease 0.3s;

  &:hover{
    background: url('/button_hover.png');
    transition: all ease 0.4s 0s;
  }
`;

export default function App() {

  const [username, setUsername] = useState("");
  const onChangeField = e=>{
    setUsername(e.target.value);
  }
  const handleKeyPress = e =>{
    if( e.key === "Enter" ){
      const { href } = window.location;
      window.location.href = `${ href }${username}`;
    }
  }

  return(
    <>
    <Bounce top>
      <Zoom top>
      <Bazzi src={'/cha2.png'}></Bazzi>
      </Zoom>
      <Dao src={'/cha1.png'}></Dao>
      <Zoom top>
      <Uni src={'/cha3.png'}></Uni>
      </Zoom>
      <Dizni src={'/cha4.png'}></Dizni>
      <Etti src={'/cha5.png'}></Etti>
      <Marid src={'/cha6.png'}></Marid>
    </Bounce>
    <Container>     
      <Header>  
        <Bounce left>
          <TitleImg src={'/title.png'}></TitleImg>
        </Bounce>
        <Fade top>
        <Title>KartRider 오픈 API 기반의 유저정보 조회 페이지</Title>
        <Subtitle>빈 칸에 닉네임을 입력하세요!</Subtitle>
        <InputField
          type="text"
          name="username"
          value={username}
          onChange={onChangeField}
          onKeyPress={handleKeyPress}
          placeholder="닉네임 입력"
        ></InputField>
           <Link to ={`/${username}`}>
            <EnterButton></EnterButton>
          </Link>
        </Fade>
      </Header>   
    </Container>

    <Footer>
    본 페이지는 Chrome 브라우저, 데스크톱(1920*1080) 및 모바일에
        최적화되어 있습니다 | [github] ChanhuiSeok
    </Footer>
    </>
  )
};