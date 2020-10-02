import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import Match from "../components/Match"

/* 받아온 usrId 값을 가지고 matches 뮤테이션을 실행하여 결과를 그리는 컴포넌트 */

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
      matches {
        accountNo
        matchId
        matchType
        character
        startTime
        endTime
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

  return (
    <>
      {loading && <Loading>!!!!.</Loading>}
      {data && data.matches[0].matches.map(m=>(
        <p>{m.startTime}</p>
      ))}
    </>
  );
};
