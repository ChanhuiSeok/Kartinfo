import React, { FunctionComponent } from "react";
import gameType from "@/jsonData/gameType.json";
import { useMatchMember } from "@/hooks";
import { MatchIndiMember, MatchTeamMember } from "@/model";
import { getTeamOrIndi } from "./util";
import MatchIndiMemberInfo from "./MatchIndiMemberInfo";
import MatchTeamMemberInfo from "./MatchTeamMemberInfo";
import styled from "styled-components";

function isTeamMember(data: MatchIndiMember | MatchTeamMember | undefined): data is MatchTeamMember {
  return data !== undefined && "matchTeamMember" in data;
}

function isIndiMember(data: MatchIndiMember | MatchTeamMember | undefined): data is MatchIndiMember {
  return data !== undefined && "matchIndiMember" in data;
}

const Card = styled.div`
  display: flex;
  flex-direction: row;
  width: 1000px;
  border-radius: 0 0 7px 7px;
  margin-bottom: 40px;
  background-color: #ffffff;
  padding: 25px;
  color: black;
  z-index: 99;
  justify-content: center;
  @media (max-width: 1120px) {
    width: 95%;
    padding: 22px;
    flex-wrap: nowrap;
    margin-bottom: 28px;
  }
  @media (max-width: 700px) {
    width: 86%;
    margin-bottom: 28px;
    overflow-x: scroll;
    flex-wrap: nowrap;
    padding: 0 25px 15px 25px;
    justify-content: left;
    overflow-y: hidden;
  }
`;

const MemberCard = styled.div`
  display: flex;
  margin-right: 5px;
  padding: 5px 0 0;
  border-radius: 5px;
  background-color: #efefef;
  max-width: 100px;
  @media (max-width: 1120px) {
    max-width: 90px;
    flex: 0 0 auto;
  }
  @media (max-width: 700px) {
    max-width: 80px;
    flex: 0 0 auto;
  }
`;

const CharacterImg = styled.img`
  position: relative;
  width: 70%;
  z-index: 1;
  margin-left: -3px;
  @media (max-width: 1120px) {
    margin-left: -3px;
  }
  @media (max-width: 700px) {
    margin-left: -2px;
  }
`;

const KartImg = styled.img`
  position: relative;
  width: 55%;
  z-index: 0;
  margin-left: -30px;
  @media (max-width: 1120px) {
    margin-left: -29px;
  }
  @media (max-width: 700px) {
    margin-left: -28px;
  }
`;

const Nickname = styled.p`
  font-size: 13px;
  text-align: center;
  font-weight: 400;
  padding: 5px;
  letter-spacing: -1.5px;
  @media (max-width: 700px) {
    word-break: break-word;
    font-size: 11px;
  }
`;

const RankInfo = styled.p`
  font-size: 14px;
  text-align: center;
  padding: 6px;
  font-weight: 700;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border-radius: 0 0 5px 5px;
  @media (max-width: 700px) {
    font-size: 11px;
  }
`;

const StyledSpinner = styled.svg`
  animation: rotate 2s linear infinite;
  margin: -25px 0 0 -25px;
  width: 50px;
  height: 50px;
  & .path {
    stroke: lightgray;
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

interface Props {
  matchType: string;
  matchId: string;
  nickname: string;
}

const MatchMember: FunctionComponent<Props> = ({ matchType, matchId, nickname }) => {
  const isTeam = getTeamOrIndi(gameType, matchType) === "Team";
  const { loading, data, error } = useMatchMember(isTeam, matchId);

  if (isIndiMember(data)) {
    return <MatchIndiMemberInfo data={data} nickname={nickname} loading={loading} error={error} />;
  }

  if (isTeamMember(data)) {
    return <MatchTeamMemberInfo data={data} nickname={nickname} loading={loading} error={error} />;
  }

  return (
    <>
      {loading && (
        <Card style={{ justifyContent: "center" }}>
          <StyledSpinner viewBox="0 0 50 50">
            <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="4" />{" "}
          </StyledSpinner>
        </Card>
      )}
    </>
  );
};

export default MatchMember;
