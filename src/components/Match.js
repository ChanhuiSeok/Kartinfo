import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { gql } from "apollo-boost";

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

export default ({ accountNo }) => {
  
  return (
    <>
    {accountNo}
    </>
  );
};