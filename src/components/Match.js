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
  width:350px;
  border-radius: 5px;
  margin-bottom:-2px;
  background-color:#324B7C;
  float:left;
  color:white;
  padding:8px; 
  font-size:13px;
  
  @media (max-width: 1120px) {
    width:350px;
  }

  @media (max-width: 700px) {
    width:300px;
    font-size:11.5px;
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
  return "알 수 없는 트랙"
}

function findCharacterName(characterId){
  for(var i = 0; i<character.length; i++){
    if (character[i].id === characterId){
      return character[i].name;
    }
  }
  return "알 수 없는 캐릭터"
}

function findKartName(kartId){
  for(var i = 0; i<kart.length; i++){
    if (kart[i].id === kartId){
      return kart[i].name;
    }
  }
  return "알 수 없는 카트"
}

export default ({ id, matchType, character, trackId, startTime, playerCount, channelName, player }) => {
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
          <CharacterImg onError={(e)=>{e.target.src="image/unknownChar.png"}} src={'image/character/'+character+'.png'}></CharacterImg>
          <KartImg onError={(e)=>{e.target.src="image/unknownKart.png"}} src={'image/kart/'+player.kart+'.png'}></KartImg>
          <TrackImg 
          onError={(e)=>{e.target.src="image/blankTrack.png"}}
          src={'image/track/'+trackId+'.png'}></TrackImg>
          <MatchInfo>
            <TypeTitle>{matchTitle}
            {(channelName === "speedIndiFast" || channelName === "speedTeamFast") && 
            <Speed>빠름</Speed>
            }
            {(channelName === "speedIndiFastest" || channelName === "speedTeamFastest") && 
            <Speed style={{backgroundColor:'#E15F93'}}>매우 빠름</Speed>
            }
            {(channelName === "speedTeamInfinit" || channelName === "speedIndiInfinit") && 
            <Speed style={{backgroundColor:'#9644C6'}}>무한</Speed>
            }
            {(channelName === "itemNewItemTeamFastest2Enchant" || channelName === "itemNewItemIndiFastest2Enchant") && 
            <Speed style={{backgroundColor:'#C83158'}}>가장 빠름</Speed>
            }
            {(channelName === "itemNewItemTeamFast2Enchant" || channelName === "itemNewItemIndiFast2Enchant") && 
            <Speed style={{backgroundColor:'#3EB5E8'}}>빠름</Speed>
            }
              </TypeTitle>
            <SubTitle>{trackName}</SubTitle>
            <TimeTitle><span style={{fontWeight:'700',color:'#1B4C7C'}}>주행시간 | </span>{time_Min}분 {time_Sec}초 {time_MSec}</TimeTitle>
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
          <Ranks style={{backgroundColor:'#C4CAD4'}}><span style={{fontStyle: 'italic',fontWeight:'500'}}>리타이어</span>
          </Ranks>
          }
      </Card>
    </Slide>
    </div>
  );
};