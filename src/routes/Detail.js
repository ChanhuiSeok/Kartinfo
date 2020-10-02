import React from "react";
import { useParams } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import MatchInfo from "../components/MatchInfo";
import styled, { keyframes } from "styled-components";
import Bounce from "react-reveal/Bounce";
import { Link } from "react-router-dom";
import Fade from 'react-reveal/Fade';
import Tada from 'react-reveal/Tada';

/* Home.js에서 건너온 state 값을 토대로 usrID로 변환해 주고, 정보를 그리는 메인 페이지 */

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  width: 100%;
`;
const Header = styled.header`
min-height:600px;
  background-color: #2f9fe7;
  background-image: linear-gradient(
      45deg,
      #0896e7 25%,
      transparent 25%,
      transparent 75%,
      #0896e7 75%,
      #0896e7
    ),
    linear-gradient(
      45deg,
      #0896e7 25%,
      transparent 25%,
      transparent 75%,
      #0896e7 75%,
      #0896e7
    );
  background-position: 0 0, 25px 25px;
  background-size: 50px 50px;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const TitleDiv = styled.div`
    margin-bottom:300px;
`;

const ResultImg = styled.img`
  position: absolute;
  max-width: 100%;
  top:150px;
  left:50%;
  transform:translate(-50%,-50%);
  @media (max-width: 600px) {
    width: 90%;
    top: 100px;
    left:45%;
  }
`;

const Title = styled.h1`
  font-size: 22px;
  font-weight: 500;
  margin-bottom: 20px;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 1vh;
  border-radius: 13px;
  @media (max-width: 700px) {
    font-size: 13px;
  }
`;
const Subtitle = styled.div`
  font-size: 14px;
  padding:7px;
  background-color:#284C7D;
  color:white;
  font-weight: 500;
`;
const Footer = styled.div`
  font-size: 12px;
  font-weight: 300;
  text-align: center;
  opacity: 0.7;
  margin: 10px;
  @media (max-width: 700px) {
    font-size: 9px;
  }
`;

const HomeButton = styled.button`
  position: absolute;
  width:52px;
  height:50px;
  top:15%;
  right:25%;
  background: url('/home.png');
  cursor:pointer;
  border:none;
  transition: all ease 0.3s;
  &:hover{
    background: url('/home_hover.png');
    transition: all ease 0.4s 0s;
  }
  @media (max-width: 1100px) {
    top:10%;
    right:3%;
  }
`;

const StyledSpinner = styled.svg`
  animation: rotate 2s linear infinite;
  margin: -25px 0 0 -25px;
  width: 80px;
  height: 80px;
  & .path {
    stroke: #ffffff;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }
  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`;

const GET_USRINFO = gql`
  query getUserInfo($usrName: String!) {
    user(usrName: $usrName) {
      accessId
      name
    }
  }
`;
let { usrId } = "";

export default () => {
  const { usrName } = useParams();
  const { loading, data, error } = useQuery(GET_USRINFO, {
    variables: { usrName },
  });
  if (data && data.user) {
    usrId = data.user.accessId;
  }
  return (
    <>
      <Bounce left>
        <ResultImg src={"/result_title.png"}></ResultImg>
      </Bounce>
      <Link to={'/'}>
      <HomeButton></HomeButton>
      </Link>
      <Fade left>
        <Subtitle><span style={{fontWeight:700, color:'#57E7FA'}}>{usrName}</span>님 플레이 검색 결과</Subtitle>
      </Fade>
      <Container>
        <Header>
          {loading && (
            <>
              <StyledSpinner viewBox="0 0 50 50">
                <circle
                  className="path"
                  cx="25"
                  cy="25"
                  r="20"
                  fill="none"
                  strokeWidth="4"
                />{" "}
                Loading...
              </StyledSpinner>
              <p>로딩중...</p>
            </>
          )}
          {data &&
            <MatchInfo id={data.user.accessId}></MatchInfo>
          }
          {error && <h1>유저정보가 없습니다.</h1>}
        </Header>
      </Container>
      <Footer>
        본 페이지는 Chrome 브라우저, 데스크톱 환경(1920*1080) 및 모바일에
        최적화되어 있습니다
      </Footer>
    </>
  );
};
