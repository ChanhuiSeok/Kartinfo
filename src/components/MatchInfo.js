import React from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import domtoimage from 'dom-to-image'
import { saveAs } from 'file-saver'
import { speed, item } from "../metadata/trackType"
import Match from "../components/Match";
import Pagination from "../components/Pagination";
import { useState, useRef, useEffect } from 'react';
import ToggleButton from '../components/ToggleButton'
import Tada from 'react-reveal/Tada';
import Zoom from 'react-reveal/Zoom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrophy, faMedal, faTachometerAlt, faGift, faDownload } from '@fortawesome/free-solid-svg-icons'

/* 받아온 usrId 값을 가지고 matches 뮤테이션을 실행하여 결과를 그리는 컴포넌트 */
/* 게임 타입별 id값 딕셔너리 저장 */

const Container = styled.div`
  position:relative;
  margin-top:240px;
  margin-left:5%;
  margin-right:5%;
  @media (max-width: 700px) {
    margin-left:3%;
    margin-right:2%;
    margin-top:150px;
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

const PersonInfo = styled.div`
  margin:0 auto;
  background-color:#284C7D;
  width:805px;
  padding:20px;
  height:100%;
  border-radius:10px;
  margin-bottom:50px;
  overflow:auto; 
  border:3px solid #1F3D73;
  @media (max-width: 700px) {
    padding:13px;
    margin-bottom:25px;
    width:90%;
  }
  @media (max-width: 400px) {
    padding:13px;
    margin-bottom:25px;
    width:320px;
  }
  @media (max-width: 350px) {
    padding:13px;
    margin-bottom:25px;
    width:300px;
  }
`;

const ImgDiv = styled.div`
  background-image:url('image/light.png');
  background-size:cover;
  float:left;
  margin:0 auto;
  width:30%;
  height:100%;
  line-height:100%;
  text-align:center;
  border-radius:10px;
  margin-right:35px;
  @media (max-width: 700px) {
    margin-right:15px;
  }
  
`;

const CharacterImg = styled.img`
  padding:10px;
  position:relative;
  display:block;
  margin-top:8px;
  margin-left:-10px;
  width:100%;
  object-fit:contain;
  z-index:1;
  @media (max-width:700px){
    width:95%;
  }
`;

const MoveGradient = keyframes`
0% {
  background-position: 0% 50%;
}
50% {
  background-position: 100% 50%;
}
100% {
  background-position: 0% 50%;
}
`

const NickNameDiv = styled.div`
  display:block;
  margin:0 auto;
  text-align:center;
  padding:1px;
  background: linear-gradient(45deg,#FC4BED,#2DEEFB,#2DDF6B,#FEF273);
  background-size: 150% 150%;
  border-radius:10px;
  animation: ${MoveGradient} 2s infinite;
`;

const Nickname = styled.p`
  font-size:23px;
  font-weight:600;
  color:white;
  background-color:#102158;
  border-radius:7px;
  padding:9px;
  margin:2px;
  @media(max-width:700px){
    padding:9px;
    font-size:14px;
  }
`;

const InfoDiv = styled.div`
  width:64%;
  float:left;
`;

const RankInfo = styled.div`
  display:block;
  margin-bottom:14px;
  padding:15px;
  height:100%;
  border-radius:10px;
  background-color:#1F345C;
  border-radius:10px;
  @media (max-width: 700px) {
    padding:9px;
    margin-bottom:6px;
  }
`;

const Gradient = keyframes`
0% {
  background-position: 0% 50%;
}
50% {
  background-position: 100% 50%;
}
100% {
  background-position: 0% 50%;
}
`

const RankInfoRank1 = styled.div`
  display:block;
  margin-bottom:14px;
  padding:15px;
  height:100%;
  border: 1px solid #28A7CF;
  border-radius:10px;
  background: linear-gradient(45deg,#FE5CBC,#723AFF,#3AC3FF,#2DDF6B);
  background-size: 150% 150%;
  border-radius:10px;
  @media (max-width: 700px) {
    padding:9px;
    margin-bottom:6px;
  }
  animation: ${Gradient} 3s ease infinite;
`;

const InfoTitle = styled.span`
  font-size:22px;
  font-weight:500;
  @media(max-width: 700px){
    font-size:14px;
  }
`;

const InfoValue = styled.span`
  float:right;
  font-size:22px;
  font-weight:500;
  color:white;
  @media(max-width: 700px){
    font-size:14px;
  }
`;

const TypeInfo = styled.div`
  display:block;
  float:left;
  width: 43%;
  padding:15px;
  height:100%;
  border-radius:10px;
  background-color:#1F345C;
  border-radius:10px;
  @media (max-width: 700px) {
    width:39%;
    float:left;
    padding:9px;
  }
`;

const TypeTitle = styled.span`
  float:left;
  font-size:22px;
  font-weight:500;
  @media(max-width: 700px){
    font-size:14px;
  }
`;
const TypeTitleTwo = styled.span`
  float:left;
  font-size:22px;
  font-weight:500;
  @media(max-width: 700px){
    display:none;
  }
`;

const TypeValue = styled.span`
  float:right;
  font-size:22px;
  font-weight:500;
  color:white;
  @media(max-width: 700px){
    font-size:14px;
  }
`;

const DownloadDiv = styled.div`
  text-align: center;
  margin-bottom: 10px;
`;
const DownloadBtn = styled.button`
  color:white;
  background-color: #102158;
  border: 0;
  outline: 0;
  cursor: pointer;
  padding: 6px;
  font-size: 14px;
  font-weight: 700;
  border-radius: 5px;
  @media (max-width:700px){
    font-size: 11px;
  }
  &:hover{
    cursor:pointer;
    color:white;
    background-color:#2B559E;
  }
`;

const PersonInfoWrapper = styled.div`
  height: 100%
`;

const GET_MATCHES = gql`
  query getMatchInfo($usrId: String!) {
    matches(usrId: $usrId) {
      matchType
     matches{
      accountNo
      matchId
      matchType
      channelName
      teamId
      character
      startTime
      endTime
      trackId
      playerCount
      player{
        kart
        pet
        flyingPet
        matchRank
        matchWin
        matchTime
        matchRetired
        rankinggrade2
      }
    }
  }
  }
`;
let usrId = "";

export default ({ id, nickname }) => {
  usrId = id;
  const { loading, data, error } = useQuery(GET_MATCHES, {
    variables: { usrId }
  });

  const [posts, setPosts] = useState([]);
  const [loads, setLoads] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [checked, setChecked] = useState(0);
  const handleClick = () => {
    if (checked === 0) {
      setCurrentPage(1);
      setChecked(1);
    }
    else if (checked === 1) {
      setCurrentPage(1);
      setChecked(0);
    }
  }

  useEffect(() => {
    setLoads(true);
    setPosts(data);
    setLoads(false);
  }, [data]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const personInfo = useRef(null);

  // 스피드전 저장
  let speedArr = [];
  // 아이템전 저장
  let itemArr = [];
  let [rank1, rank2, rank3] = [0, 0, 0];

  function currentPosts(tmp) {
    let currentPosts = 0;
    currentPosts = tmp.slice(indexOfFirstPost, indexOfLastPost);
    return currentPosts;
  }

  // 1등 횟수 저장
  if (typeof data !== 'undefined') {
    for (var l in data.matches) {
      for (var m in data.matches[l].matches) {
        if (data.matches[l].matches[m].player.matchRank === '1') {
          rank1 = rank1 + 1;
        }
        else if (data.matches[l].matches[m].player.matchRank === '2') {
          rank2 = rank2 + 1;
        }
        else if (data.matches[l].matches[m].player.matchRank === '3') {
          rank3 = rank3 + 1;
        }
      }
    }
  }

  if (typeof data !== 'undefined') {
    for (var i in data.matches) {
      for (var j in data.matches[i].matches) {
        for (var prop in speed) {
          if (speed[prop] === data.matches[i].matches[j].matchType) {
            speedArr.push(data.matches[i].matches[j]);
            break;
          }
        }
        for (var prop2 in item) {
          if (item[prop2] === data.matches[i].matches[j].matchType) {
            itemArr.push(data.matches[i].matches[j]);
            break;
          }
        }
      }
    }
  }
  // 정렬
  speedArr.sort((a, b) => (Date.parse(a.startTime) < Date.parse(b.startTime)) ? 1 : -1);
  itemArr.sort((a, b) => (Date.parse(a.startTime) < Date.parse(b.startTime)) ? 1 : -1);

  // 유저 카드 저장
  const onClick = function () {
    domtoimage.toPng(personInfo.current)
      .then(function (blob) {
        window.saveAs(blob, 'user-card.png');
      })
  };

  return (
    <>
      {loading &&
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center', minHeight: '600px', alignItems: 'center'
        }}>
          <StyledSpinner viewBox="0 0 50 50">
            <circle
              className="path"
              cx="25"
              cy="25"
              r="20"
              fill="none"
              strokeWidth="4"
            />{" "}
          </StyledSpinner>
          <p>캐릭터 정보를 불러오는 중...</p>
        </div>}
      <Container>
        {data && posts &&
          <>
            <Zoom left>
              <DownloadDiv>
                <DownloadBtn onClick={onClick}>
                  <FontAwesomeIcon icon={faDownload}></FontAwesomeIcon><span> 카드 저장</span>
                </DownloadBtn>
              </DownloadDiv>
              <PersonInfoWrapper ref={personInfo}>
                <PersonInfo>
                  <ImgDiv>
                    <CharacterImg onError={(e) => { e.target.src = "image/unknownChar.png" }} src={'image/character/' + data.matches[0].matches[0].character + '.png'}>
                    </CharacterImg>
                    <NickNameDiv>
                      <Nickname>{nickname}</Nickname>
                    </NickNameDiv>
                  </ImgDiv>
                  <InfoDiv>
                    <RankInfoRank1>
                      <InfoTitle style={{ color: '#FFEC00' }}><FontAwesomeIcon icon={faTrophy}></FontAwesomeIcon> 1위 달성</InfoTitle>
                      <InfoValue>{rank1}회</InfoValue>
                    </RankInfoRank1>
                    <RankInfo>
                      <InfoTitle style={{ color: '#53E567' }}><FontAwesomeIcon icon={faMedal}></FontAwesomeIcon> 2위 달성</InfoTitle>
                      <InfoValue>{rank2}회</InfoValue>
                    </RankInfo>
                    <RankInfo>
                      <InfoTitle style={{ color: '#5FDFF3 ' }}><FontAwesomeIcon icon={faMedal}></FontAwesomeIcon> 3위 달성</InfoTitle>
                      <InfoValue>{rank3}회</InfoValue>
                    </RankInfo>
                    <TypeInfo>
                      <TypeTitle style={{ color: '#FA75E6' }}><FontAwesomeIcon icon={faTachometerAlt}></FontAwesomeIcon></TypeTitle> <TypeTitleTwo>{'\u00A0'}스피드전 </TypeTitleTwo>
                      <TypeValue><span style={{ color: '#FA75E6' }}>{speedArr.length}</span>회</TypeValue>
                    </TypeInfo>
                    <TypeInfo style={{ float: 'right' }}>
                      <TypeTitle style={{ color: '#AA88FF' }}><FontAwesomeIcon icon={faGift}></FontAwesomeIcon> </TypeTitle> <TypeTitleTwo>{'\u00A0'}아이템전 </TypeTitleTwo>
                      <TypeValue><span style={{ color: '#AA88FF' }}>{itemArr.length}</span>회</TypeValue>
                    </TypeInfo>
                  </InfoDiv>
                </PersonInfo>
              </PersonInfoWrapper>
            </Zoom>
            <ToggleButton onChange={handleClick} checked={checked}></ToggleButton>
            {checked === 0 && <>
              <Pagination postsPerPage={postsPerPage} totalPosts={speedArr.length} paginate={paginate} />
              <Match key={data.matches[0]?.matches.matchId} posts={currentPosts(speedArr)} loading={loads} />
            </>
            }
            {checked === 1 && <>
              <Pagination postsPerPage={postsPerPage} totalPosts={itemArr.length} paginate={paginate} />
              <Match key={data.matches[1]?.matches.matchId} posts={currentPosts(itemArr)} loading={loads} />
            </>
            }
          </>
        }
        {error && <h1>기록을 불러올 수 없습니다.</h1>}
      </Container>
    </>
  );
};
