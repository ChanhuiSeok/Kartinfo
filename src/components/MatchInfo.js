import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import Match from "../components/Match";

/* 받아온 usrId 값을 가지고 matches 뮤테이션을 실행하여 결과를 그리는 컴포넌트 */

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

export default ({ id }) => {
  usrId = id;
  console.log(usrId);

  const { loading, data, error } = useQuery(GET_MATCHES, {
    variables: { usrId }
  });

  return (
    <>
      {loading && 
      <div style={{display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',minHeight:'600px', alignItems:'center'}}>
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
      </div>}
      <Container>
      
      {data && data.matches[0]?.matches.map((m) => 
        <Match key={m.matchId} id={m.matchId}
        matchType={m.matchType} character={m.character} trackId={m.trackId}
        startTime={m.startTime} endTime={m.endTime} player={m.player}
        playerCount={m.playerCount} channelName={m.channelName}
        />
      )}
      {data && data.matches[1]?.matches.map((m) => 
        <Match key={m.matchId} id={m.matchId}
        matchType={m.matchType} character={m.character} trackId={m.trackId}
        startTime={m.startTime} endTime={m.endTime} player={m.player}
        playerCount={m.playerCount} channelName={m.channelName}
        />
      )}
      </Container>
    </>
  );
};
