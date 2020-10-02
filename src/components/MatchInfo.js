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
  @media (max-width: 600px) {
    margin-top:150px;
  }
`;

const Loading = styled.div`
  font-size: 18px;
  opacity: 0.5;
  font-weight: 500;
  margin-top: 10px;
`;

const GET_MATCHES = gql`
  query getMatchInfo($usrId: String!) {
    matches(usrId: $usrId) {
      matchType
     matches{
      accountNo
      matchId
      matchType
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

  const { loading, data } = useQuery(GET_MATCHES, {
    variables: { usrId },
  });
  
  console.log(data);

  return (

    <>
      {loading && <Loading></Loading>}
      <Container>
      {data && data.matches[0].matches.map((m) => 
        <Match key={m.matchId} id={m.matchId}
        matchType={m.matchType} character={m.character} trackId={m.trackId}
        />
      )}
      </Container>
    </>
  );
};
