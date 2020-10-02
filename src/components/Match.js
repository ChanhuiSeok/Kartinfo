import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Slide from 'react-reveal/Slide';
import gameType from '../jsonData/gameType.json'
import track from '../jsonData/track.json'

const Card = styled.div`
  width:1000px;
  border-radius: 7px;
  margin-bottom:18px;
  background-color:white;
  float:left;
  color:black;
  padding:15px; 
  @media (max-width: 700px) {
    width:90%;
  }
`;

const CharacterImg = styled.img`
  position:relative;
  width:20%;
  z-index:1;
  margin-left:-30px;
`;

const TrackImg = styled.img`
  width:20%;
`;

const KartImg = styled.img`
  position:relative;
  width:17%;
  z-index:0;
  margin-left:-100px;
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
  font-size:30px;
  font-weight:700;
  @media (max-width: 700px) {
    line-height:30px;
    font-size:22px;
  }
`;

const SubTitle = styled.div`
  line-height:10px;
  font-size:18px;
  font-weight:500;
  color:gray;
  @media (max-width: 700px) {
    font-size:11px;
  }
`;

const TimeTitle = styled.div`
  vertical-align:bottom;
  font-weight:500;
  font-size:15px;
  margin-top:4em;
  @media (max-width: 700px) {
    font-size:12px;
    margin-top:.8em;
  }
`;

const Ranks = styled.div`
  position:relative;
  height:130px;
  float:right;
  border-radius:7px;
  width:100px;
  text-align:center;
  background-color:#2752A2;
  padding:7px;
  color:white;
  line-height:110px;
  @media (max-width: 700px) {
    height:50px;
    line-height:45px;
  }
`;

function findMatchType(matchType){
  for(var i = 0; i<gameType.length; i++){
    if (gameType[i].id === matchType){
      return gameType[i].name;
    }
  }
}

function findTrackName(trackId){
  for(var i = 0; i<track.length; i++){
    if (track[i].id === trackId){
      return track[i].name;
    }
  }
}

export default ({ id, matchType, character, trackId, playerCount, player }) => {
  const matchTitle = findMatchType(matchType);
  const trackName = findTrackName(trackId);
  const time = player.matchTime
  const elapsedMSec = time;
  const elapsedSec = parseInt(time / 1000);
  const elapsedMin = parseInt(elapsedSec / 60);
  const time_Min = elapsedMin;
  const cal_Sec = elapsedMin * 60;
  const time_Sec = elapsedSec - cal_Sec;
  const time_MSec = (elapsedMSec - (elapsedMin*60*1000))%1000;
  console.log(player)
  return (
    <Slide left>
      <Card>
          <CharacterImg src={'/metadata/character/'+character+'.png'}></CharacterImg>
          <KartImg src={'/metadata/kart/'+player.kart+'.png'}></KartImg>
          <TrackImg src={'/metadata/track/'+trackId+'.png'}></TrackImg>
          <MatchInfo>
            <TypeTitle>{matchTitle}</TypeTitle>
            <SubTitle>{trackName}</SubTitle>
            <TimeTitle><span style={{fontWeight:'700',color:'navy'}}>주행시간 | </span>{time_Min}분 {time_Sec}초 {time_MSec}</TimeTitle>
          </MatchInfo>
          {(player.matchRank !== '99' && player.matchRank !== '') && 
          <Ranks><span style={{fontSize:'35px',fontWeight:'700'}}>{player.matchRank}</span>/
          <span style={{fontSize:'20px'}}>{playerCount}</span>
          </Ranks>}
          {(player.matchRank === '99' || player.matchRank === '') &&
          <Ranks style={{backgroundColor:'#C4CAD4'}}><span style={{fontStyle: 'italic',fontSize:'23px',fontWeight:'500'}}>리타이어</span>
          </Ranks>
          }
      </Card>
    </Slide>
  );
};