import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import MatchInfo from "../components/MatchInfo";
import styled, { keyframes } from "styled-components";
import StyledSpinner from "../components/StyledSpinner";
import Bounce from "react-reveal/Bounce";
import { Link } from "react-router-dom";
import Fade from "react-reveal/Fade";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faLaptopCode, faNetworkWired, faVolumeUp, faVolumeMute } from "@fortawesome/free-solid-svg-icons";
import { Play, useHowl } from "rehowl";

/* Home.js에서 건너온 state 값을 토대로 usrID로 변환해 주고, 정보를 그리는 메인 페이지 */

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
const Header = styled.header`
  min-height: 600px;
  background-color: #2f9fe7;
  background-image: linear-gradient(45deg, #0896e7 25%, transparent 25%, transparent 75%, #0896e7 75%, #0896e7),
    linear-gradient(45deg, #0896e7 25%, transparent 25%, transparent 75%, #0896e7 75%, #0896e7);
  background-position: 0 0, 25px 25px;
  background-size: 50px 50px;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const ResultImg = styled.img`
  position: absolute;
  max-width: 100%;
  top: 150px;
  left: 50%;
  transform: translate(-50%, -50%);
  @media (max-width: 700px) {
    width: 90%;
    top: 110px;
    left: 50%;
  }
`;

const Subtitle = styled.div`
  font-size: 16px;
  padding: 12px;
  background-color: #284c7d;
  color: white;
  font-weight: 500;
  @media (max-width: 700px) {
    font-size: 14px;
  }
`;

const NickName = styled.span`
  margin-left: 5%;
  font-weight: 700;
  @media (max-width: 700px) {
    margin-left: 3%;
  }
`;
const Span = styled.span`
  font-weight: 300;
`;

const Footer = styled.div`
  font-size: 11px;
  font-weight: 100;
  text-align: center;
  opacity: 0.7;
  margin: 15px;
  @media (max-width: 700px) {
    font-size: 9px;
  }
`;

const HomeButton = styled.button`
  position: relative;
  margin-right: 10%;
  float: right;
  border: none;
  outline: none;
  background: none;
  color: white;
  cursor: pointer;
  font-weight: 700;
  font-size: 14px;
  margin-bottom: 3px;
  @media (max-width: 700px) {
    font-size: 12px;
    margin-right: 5%;
  }
`;

const AudioButton = styled.button`
  margin-left: 10%;
  background-color: transparent;
  font-size: 18px;
  cursor: pointer;
  color: white;
  border: 0;
  outline: 0;
  @media (max-width: 700px) {
    margin-left: 1%;
    font-size: 15px;
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

export default function Detail() {
  const { usrName } = useParams();
  const { loading, data, error } = useQuery(GET_USRINFO, {
    variables: { usrName },
  });

  const { howl } = useHowl({ src: "public/snow.mp3" });
  const [play, setPlay] = useState<boolean>(false);
  const playIcon = play ? faVolumeMute : faVolumeUp;

  return (
    <>
      <Bounce left>
        <ResultImg src={"image/result_title.png"}></ResultImg>
      </Bounce>
      <Fade left>
        <Subtitle>
          <Play volume={0.06} loop={true} howl={howl} pause={!play} />
          <AudioButton onClick={() => setPlay(!play)}>
            <FontAwesomeIcon icon={playIcon} />
          </AudioButton>
          <NickName style={{ color: "#57E7FA" }}>{usrName}</NickName>
          <Span color={"white"}>님 검색결과(최근 200판)</Span>
          <Link to={"/"}>
            <HomeButton>{"> 홈으로"}</HomeButton>
          </Link>
        </Subtitle>
      </Fade>

      <Container>
        <Header>
          {loading && (
            <>
              <StyledSpinner /> <p>로딩중...</p>
            </>
          )}
          {data && <MatchInfo id={data.user?.accessId} nickname={usrName}></MatchInfo>}
          {error && <h1>유저정보가 없습니다.</h1>}
        </Header>
      </Container>
      <Footer>
        <FontAwesomeIcon icon={faGithub} /> <a href="https://github.com/chanhuiseok/">ChanhuiSeok</a> ·
        <FontAwesomeIcon icon={faEnvelope} /> <a href="mailto:chanhuicom@gmail.com"> gmail</a> ·
        <FontAwesomeIcon icon={faLaptopCode} /> <a href="https://developers.nexon.com/kart/">Kartrider API </a> ·
        <FontAwesomeIcon icon={faNetworkWired} /> <a href="https://github.com/ChanhuiSeok/kartAPI-Graphql">with GraphQL</a>
      </Footer>
    </>
  );
}
