import React, { FunctionComponent } from "react";
import gameType from "../jsonData/gameType.json";
import character from "../jsonData/character.json";
import kart from "../jsonData/kart.json";
import styled from "styled-components";
import { getTeamOrIndi } from "./util";
import { useMatchMember } from "../hooks";
import { MatchIndiMember, MatchTeamMeber } from "../model";

function isTeamMember(data: MatchIndiMember | MatchTeamMeber | undefined): data is MatchTeamMeber {
  return data !== undefined && "matchTeamMember" in data;
}

function isIndiMember(data: MatchIndiMember | MatchTeamMeber | undefined): data is MatchIndiMember {
  return data !== undefined && "matchIndiMember" in data;
}

const Card = styled.div`
  display: flex;
  flex-direction: row;
  width: 1000px;
  border-radius: 7px;
  margin-bottom: 40px;
  background-color: #ffffff;
  padding: 25px;
  color: black;
  z-index: 99;
  justify-content: center;
  @media (max-width: 1120px) {
    width: 95%;
    padding: 22px;
    margin-bottom: 28px;
  }
  @media (max-width: 700px) {
    width: 86%;
    padding: 0 25px 10px 25px;
    margin-bottom: 28px;
  }
`;

const StyledSpinner = styled.svg`
  animation: rotate 2s linear infinite;
  width: 30px;
  height: 30px;
  & .path {
    stroke: #787878;
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

const MemberCard = styled.div`
  display: flex;
  margin-right: 5px;
  padding: 5px;
  border-radius: 5px;
  background-color: #efefef;
  max-width: 140px;
  @media (max-width: 1120px) {
    max-width: 110px;
  }
  @media (max-width: 700px) {
    max-width: 70px;
  }
`;

const CharacterImg = styled.img`
  position: relative;
  width: 80%;
  z-index: 1;
  margin-left: 10px;
  @media (max-width: 1120px) {
    margin-left: 7px;
  }
  @media (max-width: 700px) {
    margin-left: 5px;
  }
`;

const Nickname = styled.p`
  font-size: 15px;
  text-align: center;
  font-weight: 700;
  letter-spacing: -1px;
  @media (max-width: 700px) {
    word-break: break-word;
    font-size: 7px;
  }
`;

const RankInfo = styled.p`
  font-size: 20px;
  text-align: center;
  padding: 3px;
  font-weight: 800;
  @media (max-width: 700px) {
    font-size: 12px;
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

  function validSrc(items, type: string, target) {
    for (let i in items) {
      if (items[i].id === target) {
        return `image/${type}/${target}.png`;
      }
    }
    if (type === "character") return "image/unknownChar.png";
    return "image/unknownkart.png";
  }

  function validRank(rank: string) {
    if (rank === "" || rank === "99") return "RT";
    return `#${rank}`;
  }

  function isMine(characterName, matchType) {
    if (characterName === nickname) {
      if (matchType === "Indi") return { border: "2px solid gray" };
      if (matchType === "Team1") return { border: "2px solid #E55281" };
      if (matchType === "Team2") return { border: "2px solid #287ECF" };
    }
    return {};
  }

  if (isIndiMember(data)) {
    return (
      <>
        {!loading && data.matchIndiMember && (
          <Card>
            {data.matchIndiMember.map((item) => (
              <MemberCard key={item.accountNo} style={isMine(item.characterName, "Indi")}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div style={{ flexDirection: "row" }}>
                    <CharacterImg
                      src={validSrc(character, "character", item.character)}
                    ></CharacterImg>
                  </div>
                  <Nickname>{item.characterName}</Nickname>
                  <RankInfo>{validRank(item.matchRank)}</RankInfo>
                </div>
              </MemberCard>
            ))}
          </Card>
        )}
        {!loading && data.matchIndiMember === null && <Card>{`데이터가 없습니다.`}</Card>}
        {error && <h1>데이터를 불러올 수 없습니다.</h1>}
      </>
    );
  }

  if (isTeamMember(data)) {
    return (
      <>
        {!loading && data.matchTeamMember && (
          <Card>
            {data.matchTeamMember[0].players.map((item) => (
              <MemberCard
                key={item.accountNo}
                style={{ backgroundColor: "#FEDEE9", ...isMine(item.characterName, "Team1") }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div style={{ flexDirection: "row" }}>
                    <CharacterImg
                      src={validSrc(character, "character", item.character)}
                    ></CharacterImg>
                  </div>
                  <Nickname>{item.characterName}</Nickname>
                  <RankInfo>{validRank(item.matchRank)}</RankInfo>
                </div>
              </MemberCard>
            ))}
            {data.matchTeamMember[1].players.map((item) => (
              <MemberCard
                key={item.accountNo}
                style={{ backgroundColor: "#C5DFF9", ...isMine(item.characterName, "Team2") }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div style={{ flexDirection: "row" }}>
                    <CharacterImg
                      src={validSrc(character, "character", item.character)}
                    ></CharacterImg>
                  </div>
                  <Nickname>{item.characterName}</Nickname>
                  <RankInfo>{validRank(item.matchRank)}</RankInfo>
                </div>
              </MemberCard>
            ))}
          </Card>
        )}
        {!loading && data.matchTeamMember === null && <Card>{`데이터가 없습니다.`}</Card>}
        {error && <h1>데이터를 불러올 수 없습니다.</h1>}
      </>
    );
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
