import React, { FunctionComponent } from "react";
import gameType from "../jsonData/gameType.json";
import character from "../jsonData/character.json";
import kart from "../jsonData/kart.json";
import styled from "styled-components";
import StyledSpinner from "./StyledSpinner";
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
    return "image/unknownKart.png";
  }

  function validRank(rank: string) {
    if (rank === "" || rank === "99") return "리타이어";
    return `${rank}등`;
  }

  function isMine(characterName, matchType) {
    if (characterName === nickname) {
      if (matchType === "Indi") return { boxShadow: "0 0 0 2px gray inset" };
      if (matchType === "Team1") return { boxShadow: "0 0 0 2px #E55281 inset" };
      if (matchType === "Team2") return { boxShadow: "0 0 0 2px #287ECF inset" };
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
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "3px",
                  }}
                >
                  <div style={{ flexDirection: "row" }}>
                    <CharacterImg src={validSrc(character, "character", item.character)}></CharacterImg>
                    <KartImg src={validSrc(kart, "kart", item.kart)}></KartImg>
                  </div>
                  <Nickname>{item.characterName}</Nickname>
                  <RankInfo>{validRank(item.matchRank)}</RankInfo>
                </div>
              </MemberCard>
            ))}
          </Card>
        )}
        {!loading && data.matchIndiMember === null && <Card style={{ color: "gray", fontSize: "12px" }}>{`상세 데이터가 없습니다`}</Card>}
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
                style={{
                  backgroundColor: "#FEDEE9",
                  ...isMine(item.characterName, "Team1"),
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "3px",
                  }}
                >
                  <div style={{ flexDirection: "row" }}>
                    <CharacterImg src={validSrc(character, "character", item.character)}></CharacterImg>
                    <KartImg src={validSrc(kart, "kart", item.kart)}></KartImg>
                  </div>
                  <Nickname>{item.characterName}</Nickname>
                  <RankInfo>{validRank(item.matchRank)}</RankInfo>
                </div>
              </MemberCard>
            ))}
            {data.matchTeamMember[1].players.map((item) => (
              <MemberCard
                key={item.accountNo}
                style={{
                  backgroundColor: "#C5DFF9",
                  ...isMine(item.characterName, "Team2"),
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "3px",
                  }}
                >
                  <div style={{ flexDirection: "row" }}>
                    <CharacterImg src={validSrc(character, "character", item.character)}></CharacterImg>
                    <KartImg src={validSrc(kart, "kart", item.kart)}></KartImg>
                  </div>
                  <Nickname>{item.characterName}</Nickname>
                  <RankInfo>{validRank(item.matchRank)}</RankInfo>
                </div>
              </MemberCard>
            ))}
          </Card>
        )}
        {!loading && data.matchTeamMember === null && <Card style={{ color: "gray", fontSize: "12px" }}>{`상세 데이터가 없습니다`}</Card>}
        {error && <h1>데이터를 불러올 수 없습니다.</h1>}
      </>
    );
  }

  return (
    <>
      {loading && (
        <Card style={{ justifyContent: "center" }}>
          <StyledSpinner />
        </Card>
      )}
    </>
  );
};

export default MatchMember;
