import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Slide from 'react-reveal/Slide';
import gameType from '../jsonData/gameType.json'
import track from '../jsonData/track.json'
import kart from '../jsonData/kart.json'
import character from '../jsonData/character.json'
import moment from 'moment';

const Card = styled.div`
  width:1000px;
  border-radius: 7px;
  margin-bottom:40px;
  background-color:white;
  float:left;
  color:black;
  padding:25px; 
  box-shadow:0px 0px 7px 7px rgba(0,0,0,0.15);

  @media (max-width: 1120px) {
    width:95%;
    padding:22px;
    margin-bottom:28px;
  }

  @media (max-width: 700px) {
    width:86%;
    padding:25px;
    margin-bottom:28px;
  }
`;

const CardTitle = styled.div`
  width:390px;
  border-radius: 5px;
  margin-bottom:-2px;
  background-color:#324B7C;
  float:left;
  color:white;
  padding:8px; 
  font-size:15px;
  
  @media (max-width: 1120px) {
    width:390px;
  }

  @media (max-width: 700px) {
    width:330px;
    font-size:12.5px;
    font-weight:600;
  }
`;

const CharacterImg = styled.img`
  position:relative;
  width:20%;
  z-index:1;
  margin-left:-35px;
`;

const TrackImg = styled.img`
  margin-left:5px;
  width:20%;
  onerror='this.src="/unknownTrack.png"';
`;

const KartImg = styled.img`
  position:relative;
  width:17%;
  z-index:0;
  margin-left:-100px;
  @media (max-width: 1120px) {
    margin-left:-60px;
  }
  @media (max-width: 700px) {
    margin-left:-40px;
  }
`;

const MatchInfo = styled.div`
  position:relative;
  display:inline-block;
  margin-left:15px;
  vertical-align:top;
`;

const TypeTitle = styled.div`
  line-height:50px;
  font-size:27px;
  font-weight:700;
  @media (max-width: 1120px) {
    line-height:35px;
    font-size:23px;
  }
  @media (max-width: 700px) {
    line-height:20px;
    font-size:16px;
  }
`;

const Speed = styled.span`
border-radius:5px;
padding:5px;
color: white;
font-weight:500;
margin:5px;
font-size:14px;
background-color:#1789D3;
@media (max-width: 700px) {
  font-size:11px;
  margin:3px;
  padding:3px;
}
`;

const SubTitle = styled.div`
  line-height:16px;
  font-size:18px;
  font-weight:600;
  color:#1B4C7C;
  @media (max-width: 1120px) {
    font-size:15px;
  }
  @media (max-width: 700px) {
    font-size:13px;
  }
`;

const TimeTitle = styled.div`
  vertical-align:bottom;
  font-weight:300;
  font-size:15px;
  margin-top:4em;
  color:#636D78;
  @media (max-width: 1120px) {
    font-size:14px;
    margin-top:4em;
  }
  @media (max-width: 950px) {
    font-size:13px;
    margin-top:3em;
  }
  @media (max-width: 700px) {
    font-size:12px;
    margin-top:1.5em;
  }
  @media (max-width: 500px) {
    font-size:12px;
    margin-top:.8em;
  }
`;

const Ranks = styled.div`
  position:relative;
  height:130px;
  float:right;
  margin-right:-5px;
  border-radius:7px;
  width:95px;
  text-align:center;
  background-color:#2752A2;
  padding:7px;
  color:white;
  line-height:110px;

  @media (max-width: 1120px) {
    width:90px;
    height:100px;
    line-height:80px;
  }

  @media (max-width: 700px) {
    width:53px;
    height:45px;
    line-height:40px;
    margin-right:-13px;
    font-size:10px;
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

function findMatchType(matchType) {
  for (var i = 0; i < gameType.length; i++) {
    if (gameType[i].id === matchType) {
      return gameType[i].name;
    }
  }
}

function findTrackName(trackId) {
  for (var i = 0; i < track.length; i++) {
    if (track[i].id === trackId) {
      return track[i].name;
    }
  }
  return "알 수 없는 트랙"
}

function findCharacterName(characterId) {
  for (var i = 0; i < character.length; i++) {
    if (character[i].id === characterId) {
      return character[i].name;
    }
  }
  return "알 수 없는 캐릭터"
}

function findKartName(kartId) {
  for (var i = 0; i < kart.length; i++) {
    if (kart[i].id === kartId) {
      return kart[i].name;
    }
  }
  return "알 수 없는 카트"
}

function makeElapsedMin(time) {
  const elapsedSec = parseInt(time / 1000);
  const elapsedMin = parseInt(elapsedSec / 60);
  const time_Min = elapsedMin;
  return time_Min;
}
function makeTimeSec(time, elapsedMin) {
  const result = parseInt(time / 1000) - (elapsedMin * 60);
  return result;
}
function makeTimeMSec(time, elapsedMin) {
  const result = (time - (elapsedMin * 60 * 1000)) % 1000;
  return result;
}

export default ({ posts, loading }) => {
  if (loading) {
    return (
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
        <p>불러오는 중...</p>
      </div>);
  }
  return (
    <>
      {posts.length === 0 &&
      <>
        <Slide left>
          <div style={{textAlign:'center'}}>
            <img src={'image/unknownRecord.png'} alt=""></img>
          </div>
        </Slide>
      </>
      }
      {posts.map(post => (
        <div key={post.matchId}>
        <Slide left>
          <CardTitle>
            {moment(post.startTime).format('YYYY-MM-DD')} / <span style={{ color: '#FCD968' }}>{findCharacterName(post.character)}</span> 착용 /
       <span style={{ color: '#61E9B4' }}> {findKartName(post.player.kart)} </span>탑승
      </CardTitle>
          <Card>
            <CharacterImg onError={(e) => { e.target.src = "image/unknownChar.png" }} src={'image/character/' + post.character + '.png'}></CharacterImg>
            <KartImg onError={(e) => { e.target.src = "image/unknownKart.png" }} src={'image/kart/' + post.player.kart + '.png'}></KartImg>
            <TrackImg
              onError={(e) => { e.target.src = "image/blankTrack.png" }}
              src={'image/track/' + post.trackId + '.png'}></TrackImg>
            <MatchInfo>
              <TypeTitle>{findMatchType(post.matchType)}
                {(post.channelName === "speedIndiFast" || post.channelName === "speedTeamFast") &&
                  <Speed>빠름</Speed>
                }
                {(post.channelName === "speedIndiFastest" || post.channelName === "speedTeamFastest") &&
                  <Speed style={{ backgroundColor: '#E15F93' }}>매우 빠름</Speed>
                }
                {(post.channelName === "speedTeamInfinit" || post.channelName === "speedIndiInfinit") &&
                  <Speed style={{ backgroundColor: '#9644C6' }}>무한</Speed>
                }
                {(post.channelName === "itemNewItemTeamFastest2Enchant" || post.channelName === "itemNewItemIndiFastest2Enchant") &&
                  <Speed style={{ backgroundColor: '#C83158' }}>가장 빠름</Speed>
                }
                {(post.channelName === "itemNewItemTeamFast2Enchant" || post.channelName === "itemNewItemIndiFast2Enchant") &&
                  <Speed style={{ backgroundColor: '#3EB5E8' }}>빠름</Speed>
                }
              </TypeTitle>
              <SubTitle>{findTrackName(post.trackId)}</SubTitle>
              <TimeTitle><span style={{ fontWeight: '700', color: '#1B4C7C' }}>주행시간 | </span>{makeElapsedMin(post.player.matchTime)}분 {makeTimeSec(post.player.matchTime, makeElapsedMin(post.player.matchTime))}초 {makeTimeMSec(post.player.matchTime, makeElapsedMin(post.player.matchTime))}</TimeTitle>
            </MatchInfo>
            {(post.player.matchRank === '1') &&
              <Ranks><span style={{ fontSize: '35px', fontWeight: '700', color: '#FFE73C' }}>{post.player.matchRank}</span>/
          <span style={{ fontSize: '20px' }}>{post.playerCount}</span>
              </Ranks>}
            {(post.player.matchRank !== '99' && post.player.matchRank !== '' && post.player.matchRank !== '1') &&
              <Ranks><span style={{ fontSize: '35px', fontWeight: '700' }}>{post.player.matchRank}</span>/
          <span style={{ fontSize: '20px' }}>{post.playerCount}</span>
              </Ranks>}
            {(post.player.matchRank === '99' || post.player.matchRank === '') &&
              <Ranks style={{ backgroundColor: '#C4CAD4' }}><span style={{ fontStyle: 'italic', fontWeight: '500' }}>리타이어</span>
              </Ranks>
            }
          </Card>
        </Slide>
        </div>
      ))}
    </>
  );
};