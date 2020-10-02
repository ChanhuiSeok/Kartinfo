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
  margin-left:.3em;
  background-color:white;
  float:left;
  color:black;
  padding:15px; 
  @media (max-width: 700px) {
    width:90%;
  }
`;

const CardTitle = styled.div`
  width:350px;
  border-radius: 5px;
  margin-bottom:-2px;
  margin-left:.3em;
  background-color:#324B7C;
  float:left;
  color:white;
  padding:8px; 
  font-size:13px;
  @media (max-width: 700px) {
    width:300px;
    font-size:11px;
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
    width:60px;
    height:40px;
    line-height:35px;
    font-size:10px;
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

function findCharacterName(characterId){
  for(var i = 0; i<character.length; i++){
    if (character[i].id === characterId){
      return character[i].name;
    }
  }
}

function findKartName(kartId){
  for(var i = 0; i<kart.length; i++){
    if (kart[i].id === kartId){
      return kart[i].name;
    }
  }
}

export default ({ id, matchType, character, trackId, startTime, playerCount, player }) => {
  const matchTitle = findMatchType(matchType);
  const trackName = findTrackName(trackId);
  const characterName = findCharacterName(character);
  const kartName = findKartName(player.kart);
  const time = player.matchTime
  const dates = moment(startTime).format('YYYY-MM-DD');
  const elapsedMSec = time;
  const elapsedSec = parseInt(time / 1000);
  const elapsedMin = parseInt(elapsedSec / 60);
  const time_Min = elapsedMin;
  const cal_Sec = elapsedMin * 60;
  const time_Sec = elapsedSec - cal_Sec;
  const time_MSec = (elapsedMSec - (elapsedMin*60*1000))%1000;
  return (
    <div style={{margin:'0 auto'}}>
    <Slide left>
      <CardTitle>
       {dates} / <span style={{color:'#FCD968'}}>{characterName}</span> 착용 / 
       <span style={{color:'#61E9B4'}}> {kartName} </span>탑승
      </CardTitle>
      <Card>
          <CharacterImg src={'/metadata/character/'+character+'.png'}></CharacterImg>
          <KartImg src={'/metadata/kart/'+player.kart+'.png'}></KartImg>
          <TrackImg src={'/metadata/track/'+trackId+'.png'}></TrackImg>
          <MatchInfo>
            <TypeTitle>{matchTitle}</TypeTitle>
            <SubTitle>{trackName}</SubTitle>
            <TimeTitle><span style={{fontWeight:'700',color:'navy'}}>주행시간 | </span>{time_Min}분 {time_Sec}초 {time_MSec}</TimeTitle>
          </MatchInfo>
          {(player.matchRank === '1') && 
          <Ranks><span style={{fontSize:'35px',fontWeight:'700',color:'#FFE73C'}}>{player.matchRank}</span>/
          <span style={{fontSize:'20px'}}>{playerCount}</span>
          </Ranks>}
          {(player.matchRank !== '99' && player.matchRank !== '' && player.matchRank !== '1') && 
          <Ranks><span style={{fontSize:'35px',fontWeight:'700'}}>{player.matchRank}</span>/
          <span style={{fontSize:'20px'}}>{playerCount}</span>
          </Ranks>}
          {(player.matchRank === '99' || player.matchRank === '') &&
          <Ranks style={{backgroundColor:'#C4CAD4'}}><span style={{fontStyle: 'italic',fontSize:'23px',fontWeight:'500'}}>리타이어</span>
          </Ranks>
          }
      </Card>
    </Slide>
    </div>
  );
};